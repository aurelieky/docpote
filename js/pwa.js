/* Application installable : service worker + bouton « Installer » (écran « i »). */
const PWA = { prompt: null };
PWA.standalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
PWA.ios = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
if ("serviceWorker" in navigator && document.querySelector('link[rel="manifest"]') && (location.protocol === "https:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname))) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); PWA.prompt = e; });
window.addEventListener("appinstalled", () => { PWA.prompt = null; });
async function pwaInstall() {
  if (!PWA.prompt) return false;
  PWA.prompt.prompt(); try { await PWA.prompt.userChoice; } catch (e) {}
  PWA.prompt = null; return true;
}
function pwaSection() {
  if (!document.querySelector('link[rel="manifest"]')) return "";
  let body;
  if (PWA.standalone()) body = `<p class="small">${PIC.check} L’application est installée sur ce téléphone.</p>`;
  else if (PWA.prompt) body = `<button class="act primary" data-act="pwa-install">${PIC.plus}Installer sur ce téléphone</button>`;
  else if (PWA.ios()) body = `<p class="small">Dans Safari : touchez le bouton Partager (carré avec une flèche), puis « Sur l’écran d’accueil ».</p>`;
  else body = `<p class="small">Dans le menu du navigateur (⋮), choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».</p>`;
  return `<div class="info-sec"><h3>Installer l’application</h3>${body}<p class="small muted">Après une première visite, l’application s’ouvre même sans réseau (sauf l’assistant).</p></div>`;
}
