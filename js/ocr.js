/* ===== Lecture de vrais documents : Tesseract (OCR) exécuté sur le téléphone =====
   - Le moteur et sa langue (français) se chargent une seule fois, au premier document.
   - Rien n'est envoyé : l'image reste dans le navigateur.
   - On garde la mise en page : blocs, colonnes, position de chaque mot.
   - Les cases à remplir (lignes, cadres, cases à cocher, pointillés) deviennent des champs.
   - L'export PDF reprend l'image d'origine avec les réponses écrites à leur place,
     puis une page de texte reconnu à la même position. */
const LIB = {
  tess: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
  tessWorker: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js",
  tessCore: "https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.1",
  pdf: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  pdfWorker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
  jspdf: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  langFile: "tess/fra-lang.wasm" /* données de langue française de Tesseract (fra.traineddata compressé), publiées à côté de la page */
};
const DL = (window.claude && window.claude.use) ? window.claude.use("downloads").catch(() => null) : Promise.resolve(null);
const scriptCache = {};
function loadScript(src) {
  return scriptCache[src] || (scriptCache[src] = new Promise((ok, ko) => {
    const s = document.createElement("script"); s.src = src; s.async = true;
    s.onload = () => ok(); s.onerror = () => { delete scriptCache[src]; ko(new Error("Chargement impossible : " + src)); };
    document.head.appendChild(s);
  }));
}
let OCRLOG = null, tessP = null;
function getTess() {
  if (!tessP) tessP = (async () => {
    await loadScript(LIB.tess);
    /* Le moteur demande « <langPath>/fra.traineddata » : la partie après « ? » est ignorée
       par le serveur, ce qui renvoie vers le fichier publié avec la page. */
    /* Sans réseau, le moteur ne dit jamais « échec » : on abandonne après 45 s avec un message clair. */
    const make = Tesseract.createWorker("fra", 1, {
      workerPath: LIB.tessWorker, corePath: LIB.tessCore, cacheMethod: "none", gzip: false,
      langPath: new URL(LIB.langFile + "?v=1&f=", location.href).href,
      logger: m => OCRLOG && OCRLOG(m)
    });
    make.catch(() => {});
    const w = await Promise.race([make, new Promise((_, ko) => setTimeout(() => ko(new Error("Moteur de lecture indisponible (réseau)")), window.OCR_TIMEOUT_MS || 45000))]);
    await w.setParameters({ preserve_interword_spaces: "1", user_defined_dpi: "300" });
    return w;
  })().catch(e => { tessP = null; throw e; });
  return tessP;
}

/* ---------- Image ou PDF → canevas ---------- */
async function loadBitmap(file) {
  try { return await createImageBitmap(file, { imageOrientation: "from-image" }); } catch (e) {}
  return await new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ko(new Error("Image illisible")); i.src = URL.createObjectURL(file); });
}
async function fileToCanvases(file) {
  if (file.type === "application/pdf" || /\.pdf$/i.test(file.name)) {
    await loadScript(LIB.pdf);
    pdfjsLib.GlobalWorkerOptions.workerSrc = LIB.pdfWorker;
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()), isEvalSupported: false }).promise;
    const out = [];
    for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
      const page = await pdf.getPage(i); const v0 = page.getViewport({ scale: 1 });
      const vp = page.getViewport({ scale: 1700 / v0.width });
      const c = document.createElement("canvas"); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      const ctx = c.getContext("2d", { willReadFrequently: true }); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise; out.push(c);
    }
    return { canvases: out, total: pdf.numPages };
  }
  const bmp = await loadBitmap(file);
  const long = Math.max(bmp.width, bmp.height);
  const k = long > 2200 ? 2200 / long : bmp.width < 1200 ? Math.min(2, 1400 / bmp.width) : 1;
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  const ctx = c.getContext("2d", { willReadFrequently: true }); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(bmp, 0, 0, c.width, c.height);
  return { canvases: [c], total: 1 };
}

/* ---------- Repérage des cases à remplir dans l'image ---------- */
const FILLER = /^[_.…·\-–—]{3,}$/;
function detectFields(canvas, words) {
  const W = canvas.width, H = canvas.height;
  const px = canvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, W, H).data;
  const g = new Uint8Array(W * H); let sum = 0;
  for (let i = 0, j = 0; i < px.length; i += 4, j++) { const v = (px[i] * 299 + px[i + 1] * 587 + px[i + 2] * 114) / 1000; g[j] = v; sum += v; }
  const thr = Math.max(90, Math.min(190, (sum / (W * H)) * 0.72));
  const dark = (x, y) => g[y * W + x] < thr;
  const textWords = words.filter(w => !FILLER.test(w.t));
  const hs = textWords.map(w => w.b[3] - w.b[1]).sort((a, b) => a - b);
  const medH = hs.length ? hs[Math.floor(hs.length / 2)] : Math.round(H * 0.012);
  const minS = Math.max(12, Math.round(W * 0.009));
  const maxT = Math.max(4, Math.round(H * 0.0035));
  /* 1. segments horizontaux fins */
  const segs = []; let open = [];
  for (let y = 0; y < H; y++) {
    const runs = []; let x = 0;
    while (x < W) { if (dark(x, y)) { const s = x; while (x < W && dark(x, y)) x++; if (x - s >= minS) runs.push([s, x - 1]); } else x++; }
    const next = [];
    for (const r of runs) {
      const o = open.find(s => Math.abs(s.x0 - r[0]) <= 4 && Math.abs(s.x1 - r[1]) <= 4 && s.y1 === y - 1);
      if (o) { o.y1 = y; o.x0 = Math.min(o.x0, r[0]); o.x1 = Math.max(o.x1, r[1]); next.push(o); open = open.filter(s => s !== o); }
      else next.push({ x0: r[0], x1: r[1], y0: y, y1: y });
    }
    segs.push(...open); open = next;
  }
  segs.push(...open);
  const inWord = s => textWords.some(w => s.x1 > w.b[0] + 2 && s.x0 < w.b[2] - 2 && s.y0 > w.b[1] + 1 && s.y1 < w.b[3] - 1);
  const lines = segs.filter(s => s.y1 - s.y0 + 1 <= maxT && !inWord(s)).map(s => ({ ...s, y: Math.round((s.y0 + s.y1) / 2), used: false }));
  const colRatio = (x, y0, y1) => { let best = 0; for (let xx = Math.max(0, x - 3); xx <= Math.min(W - 1, x + 3); xx++) { let n = 0; for (let y = y0; y <= y1; y++) if (dark(xx, y)) n++; best = Math.max(best, n / Math.max(1, y1 - y0 + 1)); } return best; };
  const inkRatio = (x0, y0, x1, y1) => { if (x1 <= x0 || y1 <= y0) return 1; let n = 0, t = 0; for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x += 2) { t++; if (dark(x, y)) n++; } return n / Math.max(1, t); };
  const isShape = (w, x0, y0, x1, y1) => { if (!/[\p{L}\p{N}]/u.test(w.t) && w.b[2] > x0 - 8 && w.b[0] < x1 + 8 && w.b[3] > y0 - 8 && w.b[1] < y1 + 8) return true; const ix = Math.max(0, Math.min(w.b[2], x1) - Math.max(w.b[0], x0)), iy = Math.max(0, Math.min(w.b[3], y1) - Math.max(w.b[1], y0)); return w.t.length <= 3 && ix * iy > 0.45 * (w.b[2] - w.b[0]) * (w.b[3] - w.b[1]) && (w.b[2] - w.b[0]) > 0.5 * (x1 - x0); };
  const wordInside = (x0, y0, x1, y1) => textWords.some(w => { if (isShape(w, x0, y0, x1, y1)) return false; const cx = (w.b[0] + w.b[2]) / 2, cy = (w.b[1] + w.b[3]) / 2; return cx > x0 && cx < x1 && cy > y0 && cy < y1; });
  const fields = [];
  /* 2. cadres et cases à cocher : deux segments alignés + deux bords verticaux + intérieur vide */
  const byY = lines.slice().sort((a, b) => a.y - b.y);
  for (let i = 0; i < byY.length; i++) {
    const a = byY[i]; if (a.used) continue;
    for (let j = i + 1; j < byY.length; j++) {
      const b = byY[j]; if (b.used) continue;
      const dy = b.y - a.y; if (dy < 9) continue; if (dy > 220) break;
      if (Math.abs(a.x0 - b.x0) > 6 || Math.abs(a.x1 - b.x1) > 6) continue;
      const x0 = Math.min(a.x0, b.x0), x1 = Math.max(a.x1, b.x1);
      if (colRatio(x0, a.y, b.y) < 0.85 || colRatio(x1, a.y, b.y) < 0.85) continue;
      const pad = Math.max(3, Math.round(maxT * 1.2));
      if (inkRatio(x0 + pad, a.y + pad, x1 - pad, b.y - pad) > 0.04 || wordInside(x0, a.y, x1, b.y)) continue;
      const w = x1 - x0, h = dy;
      const kind = (w < 90 && h < 90 && w / h > 0.6 && w / h < 1.6) ? "check" : "box";
      textWords.forEach(w => { if (isShape(w, x0, a.y, x1, b.y)) w.filler = true; });
      fields.push({ kind, b: [x0, a.y, x1, b.y] }); a.used = b.used = true; break;
    }
  }
  /* 3. lignes de réponse : segment long sans texte posé dessus */
  for (const s of lines) {
    if (s.used) continue; const len = s.x1 - s.x0;
    if (len < Math.max(60, W * 0.06) || len > W * 0.7) continue;
    const sitting = textWords.filter(w => w.b[3] > s.y - medH * 1.1 && w.b[3] <= s.y + 3 && w.b[2] > s.x0 && w.b[0] < s.x1);
    const covered = sitting.reduce((n, w) => n + Math.min(w.b[2], s.x1) - Math.max(w.b[0], s.x0), 0);
    if (covered > len * 0.3) continue;
    fields.push({ kind: "line", b: [s.x0, Math.max(0, Math.round(s.y - medH * 1.35)), s.x1, s.y] });
  }
  /* 4. pointillés et soulignés tapés (____, ......) reconnus comme du texte */
  words.forEach(w => { if (FILLER.test(w.t) && w.b[2] - w.b[0] > medH * 1.5) { w.filler = true; fields.push({ kind: "line", b: [w.b[0], w.b[1] - Math.round(medH * 0.3), w.b[2], w.b[3]], fromWord: w.id }); } });
  /* doublons */
  const iou = (p, q) => { const ix = Math.max(0, Math.min(p[2], q[2]) - Math.max(p[0], q[0])), iy = Math.max(0, Math.min(p[3], q[3]) - Math.max(p[1], q[1])); const inter = ix * iy; return inter / ((p[2] - p[0]) * (p[3] - p[1]) + (q[2] - q[0]) * (q[3] - q[1]) - inter); };
  const kept = [];
  fields.sort((a, b) => (a.fromWord != null) - (b.fromWord != null)).forEach(f => { if (!kept.some(k => iou(k.b, f.b) > 0.25)) kept.push(f); else if (f.fromWord != null) words[f.fromWord].filler = true; });
  /* libellé : mots juste à gauche sur la même ligne, sinon la ligne au-dessus */
  kept.sort((a, b) => a.b[1] - b.b[1] || a.b[0] - b.b[0]).forEach((f, i) => {
    f.id = i; const cy = (f.b[1] + f.b[3]) / 2;
    const ok = w => !w.filler && /[\p{L}\p{N}]/u.test(w.t);
    let left = textWords.filter(w => ok(w) && Math.abs((w.b[1] + w.b[3]) / 2 - cy) < Math.max(medH, (f.b[3] - f.b[1]) / 2) && w.b[2] <= f.b[0] + 6).sort((a, b) => b.b[2] - a.b[2]);
    let lab = []; let edge = f.b[0];
    for (const w of left) { if (edge - w.b[2] > medH * 2.5 || lab.length >= 6) break; lab.unshift(w.t); edge = w.b[0]; }
    if (f.kind === "check" && !lab.length) { const right = textWords.filter(w => ok(w) && Math.abs((w.b[1] + w.b[3]) / 2 - cy) < medH && w.b[0] >= f.b[2] - 4).sort((a, b) => a.b[0] - b.b[0]); let e2 = f.b[2]; for (const w of right) { if (w.b[0] - e2 > medH * 2.5 || lab.length >= 5) break; lab.push(w.t); e2 = w.b[2]; } }
    if (!lab.length) { const above = textWords.filter(w => ok(w) && w.b[3] < f.b[1] + 2 && w.b[3] > f.b[1] - medH * 2.2 && w.b[2] > f.b[0] - medH && w.b[0] < f.b[2]).sort((a, b) => a.b[0] - b.b[0]); lab = above.slice(0, 6).map(w => w.t); }
    f.label = lab.join(" ").replace(/[\s:._…]+$/, "") || `Case ${i + 1}`;
  });
  return { fields: kept, medH };
}

/* Tesseract réunit parfois deux colonnes sur une même ligne : on coupe les lignes aux grands
   espaces, puis on regroupe les morceaux par colonne pour lire chaque colonne d'un bout à l'autre. */
function splitColumns(blocks, words, W) {
  const hs = words.map(w => w.b[3] - w.b[1]).sort((a, b) => a - b); const medH = hs.length ? hs[Math.floor(hs.length / 2)] : 20;
  const gapMin = Math.max(medH * 2.6, W * 0.045);
  const bb = items => { const ws = items.map(it => words[it.w].b); return [Math.min(...ws.map(b => b[0])), Math.min(...ws.map(b => b[1])), Math.max(...ws.map(b => b[2])), Math.max(...ws.map(b => b[3]))]; };
  const out = [];
  for (const blk of blocks) {
    const rows = blk.lines.map(ln => { const segs = []; let cur = [];
      ln.items.forEach((it, i) => { if (i && words[it.w].b[0] - words[ln.items[i - 1].w].b[2] > gapMin) { segs.push(cur); cur = []; } cur.push(it); });
      segs.push(cur); return segs.map(items => ({ items, b: bb(items) })); });
    if (!rows.some(r => r.length > 1)) { out.push(blk); continue; }
    /* bornes des colonnes à partir des débuts de morceaux */
    const starts = rows.flat().map(s => s.b[0]).sort((a, b) => a - b); const cuts = [];
    for (let i = 1; i < starts.length; i++) if (starts[i] - starts[i - 1] > W * 0.12) cuts.push(starts[i] - W * 0.02);
    const colOf = x => cuts.filter(c => x >= c).length;
    let band = null; const flush = () => { if (!band) return; if (band.type === "full") out.push({ b: band.b, lines: band.lines }); else band.cols.forEach(col => col && col.length && out.push({ b: [Math.min(...col.map(l => l.b[0])), Math.min(...col.map(l => l.b[1])), Math.max(...col.map(l => l.b[2])), Math.max(...col.map(l => l.b[3]))], lines: col })); band = null; };
    for (const segs of rows) {
      const wide = segs.length === 1 && (cuts.some(c => segs[0].b[0] < c - W * 0.02 && segs[0].b[2] > c + W * 0.06) || (band && band.type === "full" && Math.abs(segs[0].b[0] - band.b[0]) < medH && segs[0].b[1] - band.b[3] < medH * 1.2));
      if (wide) { if (!band || band.type !== "full") { flush(); band = { type: "full", lines: [], b: segs[0].b.slice() }; } band.lines.push(segs[0]); band.b = [Math.min(band.b[0], segs[0].b[0]), Math.min(band.b[1], segs[0].b[1]), Math.max(band.b[2], segs[0].b[2]), Math.max(band.b[3], segs[0].b[3])]; }
      else { if (!band || band.type !== "cols") { flush(); band = { type: "cols", cols: [] }; } segs.forEach(sg => { const k = colOf(sg.b[0]); (band.cols[k] = band.cols[k] || []).push(sg); }); }
    }
    flush();
  }
  return out;
}

/* ---------- Construction de la page : blocs, lignes, colonnes, champs, chiffres ---------- */
const MONTHS = { janvier: 1, fevrier: 2, février: 2, mars: 3, avril: 4, mai: 5, juin: 6, juillet: 7, aout: 8, août: 8, septembre: 9, octobre: 10, novembre: 11, decembre: 12, décembre: 12 };
function buildPage(canvas, data) {
  const W = canvas.width, H = canvas.height; const words = []; let blocks = [];
  (data.blocks || []).forEach(b => {
    const blk = { b: [b.bbox.x0, b.bbox.y0, b.bbox.x1, b.bbox.y1], lines: [] };
    (b.paragraphs || []).forEach(par => (par.lines || []).forEach(ln => {
      const items = [];
      (ln.words || []).forEach(wd => {
        const t = (wd.text || "").trim(); if (!t) return;
        if (wd.confidence < 15 && !/[\p{L}\p{N}]/u.test(t)) return;
        const id = words.length; words.push({ id, t, c: Math.round(wd.confidence), b: [wd.bbox.x0, wd.bbox.y0, wd.bbox.x1, wd.bbox.y1] }); items.push({ w: id });
      });
      if (items.length) blk.lines.push({ b: [ln.bbox.x0, ln.bbox.y0, ln.bbox.x1, ln.bbox.y1], items });
    }));
    if (blk.lines.length) blocks.push(blk);
  });
  blocks = splitColumns(blocks, words, W);
  const { fields, medH } = detectFields(canvas, words);
  /* insérer chaque champ dans la ligne où il se trouve (ou créer une ligne) */
  fields.forEach(f => {
    if (f.fromWord != null) { for (const blk of blocks) for (const ln of blk.lines) { const k = ln.items.findIndex(it => it.w === f.fromWord); if (k >= 0) { ln.items[k] = { f: f.id }; return; } } }
    const fy0 = f.b[1], fy1 = f.b[3]; let best = null, bestOv = 0;
    let bestDx = Infinity;
    for (const blk of blocks) for (const ln of blk.lines) { const ov = Math.min(fy1, ln.b[3]) - Math.max(fy0, ln.b[1]); const rel = ov / Math.min(fy1 - fy0, ln.b[3] - ln.b[1]); const dx = Math.max(0, f.b[0] - ln.b[2], ln.b[0] - f.b[2]); if (rel > 0.4 && dx < W * 0.12 && (dx < bestDx - 2 || (Math.abs(dx - bestDx) <= 2 && rel > bestOv))) { best = ln; bestOv = rel; bestDx = dx; } }
    if (best) {
      const xOf = it => it.w != null ? words[it.w].b[0] : fields[it.f].b[0];
      const k = best.items.findIndex(it => xOf(it) > f.b[0]); best.items.splice(k < 0 ? best.items.length : k, 0, { f: f.id });
      best.b = [Math.min(best.b[0], f.b[0]), best.b[1], Math.max(best.b[2], f.b[2]), best.b[3]];
    } else {
      let host = null, dist = Infinity;
      blocks.forEach(blk => { const dx = Math.max(0, blk.b[0] - f.b[2], f.b[0] - blk.b[2]); const dy = Math.max(0, blk.b[1] - f.b[3], f.b[1] - blk.b[3]); const d = dx * 2 + dy; if (d < dist) { dist = d; host = blk; } });
      const line = { b: f.b.slice(), items: [{ f: f.id }] };
      if (host && dist < medH * 6) { const k = host.lines.findIndex(l => l.b[1] > f.b[1]); host.lines.splice(k < 0 ? host.lines.length : k, 0, line); host.b = [Math.min(host.b[0], f.b[0]), Math.min(host.b[1], f.b[1]), Math.max(host.b[2], f.b[2]), Math.max(host.b[3], f.b[3])]; }
      else { const nb = { b: f.b.slice(), lines: [line] }; const k = blocks.findIndex(bl => bl.b[1] > f.b[1] && bl.b[0] < f.b[2] && bl.b[2] > f.b[0]); blocks.splice(k < 0 ? blocks.length : k, 0, nb); }
    }
  });
  /* colonnes : des blocs côte à côte qui se chevauchent en hauteur */
  let multi = false;
  for (const a of blocks) for (const b of blocks) if (a !== b && a.b[2] < b.b[0] && Math.min(a.b[3], b.b[3]) - Math.max(a.b[1], b.b[1]) > 0.3 * Math.min(a.b[3] - a.b[1], b.b[3] - b.b[1])) multi = true;
  if (multi) {
    const xs = blocks.map(b => b.b[0]).sort((a, b) => a - b); const cuts = [];
    for (let i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] > W * 0.15) cuts.push((xs[i] + xs[i - 1]) / 2);
    blocks.forEach(b => { if (b.b[2] - b.b[0] < W * 0.55) b.col = cuts.filter(c => b.b[0] > c).length + 1; });
    if (new Set(blocks.map(b => b.col)).size < 2) blocks.forEach(b => delete b.col);
  }
  blocks.forEach((b, i) => b.id = i);
  /* expressions du glossaire, chiffres, dates, montants */
  const chips = [];
  const norm = s => s.toLowerCase().replace(/'/g, "’");
  blocks.forEach(blk => blk.lines.forEach(ln => {
    const ws = ln.items.filter(it => it.w != null).map(it => words[it.w]); let str = ""; const offs = [];
    ws.forEach(w => { offs.push([str.length, str.length + w.t.length, w]); str += w.t + " "; });
    const mark = (s, e, fn) => offs.forEach(([a, b, w]) => { if (a < e && b > s) fn(w); });
    const low = norm(str);
    for (const [id, t] of Object.entries(TERMS)) { let from = 0; const n = norm(t.fr); while (true) { const i = low.indexOf(n, from); if (i < 0) break; mark(i, i + n.length, w => w.term = id); from = i + n.length; } }
    let m; const reD = /\b(0?[1-9]|[12]\d|3[01])[\/.\-](0?[1-9]|1[0-2])[\/.\-]((?:19|20)?\d{2})\b/g;
    while ((m = reD.exec(str))) { let y = +m[3]; if (y < 100) y += 2000; chips.push({ kind: "date", text: m[0], iso: `${y}-${String(+m[2]).padStart(2, "0")}-${String(+m[1]).padStart(2, "0")}` }); mark(m.index, m.index + m[0].length, w => w.num = true); }
    const reT = /\b(1er|[0-3]?\d)\s+(janvier|f[ée]vrier|mars|avril|mai|juin|juillet|ao[uû]t|septembre|octobre|novembre|d[ée]cembre)\s+((?:19|20)\d{2})\b/gi;
    while ((m = reT.exec(str))) { const d = m[1] === "1er" ? 1 : +m[1]; const mo = MONTHS[m[2].toLowerCase()] || MONTHS[m[2].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")]; if (mo) { chips.push({ kind: "date", text: m[0], iso: `${m[3]}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}` }); mark(m.index, m.index + m[0].length, w => w.num = true); } }
    const reA = /(\d{1,3}(?:[ . ]\d{3})*(?:,\d{1,2})?)\s?(€|euros?\b)/gi;
    while ((m = reA.exec(str))) { chips.push({ kind: "amount", text: m[0].trim() }); mark(m.index, m.index + m[0].length, w => w.num = true); }
    const reN = /\b\d(?:[\d ]{4,})\d\b/g;
    while ((m = reN.exec(str))) { if (!chips.some(c => c.text.includes(m[0].trim()))) chips.push({ kind: "number", text: m[0].trim() }); mark(m.index, m.index + m[0].length, w => w.num = true); }
    ws.forEach(w => { if (/\d/.test(w.t)) w.num = true; });
  }));
  const seen = new Set(); const uniq = chips.filter(c => { const k = c.kind + c.text; if (seen.has(k)) return false; seen.add(k); return true; });
  const conf = words.length ? Math.round(words.reduce((n, w) => n + w.c, 0) / words.length) : 0;
  return { W, H, img: canvas.toDataURL("image/jpeg", 0.85), words, blocks, fields, chips: uniq, conf };
}

/* ---------- Déroulé ---------- */

/* ---------- Déroulé de la lecture ---------- */
function updateOcrProgress() {
  const o = V.ocr; if (!o) return; const bar = document.getElementById("ocr-prog");
  if (bar) bar.style.width = `${Math.round((o.status === "reading" ? (o.page - 1 + (o.progress || 0)) / Math.max(1, o.pages) : 0.06) * 100)}%`;
  const st = document.getElementById("ocr-stage"); if (st) st.dataset.state = o.status;
}
async function startOcr(file) {
  audioStop(true);
  V.ocr = { status: "loading", progress: 0, page: 0, pages: 0 };
  go("ocr");
  OCRLOG = m => { if (!V.ocr) return; if (m.status === "recognizing text") { V.ocr.status = "reading"; V.ocr.progress = m.progress; } updateOcrProgress(); };
  try {
    const [w, src] = await Promise.all([getTess(), fileToCanvases(file)]);
    V.ocr.pages = src.canvases.length; const pages = [];
    for (let i = 0; i < src.canvases.length; i++) {
      V.ocr.page = i + 1; V.ocr.status = "reading"; V.ocr.progress = 0; updateOcrProgress();
      const { data } = await w.recognize(src.canvases[i]);
      pages.push(buildPage(src.canvases[i], data));
    }
    V.ocr.status = "done";
    if (V.screen === "ocr") openDoc({ kind: "ocr", data: { name: file.name, pages, values: {}, deadline: null, total: src.total, scannedAt: new Date().toISOString() } });
  } catch (e) { V.ocr.status = "error"; V.ocr.error = String((e && e.message) || e); if (V.screen === "ocr") render(); }
}
function fitLayout() { document.querySelectorAll(".page-wrap").forEach(el => el.style.setProperty("--k", el.clientWidth / Number(el.dataset.w))); }
addEventListener("resize", fitLayout);
function docText(doc) { return doc.pages.map(p => p.blocks.map(b => b.lines.map(l => l.items.filter(it => it.w != null).map(it => p.words[it.w].t).join(" ")).join("\n")).join("\n\n")).join("\n\n"); }
function docContacts(doc) {
  const t = docText(doc).toLowerCase(); const out = [];
  if (/\bcaf\b|allocations familiales/.test(t)) out.push("caf");
  if (/imp[oô]ts|finances publiques|dgfip/.test(t)) out.push("impots");
  if (/assurance maladie|\bcpam\b|ameli/.test(t)) out.push("ameli");
  if (/traducteur (agr[ée]{2}|asserment)|traduction (certifi|asserment|officielle)/.test(t)) out.push("traducteurs");
  return out;
}
function absStyle(pg, b) { return `left:${(b[0] / pg.W * 100).toFixed(3)}%;top:${(b[1] / pg.H * 100).toFixed(3)}%;width:${((b[2] - b[0]) / pg.W * 100).toFixed(3)}%;height:${((b[3] - b[1]) / pg.H * 100).toFixed(3)}%`; }
function blockBox(p, blk) {
  const ws = blk.lines.flatMap(l => l.items.filter(it => it.w != null).map(it => p.words[it.w].b));
  if (!ws.length) return blk.b;
  return [Math.min(...ws.map(b => b[0])), Math.min(...ws.map(b => b[1])), Math.max(...ws.map(b => b[2])), Math.max(...ws.map(b => b[3]))];
}

/* ---------- Export PDF : présentation d'origine + réponses ---------- */
const LATIN = /^[\x20-\x7E\xA0-\xFF’‘“”–—…œŒ€]*$/;
function loadImg(src) { return new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; }); }
async function compositePage(pg, pi, values) {
  const c = document.createElement("canvas"); c.width = pg.W; c.height = pg.H; const ctx = c.getContext("2d");
  ctx.drawImage(await loadImg(pg.img), 0, 0, pg.W, pg.H);
  ctx.fillStyle = "#1739A6"; ctx.strokeStyle = "#1739A6";
  pg.fields.forEach(f => {
    const v = values[`${pi}-${f.id}`]; if (!v) return; const [x0, y0, x1, y1] = f.b; const h = y1 - y0;
    if (f.kind === "check") { ctx.lineWidth = Math.max(2, h * 0.12); ctx.beginPath(); ctx.moveTo(x0 + h * .2, y0 + h * .2); ctx.lineTo(x1 - h * .2, y1 - h * .2); ctx.moveTo(x1 - h * .2, y0 + h * .2); ctx.lineTo(x0 + h * .2, y1 - h * .2); ctx.stroke(); return; }
    const size = Math.max(12, Math.min(h * (f.kind === "line" ? 0.8 : 0.62), 46)); const rtl = /[֐-ࣿ]/.test(v);
    ctx.font = `600 ${size}px Figtree, "Noto Sans Arabic", "Noto Sans SC", sans-serif`; ctx.direction = rtl ? "rtl" : "ltr"; ctx.textAlign = rtl ? "right" : "left"; ctx.textBaseline = "alphabetic";
    ctx.fillText(v, rtl ? x1 - size * 0.3 : x0 + size * 0.3, f.kind === "line" ? y1 - h * 0.22 : y0 + h / 2 + size * 0.35, x1 - x0 - size * 0.4);
  });
  return c;
}
async function exportPdf(doc) {
  toast("Préparation du PDF…");
  try {
    await loadScript(LIB.jspdf); const { jsPDF } = window.jspdf; let pdf = null;
    for (let pi = 0; pi < doc.pages.length; pi++) {
      const pg = doc.pages[pi]; const wPt = 595.28, hPt = wPt * pg.H / pg.W;
      if (!pdf) pdf = new jsPDF({ unit: "pt", format: [wPt, hPt], orientation: hPt >= wPt ? "p" : "l" }); else pdf.addPage([wPt, hPt], hPt >= wPt ? "p" : "l");
      const c = await compositePage(pg, pi, doc.values);
      pdf.addImage(c.toDataURL("image/jpeg", 0.9), "JPEG", 0, 0, wPt, hPt);
    }
    for (let pi = 0; pi < doc.pages.length; pi++) {
      const pg = doc.pages[pi]; const wPt = 595.28, hPt = wPt * pg.H / pg.W, k = wPt / pg.W;
      pdf.addPage([wPt, hPt], hPt >= wPt ? "p" : "l");
      pdf.setFont("helvetica", "normal"); pdf.setTextColor(120); pdf.setFontSize(7);
      pdf.text(`Texte reconnu automatiquement, même mise en page (page ${pi + 1}). À vérifier avec l’original.`, 18, 14);
      pdf.setTextColor(20, 30, 40);
      const lineOf = {}; pg.blocks.forEach(bl => bl.lines.forEach(ln => ln.items.forEach(it => { if (it.w != null) lineOf[it.w] = ln.b; })));
      pg.words.forEach(w => { if (w.filler) return; const lb = lineOf[w.id] || w.b; const h = Math.min((lb[3] - lb[1]) * 0.8, (w.b[3] - w.b[1]) * 1.6) * k; const t = LATIN.test(w.t) ? w.t : w.t.replace(/[^\x20-\x7E\xA0-\xFF]/g, "?"); pdf.setFontSize(Math.max(4, h * 0.95)); pdf.text(t, w.b[0] * k, (lb[3] * k) - h * 0.28, { maxWidth: (w.b[2] - w.b[0]) * k + h }); });
      for (const f of pg.fields) {
        const v = doc.values[`${pi}-${f.id}`]; const [x0, y0, x1, y1] = f.b.map(n => n * k); const h = y1 - y0;
        pdf.setDrawColor(43, 179, 163); pdf.setLineWidth(0.6);
        if (f.kind === "line") pdf.line(x0, y1, x1, y1); else pdf.rect(x0, y0, x1 - x0, h);
        if (!v) continue; pdf.setTextColor(23, 57, 166);
        if (f.kind === "check") { pdf.setFontSize(h * 0.9); pdf.text("X", x0 + h * 0.2, y1 - h * 0.15); }
        else if (LATIN.test(v)) { pdf.setFontSize(Math.max(6, Math.min(h * 0.62, 16))); pdf.text(v, x0 + 3, f.kind === "line" ? y1 - h * 0.22 : y0 + h / 2 + h * 0.2, { maxWidth: x1 - x0 - 4 }); }
        else { const c = document.createElement("canvas"); const s = 3; c.width = Math.max(10, (x1 - x0) * s); c.height = Math.max(10, h * s); const cx = c.getContext("2d"); const size = Math.min(h * 0.62, 16) * s; cx.font = `600 ${size}px Figtree, "Noto Sans Arabic", "Noto Sans SC", sans-serif`; cx.fillStyle = "#1739A6"; const rtl = /[֐-ࣿ]/.test(v); cx.direction = rtl ? "rtl" : "ltr"; cx.textAlign = rtl ? "right" : "left"; cx.fillText(v, rtl ? c.width - 6 : 6, c.height * 0.72, c.width - 12); pdf.addImage(c.toDataURL("image/png"), "PNG", x0, y0, x1 - x0, h); }
        pdf.setTextColor(20, 30, 40);
      }
    }
    const blob = pdf.output("blob"); const name = (doc.name || "courrier").replace(/\.[a-z0-9]+$/i, "").replace(/[^\w\-]+/g, "-").slice(0, 60) + "-rempli.pdf";
    window.__lastPdf = blob;
    const dl = await DL;
    if (dl) {
      try { await dl.save({ filename: name, data: blob }); toast("Document exporté"); }
      catch (e) { toast(e && e.code === "declined" ? "Export annulé" : "L’export n’est pas disponible ici"); }
      return;
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast("Document exporté");
  } catch (e) { toast("Export impossible : " + esc(String((e && e.message) || e))); }
}


/* ---------- Enregistrement (image allégée pour tenir dans le téléphone) ---------- */
async function shrink(dataUrl, maxW) {
  const img = await loadImg(dataUrl); const k = Math.min(1, maxW / img.width); const c = document.createElement("canvas");
  c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); return c.toDataURL("image/jpeg", 0.72);
}
async function saveOcrDoc(doc) {
  const copy = { type: "ocr", id: "o" + Date.now(), savedAt: new Date().toISOString(), name: doc.name, total: doc.total, values: doc.values, deadline: doc.deadline, ai: doc.ai || null, pages: [] };
  for (const p of doc.pages) copy.pages.push({ ...p, img: await shrink(p.img, 1100) });
  S.docs.push(copy); save();
  let ok = true; try { const raw = localStorage.getItem(STORE_KEY); ok = !!raw && raw.includes(copy.id); } catch (e) { ok = false; }
  if (!ok) { S.docs = S.docs.filter(d => d.id !== copy.id); toast("Pas assez de place sur ce téléphone pour enregistrer ce document."); return null; }
  return copy;
}
