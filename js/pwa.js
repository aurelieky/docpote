/* Application installable : service worker + bouton « Installer » (écran « i »). */
const PWA = { prompt: null };
PWA.standalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
PWA.ios = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
if ("serviceWorker" in navigator && document.querySelector('link[rel="manifest"]') && (location.protocol === "https:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname))) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); PWA.prompt = e; });
window.addEventListener("appinstalled", () => { PWA.prompt = null; PWA.done = true; });
async function pwaInstall() {
  if (!PWA.prompt) return false;
  PWA.prompt.prompt(); let c = null; try { c = await PWA.prompt.userChoice; } catch (e) {}
  PWA.prompt = null; if (c && c.outcome === "accepted") PWA.done = true; return true;
}
function pwaSection() {
  if (!document.querySelector('link[rel="manifest"]')) return "";
  let body;
  if (PWA.standalone() || PWA.done) body = `<p class="small">${PIC.check} ${esc(T("installed"))}</p>`;
  else if (PWA.prompt) body = `<button class="act primary" data-act="pwa-install">${PIC.plus}${esc(T("installBtn"))}</button>`;
  else if (PWA.ios()) body = `<p class="small">${esc(T("installIos"))}</p>`;
  else body = `<p class="small">${esc(T("installMenu"))}</p>`;
  return `<div class="info-sec"><h3>${esc(T("installTitle"))}</h3>${body}<p class="small muted">${esc(T("installOffline"))}</p></div>`;
}
