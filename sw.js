/* DocPote : service worker (application installable, marche sans réseau après une première visite).
   - Fichiers de l'application (même site) : réseau d'abord, pour recevoir chaque mise à jour ; copie locale si hors ligne.
   - Bibliothèques (CDN), polices, données OCR et voix : copie locale d'abord (elles ne changent pas).
   Aucune donnée personnelle ne passe par ici : les courriers restent dans le téléphone. */
const SHELL = "docpote-shell-v1", STATIC = "docpote-static-v1";
const CORE = ["./", "index.html", "css/style.css", "js/data.js", "js/content.js", "js/langs.js", "js/pictos.js", "js/app.js", "js/ocr.js", "js/pwa.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
const LONG_LIVED = /^https:\/\/(cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener("install", e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== STATIC).map(k => caches.delete(k)))).then(() => self.clients.claim())); });

self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  const lasting = LONG_LIVED.test(req.url) || (same && /^\/(tess|audio|icons)\//.test(url.pathname));
  if (lasting) { e.respondWith(cacheFirst(req)); return; }
  if (same) { e.respondWith(networkFirst(req)); }
});
async function cacheFirst(req) {
  const hit = await caches.match(req); if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === "opaque")) { const c = await caches.open(STATIC); c.put(req, res.clone()); }
  return res;
}
async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res && res.ok) { const c = await caches.open(SHELL); c.put(req, res.clone()); }
    return res;
  } catch (err) {
    const hit = await caches.match(req, { ignoreSearch: true }) || (req.mode === "navigate" ? await caches.match("index.html") : null);
    if (hit) return hit; throw err;
  }
}
