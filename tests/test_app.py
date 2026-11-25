"""Test de bout en bout du pilote DocPote (écran de téléphone, 390 × 844).

Lancer depuis la racine du dépôt :
    npm ci                      # copies locales des bibliothèques chargées depuis les CDN
    python3 tests/test_app.py   # Playwright + Chromium

Les URL des CDN sont redirigées vers node_modules : le test marche sans Internet.
La synthèse vocale est simulée (quelques voix seulement, dont zh-HK mais pas de voix
wenzhou ni kabyle) pour vérifier qu'aucune voix n'est substituée en silence.
L'assistant (sample) et la dictée sont simulés pour vérifier le consentement,
le format des réponses et les états du micro.
Les captures d'écran vont dans tests/shots/ (ignoré par git).
"""
import functools, http.server, pathlib, subprocess, sys, threading, json
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
NM = ROOT / "node_modules"
SHOTS = ROOT / "tests/shots"; SHOTS.mkdir(exist_ok=True)
FIX = ROOT / "tests/fixtures"
ROUTES = {
    "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js": NM / "tesseract.js/dist/tesseract.min.js",
    "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js": NM / "tesseract.js/dist/worker.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js": NM / "pdfjs-dist/build/pdf.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js": NM / "pdfjs-dist/build/pdf.worker.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js": NM / "jspdf/dist/jspdf.umd.min.js",
}
def cdn(route):
    u = route.request.url; f = ROUTES.get(u)
    if f is None and u.startswith("https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.1/"): f = NM / "tesseract.js-core" / u.rsplit("/", 1)[1]
    if f is not None and f.exists(): return route.fulfill(status=200, content_type="application/javascript", body=f.read_bytes(), headers={"Access-Control-Allow-Origin": "*"})
    return route.fulfill(status=404, body="")
FAKE = """(() => {
  const voices = ['fr-FR','en-GB','zh-CN','zh-HK','ar-SA','tr-TR','es-ES'].map(l => ({lang:l, name:l}));
  window.__spoken = [];
  const ss = { getVoices:()=>voices, speak(u){ window.__spoken.push({t:u.text,l:u.lang}); this._u=u; }, cancel(){ this._u=null; }, pause(){}, resume(){} };
  window.__u = () => ss._u;
  window.__finish = () => { const u = ss._u; ss._u = null; u && u.onend && u.onend(); };
  Object.defineProperty(window, 'speechSynthesis', { value: ss });
  window.SpeechSynthesisUtterance = function(t){ this.text=t; };
  // Assistant et dictée simulés (dans l'application Claude, ce sont de vraies capacités)
  window.__prompts = [];
  const sample = async (input, opts) => { window.__prompts.push(input); const t = "COURRIER : Il faut envoyer deux documents avant le 29 novembre.\\nGÉNÉRAL : Une attestation de loyer est remplie par le propriétaire."; opts && opts.onText && opts.onText({text:t, delta:t}); return {text:t, truncated:false}; };
  sample.json = async (input) => { window.__prompts.push(input); return {purpose:"Demande de renseignements de la CAF.", asked:"Remplir le formulaire et le renvoyer.", kind:"formulaire", provide:["Nom","Prénom","Date de naissance","justificatif de domicile"], deadline_quote:"avant le 20/11/2026", steps:[{title:"Remplir le nom et le prénom", detail:"Écrivez-les en majuscules.", icon:"write"},{title:"Renvoyer le formulaire", detail:"Par courrier.", icon:"send"}]}; };
  let st = null, fin = null, part = null;
  const dict = { start: async (o) => { window.__dictLang = o && o.language; st && st({state:'listening'}); }, stop: async () => { fin && fin({text:' Que dois-je envoyer ?'}); st && st({state:'idle', reason:'stopped'}); }, active: () => false,
    onState: h => { st = h; return () => {}; }, onFinal: h => { fin = h; return () => {}; }, onPartial: h => { part = h; return () => {}; } };
  window.__played = [];
  window.Audio = function(src){ this.src = src; this.play = () => { window.__played.push(src); return Promise.resolve(); }; this.pause = () => {}; };
  if (window.__noClaude) return;
  window.claude = { use: async name => name === 'sample' ? sample : name === 'dictation' ? dict : null };
})();"""
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
fails, errs = [], []
def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond: fails.append(msg)

def main():
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    url = f"http://127.0.0.1:{srv.server_address[1]}/index.html"
    with sync_playwright() as p:
        b = p.chromium.launch()
        c = b.new_context(viewport={"width": 390, "height": 844}, accept_downloads=True, reduced_motion="reduce", service_workers="block")
        c.route("**/fonts.googleapis.com/**", lambda r: r.fulfill(status=200, content_type="text/css", body=""))
        c.route("**/fonts.gstatic.com/**", lambda r: r.fulfill(status=404, body=""))
        c.route("https://cdn.jsdelivr.net/**", cdn); c.route("https://cdnjs.cloudflare.com/**", cdn)
        c.add_init_script(FAKE)
        pg = c.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(url, wait_until="networkidle"); pg.wait_for_timeout(200)
        def snap(name, full=True):
            pg.wait_for_timeout(120); pg.screenshot(path=str(SHOTS / f"{name}.png"), full_page=full)
            ow = pg.evaluate("document.documentElement.scrollWidth - innerWidth")
            check(ow <= 0, f"{name} : pas de défilement horizontal ({ow}px)")
        def small_targets():
            return pg.evaluate("[...document.querySelectorAll('main button, main label.door-main, main a, .sheet button, .player button')].filter(b=>{const r=b.getBoundingClientRect(); return r.width && r.height && !b.classList.contains('term') && !b.closest('.page-wrap') && (r.height<44||r.width<44)}).map(b=>(b.className||b.tagName)+':'+b.textContent.trim().slice(0,15))")

        # 1. Langue : premier écran seul, 28 langues, écouter ≠ choisir, pas de substitution
        check(pg.locator(".lang-card").count() == 28, "28 langues proposées")
        check(pg.locator(".door, .langchip").count() == 0, "premier lancement : seulement le choix de langue")
        check(pg.locator("img[src*=flag], .flag").count() == 0, "aucun drapeau")
        snap("01_langues", False)
        pg.click(".lang-listen[data-code=wzh]")
        check(len(pg.evaluate("__spoken")) == 0 and pg.evaluate("__played.slice(-1)[0]") == "audio/langues/wzh.mp3" and "vraie voix" in pg.inner_text("#lang-msg"), "wenzhou : vraie voix humaine, pas de voix mandarine")
        check(pg.locator(".lang-card.on").count() == 0, "écouter ne sélectionne pas la langue")
        pg.click(".lang-listen[data-code=prs]")
        check(len(pg.evaluate("__spoken")) == 0 and "pas encore" in pg.inner_text("#lang-msg"), "dari : ni extrait ni voix iranienne de remplacement")
        check(pg.evaluate("voiceFor('yue').lang") == "zh-HK" and pg.evaluate("voiceFor('cmn').lang") == "zh-CN" and pg.evaluate("voiceFor('wzh')") is None, "voix : cantonais zh-HK, mandarin zh-CN, rien pour le wenzhou")
        n = pg.evaluate("LANG_LIST.filter(L => hasSample(L.code)).length"); check(n >= 20, f"extraits de voix humaine : {n} langues")
        missing = pg.evaluate("Promise.all(LANG_LIST.filter(L => hasSample(L.code)).map(L => fetch(RECORDINGS[L.code].sample).then(r => r.ok ? null : L.code)))")
        check(not [m for m in missing if m], f"tous les fichiers audio existent {missing}")
        check(pg.evaluate("LANG_LIST.filter(L => hasSample(L.code)).every(L => RECORDINGS[L.code].credit && RECORDINGS[L.code].license && /^https:/.test(RECORDINGS[L.code].source))"), "chaque extrait : crédit, licence, source")
        pg.click(".lang-choose[data-code=ar]")
        check(pg.locator(".door").count() == 2, "accueil : deux grandes portes")
        snap("02_accueil", False)
        pg.reload(wait_until="networkidle"); pg.wait_for_timeout(150)
        check(pg.locator(".door").count() == 2 and "العربية" in pg.inner_text(".langchip"), "langue mémorisée : accueil direct")
        check(not small_targets(), f"accueil : cibles ≥ 44 px {small_targets()}")
        pg.click(".door .say"); check(pg.evaluate("__spoken.slice(-1)[0].l") == "ar-SA", "aide sonore de la porte en arabe")
        pg.evaluate("RECORDINGS.ar.keys = { helpDocsDoor: 'audio/ar/helpDocsDoor.mp3' }"); n0 = pg.evaluate("__spoken.length")
        pg.click(".door .say >> nth=0"); check(pg.evaluate("__played.slice(-1)[0]") == "audio/ar/helpDocsDoor.mp3" and pg.evaluate("__spoken.length") == n0, "enregistrement humain prioritaire sur la voix de synthèse")
        pg.evaluate("delete RECORDINGS.ar.keys")

        # 2. Mes documents → exemples → lecteur
        pg.click("[data-act=go-docs]"); check(pg.locator("#cam[capture]").count() == 1 and pg.locator("#imp").count() == 1, "scanner (appareil photo) et importer")
        snap("03_documents", False)
        pg.click("[data-act=go-examples]"); pg.click("[data-act=open-demo][data-id=caf]")
        snap("04_lecteur_caf_ar")
        check(not small_targets(), f"lecteur : cibles ≥ 44 px {small_targets()}")
        check(pg.locator(".dl-card.near").count() == 1 and "4" in pg.inner_text(".dl-card .pill"), "échéance proche, 4 jours")
        check(pg.locator(".dl-other").count() >= 1, "date du courrier affichée à part")
        check(pg.locator(".help-card").count() == 1, "aide humaine visible en cas d'urgence")
        check(pg.locator(".q-row").count() == 4, "4 questions : à quoi sert, quoi faire, quoi fournir, avant quand")
        check(pg.locator(".steps2 li .st-pic .picto").count() == 4, "étapes illustrées")
        # Écouter et suivre : traduction lue, passage français correspondant surligné en jaune
        pg.click("[data-act=listen-doc]")
        sp = pg.evaluate("__spoken.slice(-1)[0]"); check(sp["l"] == "ar-SA" and sp["t"].startswith("الموضوع"), "lecture dans la langue choisie")
        check(pg.evaluate("[...document.querySelectorAll('.reading')].map(e=>e.id)") == ["para-p1"], "surlignage du bloc français p1")
        pg.evaluate("__finish()"); pg.wait_for_timeout(80)
        check(pg.evaluate("[...document.querySelectorAll('.reading')].map(e=>e.id)") == ["para-p2"] and pg.evaluate("__spoken.slice(-1)[0].t").startswith("سيدتي"), "bloc suivant : texte lu et surlignage alignés")
        check(pg.locator(".kara").count() == 0, "traduction : pas de faux mot-à-mot")
        snap("05_lecture", False)
        pg.click("[data-act=audio-pause]"); check(pg.locator("[data-act=audio-resume]").count() == 1, "pause")
        pg.click("[data-act=audio-resume]"); pg.click("[data-act=audio-rate]"); check(pg.evaluate("S.rate") != 1, "vitesse réglable")
        pg.click("[data-act=audio-stop]"); check(pg.locator(".reading").count() == 0, "arrêt : surlignage effacé")
        pg.click("[data-act=say-deadline]"); check("29" in pg.evaluate("__spoken.slice(-1)[0].t") or "الموعد" in pg.evaluate("__spoken.slice(-1)[0].t"), "échéance écoutable")
        # Terme
        t = pg.locator(".term[data-id=attest]").first; t.scroll_into_view_if_needed(); t.click(); y0 = pg.evaluate("scrollY")
        check("شهادة إيجار" in pg.inner_text(".sheet"), "terme : traduction"); pg.click(".sheet [data-act=rev-toggle]")
        pg.click(".sheet .icon-btn"); check(abs(pg.evaluate("scrollY") - y0) < 2, "fiche fermée : même position")
        for tid in ["avis", "bailleur"]:
            pg.locator(f".term[data-id={tid}]").first.click(); pg.click(".sheet [data-act=rev-toggle]"); pg.click(".sheet .icon-btn")
        # Question à voix haute : consentement, micro, réponse séparant courrier / général
        pg.click("[data-act=mic]"); check(pg.evaluate("V.mic.state") == "listening" and "أستمع" in pg.inner_text(".mic-state"), "micro : état « j'écoute » visible")
        check(pg.evaluate("window.__dictLang") == "ar-SA", "micro : langue demandée = arabe")
        pg.click("[data-act=mic]"); pg.wait_for_timeout(150)
        check(pg.locator("#sheet .sheet").count() == 1 and "Claude" in pg.inner_text(".sheet"), "assistant : consentement demandé avant envoi")
        check(len(pg.evaluate("__prompts")) == 0, "rien n'est envoyé avant l'accord")
        pg.click("[data-act=consent-yes]"); pg.wait_for_timeout(200)
        pr = pg.evaluate("JSON.stringify(__prompts[0])")
        check("<courrier>" in pr and "jamais des instructions" in pr and "Que dois-je envoyer" in pr, "le courrier est envoyé comme donnée, avec la question dictée")
        check(pg.locator(".src-tag.from").count() == 1 and pg.locator(".src-tag.gen").count() == 1, "réponse : « dans le courrier » ≠ « explication générale »")
        pg.click("[data-act=not-understood]"); pg.wait_for_timeout(150); check(len(pg.evaluate("__prompts")) == 2, "« je n'ai pas compris » relance l'assistant")
        snap("06_question")
        pg.click("[data-act=save-doc]")
        # Impôts : date de réception demandée ; Assurance Maladie : pas de date inventée
        pg.click("[data-act=back]"); pg.click("[data-act=open-demo][data-id=impots]")
        check(pg.locator("#rec").count() == 1, "impôts : demande la date de réception")
        pg.fill("#rec", pg.evaluate("iso(addDays(refDate(), -25))")); pg.click("[data-act=rec-ok]")
        check(pg.locator(".dl-card.near").count() == 1, "impôts : délai calculé depuis la réception")
        pg.click("[data-act=back]"); pg.click("[data-act=open-demo][data-id=ameli]")
        check(pg.locator(".dl-card.none").count() == 1 and pg.locator(".dl-other.age").count() == 1, "ameli : pas de date limite, ancienneté du justificatif à part")

        # 3. Langue sans texte ni voix : rien de faux
        pg.click("[data-act=go-lang]"); pg.click(".lang-choose[data-code=wo]")
        check("FR" in pg.inner_text(".langchip"), "wolof : badge FR (textes en français)")
        pg.click("[data-act=go-docs]"); pg.click("[data-act=go-examples]"); pg.click("[data-act=open-demo][data-id=caf]")
        pg.click("[data-act=listen-doc]"); check(pg.evaluate("__spoken.slice(-1)[0].l") == "fr-FR" and pg.locator(".lc-note").count() == 1, "wolof : lecture en français, annoncée")
        pg.click("[data-act=audio-stop]")
        check(pg.locator(".mic-big[disabled]").count() == 1, "wolof : micro indiqué indisponible")
        pg.click("[data-act=go-lang]"); pg.click(".lang-choose[data-code=ar]")

        # 4. Ensemble : apprendre
        pg.click("[data-act=go-together]"); check(pg.locator(".door").count() == 3, "Ensemble : 3 entrées")
        snap("07_ensemble", False)
        pg.click("[data-act=go-learn]"); pg.click("[data-act=quiz-start]")
        check(pg.locator(".opt-row .say").count() == 3, "réponses écoutables")
        pg.click(".opt-row .say >> nth=0"); check(len(pg.evaluate("__spoken")) > 0, "option lue")
        q = pg.evaluate("V.quiz.qs[0].id"); pg.locator(f"[data-act=quiz-answer]:not([data-id={q}])").first.click()
        check(pg.locator("[data-act=quiz-retry]").count() == 1 and pg.locator("[data-act=say-fb]").count() == 1, "erreur : explication écoutable + réessayer")
        snap("08_quiz")
        pg.click("[data-act=quiz-retry]"); pg.click(f"[data-act=quiz-answer][data-id={q}]"); check(pg.evaluate("S.xp") == 5, "XP gagnés")
        pg.click("[data-act=quiz-quit]")
        # Communauté
        pg.click("[data-act=back]"); pg.click("[data-act=go-comm]")
        check("Démonstration" in pg.inner_text("main"), "simulation annoncée")
        check(pg.locator(".not-official").count() >= 1, "réponses : pas un conseil officiel")
        pg.click("[data-act=post-new]"); pg.fill("#post-input", "Mon numéro allocataire est 1234567, appelez le 06 12 34 56 78"); pg.click("[data-act=post-preview]")
        check(pg.locator(".warn-box").count() == 1 and pg.locator("[data-act=post-publish]").count() == 0, "publication bloquée : numéro, coordonnées")
        pg.fill("#post-input", "Où trouver un cours de français le samedi ?"); pg.click("[data-act=post-preview]")
        check(pg.locator("[data-act=post-publish]").count() == 1 and pg.locator(".sheet .safety").count() == 1, "aperçu avant publication + rappel de sécurité")
        pg.click("[data-act=post-publish]"); check("cours de français le samedi" in pg.inner_text("main"), "question publiée (locale)")
        main_txt = pg.inner_text("main")
        check("Caisse d" not in main_txt and "allocataire" not in main_txt.lower() and "29 novembre" not in main_txt, "rien de privé dans la communauté")
        pg.click("[data-act=comm-tab][data-v=requests]"); n0 = pg.locator("[data-act=req-accept]").count()
        pg.click("[data-act=req-accept] >> nth=0"); check(pg.locator("[data-act=req-accept]").count() == n0 - 1 and len(pg.evaluate("S.friends")) == 1, "demande d'ami acceptée")
        pg.click("[data-act=comm-tab][data-v=people]"); pg.click("[data-act=person][data-id=u3]"); pg.click(".sheet [data-act=friend-add]")
        check("personne ne la reçoit" in pg.inner_text(".sheet"), "demande envoyée : simulation explicite")
        pg.click(".sheet [data-act=report]"); pg.click(".sheet [data-act=report-send]"); check("aucun modérateur" in pg.inner_text(".sheet"), "signalement : pas de faux modérateur")
        pg.click(".sheet [data-act=block]"); check(pg.locator("[data-act=person][data-id=u3]").count() == 0, "bloquer masque le profil")
        snap("09_communaute")
        # Profil
        pg.click("[data-act=back]"); pg.click("[data-act=go-profile]")
        check("Profil local de démonstration" in pg.inner_text("main") and "Se connecter" not in pg.inner_text("main"), "profil local, pas de fausse connexion")
        check(pg.locator(".panel.public").count() == 1 and pg.locator(".panel.private").count() == 1, "profil public et espace privé séparés")
        pg.click("[data-act=visible]"); check(pg.locator("[data-act=visible-yes][disabled]").count() == 1, "visible : pseudonyme requis, aperçu d'abord")
        pg.click(".sheet .icon-btn"); pg.click(".edit summary"); pg.fill("#pseudo", "Soleil93"); pg.click("[data-act=plang][data-code=ar]")
        pg.click("[data-act=visible]"); pg.click("[data-act=visible-yes]")
        pg.click("[data-act=back]"); pg.click("[data-act=go-comm]"); pg.click("[data-act=comm-tab][data-v=people]"); pg.click("[data-act=person][data-id=me]")
        sh = pg.inner_text(".sheet"); check("Soleil93" in sh and "CAF" not in sh and "XP" not in sh, "profil public : aucun document ni progrès privé")
        pg.click(".sheet .icon-btn"); snap("10_profil_public")

        # 5. Vrai document : OCR, couche de texte, lecture par bloc sur l'image
        pg.click("[data-act=home]"); pg.click("[data-act=go-docs]")
        pg.set_input_files("#imp", str(FIX / "formulaire_test.png"))
        pg.wait_for_function("V.screen === 'reader' || (V.ocr && V.ocr.status === 'error')", timeout=180000)
        check(pg.evaluate("V.screen") == "reader", f"OCR terminé {pg.evaluate('(V.ocr && V.ocr.error) || \"\"')}")
        info = pg.evaluate("""(() => { const p = V.doc.data.pages[0]; return { words: p.words.length, cols: [...new Set(p.blocks.map(b=>b.col).filter(Boolean))].length, chips: p.chips.map(c=>c.text), kinds: p.fields.map(f=>f.kind), labels: p.fields.map(f=>f.label) } })()""")
        check(info["words"] > 80 and info["cols"] >= 2, f"OCR : texte et deux colonnes ({info['words']} mots)")
        check("20/11/2026" in info["chips"], "OCR : date repérée")
        check(info["kinds"].count("check") == 2 and "Nom" in info["labels"], f"OCR : cases à remplir {info['labels']}")
        check(pg.locator(".txt-layer .ow-box").count() > 80, "couche de texte alignée sur l'image")
        check(pg.locator(".dl-card.unknown").count() == 1, "OCR : date à vérifier (rien d'inventé)")
        pg.click("[data-act=ocr-date][data-iso='2026-11-20']"); check(pg.locator(".dl-card.unknown").count() == 0, "OCR : date limite choisie par la personne")
        pg.click("[data-act=listen-doc]")
        blk = pg.evaluate("[...document.querySelectorAll('.blk-box.reading')].length"); check(blk == 1, "lecture : bloc surligné sur l'image")
        i = max(0, pg.evaluate("__u().text").find("Caisse")); pg.evaluate(f"__u().onboundary({{name:'word', charIndex:{i}, charLength:6}})")
        k = pg.evaluate("document.querySelector('.ow-box.kara')?.textContent || ''")
        check(k.strip().startswith("Caisse"), f"surlignage = mot réellement lu ({k.strip()})")
        snap("11_ocr_lecture", False); pg.click("[data-act=audio-stop]")
        pg.click("[data-act=ai-explain]"); pg.wait_for_timeout(100)
        if pg.locator("[data-act=consent-yes]").count(): pg.click("[data-act=consent-yes]")
        pg.wait_for_timeout(300); check(pg.locator(".q-row").count() == 4 and pg.locator(".ai-note").count() >= 1, "explication IA : 4 réponses, signalée comme IA")
        nom = pg.evaluate("V.doc.data.pages[0].fields.find(f=>f.label==='Nom').id")
        pg.fill(f".f-in[data-f='0-{nom}']", "Diallo Aminata")
        with pg.expect_download(timeout=60000) as d: pg.click("[data-act=ocr-export]")
        out = SHOTS / "export.pdf"; d.value.save_as(str(out))
        try:
            txt = subprocess.run(["pdftotext", str(out), "-"], capture_output=True, text=True).stdout
            check("Diallo Aminata" in txt, "export PDF : réponse présente")
        except FileNotFoundError:
            check(out.stat().st_size > 50000, "export PDF créé")
        snap("12_ocr")
        pg.emulate_media(color_scheme="dark"); pg.click("[data-act=home]"); snap("13_sombre", False)
        pg.click("[data-act=info]"); check("Voix humaines" in pg.inner_text(".sheet") and pg.locator(".sheet .credits li").count() >= 20, "crédits des voix humaines")
        snap("14_infos")

        # 6. Hors de l'application Claude : l'assistant explique pourquoi il est indisponible
        c2 = b.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce", service_workers="block")
        c2.route("**/fonts.googleapis.com/**", lambda r: r.fulfill(status=200, content_type="text/css", body=""))
        c2.route("https://cdn.jsdelivr.net/**", cdn); c2.route("https://cdnjs.cloudflare.com/**", cdn)
        c2.add_init_script("window.__noClaude = true;"); c2.add_init_script(FAKE)
        p2 = c2.new_page(); p2.on("pageerror", lambda e: errs.append(str(e)))
        p2.goto(url, wait_until="networkidle"); p2.click(".lang-choose[data-code=fr]")
        p2.click("[data-act=go-docs]"); p2.click("[data-act=go-examples]"); p2.click("[data-act=open-demo][data-id=caf]")
        p2.fill("#ask-input", "Que dois-je envoyer ?"); p2.press("#ask-input", "Enter"); p2.wait_for_timeout(200)
        check("claude.ai" in p2.inner_text(".ask-card .error"), "sans Claude : message clair (ouvrir dans Claude, connecté)")
        check(p2.evaluate("aiError({code:'not_granted'})") != p2.evaluate("aiError({code:'session_expired'})") and "Recharg" in p2.evaluate("aiError({code:'not_granted'})"), "erreurs de l'assistant : messages distincts")
        c2.close()
        # Assistant prêt en retard : le clic attend au lieu d'afficher « indisponible »
        c3 = b.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce", service_workers="block")
        c3.route("**/fonts.googleapis.com/**", lambda r: r.fulfill(status=200, content_type="text/css", body=""))
        c3.route("https://cdn.jsdelivr.net/**", cdn); c3.route("https://cdnjs.cloudflare.com/**", cdn)
        c3.add_init_script(FAKE); c3.add_init_script("(() => { const u = window.claude.use; window.claude.use = n => n === 'sample' ? new Promise(r => setTimeout(() => r(u(n)), 1500)) : u(n); })();")
        p3 = c3.new_page(); p3.on("pageerror", lambda e: errs.append(str(e)))
        p3.goto(url); p3.wait_for_timeout(300); p3.click(".lang-choose[data-code=fr]")
        p3.click("[data-act=go-docs]"); p3.click("[data-act=go-examples]"); p3.click("[data-act=open-demo][data-id=caf]")
        p3.fill("#ask-input", "Que dois-je envoyer ?"); p3.press("#ask-input", "Enter"); p3.wait_for_timeout(1800)
        check(p3.locator("[data-act=consent-yes]").count() == 1, "assistant chargé en retard : demande d'accord, pas « indisponible »")
        c3.close()

        # 7. Application installable (PWA) : manifeste, icônes, service worker, ouverture sans réseau
        man = json.loads((ROOT / "manifest.webmanifest").read_text())
        check(man["display"] == "standalone" and any(i["sizes"] == "512x512" and i.get("purpose") == "maskable" for i in man["icons"]) and all((ROOT / i["src"]).exists() for i in man["icons"]), "manifeste valide, icônes présentes")
        sw = (ROOT / "sw.js").read_text(); core = sw[sw.index("CORE = [") + 8:sw.index("];", sw.index("CORE = ["))]
        check(all((ROOT / f.strip().strip('"')).exists() for f in core.split(",") if f.strip().strip('"') not in ("./",)), "service worker : tous les fichiers de base existent")
        vc = json.loads((ROOT / "vercel.json").read_text()); check(vc["outputDirectory"] == "." and any(h["source"] == "/sw.js" for h in vc["headers"]), "vercel.json : site statique, sw.js non mis en cache")
        c4 = b.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        c4.route("**/fonts.googleapis.com/**", lambda r: r.fulfill(status=200, content_type="text/css", body=""))
        c4.add_init_script("window.__noClaude = true;"); c4.add_init_script(FAKE)
        p4 = c4.new_page(); p4.on("pageerror", lambda e: errs.append(str(e)))
        p4.goto(url, wait_until="load")
        ok = p4.evaluate("navigator.serviceWorker.ready.then(r => !!r.active)"); check(ok, "service worker actif")
        p4.wait_for_function("caches.open('docpote-shell-v1').then(c => c.keys()).then(k => k.length >= 13)", timeout=10000)
        p4.reload(wait_until="load"); c4.set_offline(True); p4.reload(wait_until="load"); p4.wait_for_timeout(200)
        check(p4.locator(".lang-card").count() == 28, "sans réseau : l'application s'ouvre")
        c4.set_offline(False); p4.click(".lang-choose[data-code=fr]"); p4.click("[data-act=info]")
        check("Installer l’application" in p4.inner_text(".sheet"), "écran « i » : comment installer")
        p4.screenshot(path=str(SHOTS / "15_installer.png")); c4.close()
        single = (ROOT / "build/docpote.html")
        subprocess.run([sys.executable, str(ROOT / "scripts/build_single.py")], capture_output=True)
        check(single.exists() and "manifest.webmanifest" not in single.read_text(), "copie claude.ai : sans manifeste ni service worker")
        b.close()
    srv.shutdown()
    print("erreurs JS :", errs or "aucune"); print("échecs :", fails or "aucun")
    sys.exit(1 if fails or errs else 0)

if __name__ == "__main__":
    main()
