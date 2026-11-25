/* ===== Langues proposées =====
   Ordre de la demande, sans classement par région et sans drapeaux.

   Pour chaque langue, on distingue trois choses, sans jamais les confondre :
   - text : la langue dans laquelle les textes de l'application existent vraiment
            (fr, en, zh = chinois écrit standard, ar). Sinon : "fr" + avertissement.
   - tts  : les codes de voix de synthèse acceptés pour CETTE langue. La présence d'une
            voix est vérifiée sur l'appareil. Aucune substitution : le wenzhou et le
            teochew ne sont jamais lus par une voix mandarine, le dari n'est jamais lu
            par une voix persane d'Iran.
   - stt  : le code proposé à la reconnaissance vocale (micro). null = pas de service connu.
            Même avec un code, le service peut refuser : l'application l'indique alors.
   - ai   : l'assistant peut répondre par écrit dans cette langue (réponse à faire
            vérifier). Sinon, il répond en français simple et le dit.
   - hello: phrase d'accueil lue par la voix de l'appareil. null quand nous n'avons pas
            de formulation sûre : on n'invente ni traduction ni prononciation.

   RECORDINGS permet d'ajouter plus tard des enregistrements humains validés
   (fichiers audio publiés avec l'application), prioritaires sur la synthèse. */
const LANG_LIST = [
  { code: "fr", fr: "Français", native: "Français", dir: "ltr", text: "fr", tts: ["fr-FR", "fr"], stt: "fr-FR", ai: true, hello: "Bienvenue. Vous avez choisi le français." },
  { code: "en", fr: "Anglais", native: "English", dir: "ltr", text: "en", tts: ["en-GB", "en"], stt: "en-GB", ai: true, hello: "Welcome. You have chosen English." },
  { code: "cmn", fr: "Mandarin", native: "普通话", dir: "ltr", font: "zh", text: "zh", tts: ["zh-CN", "cmn"], stt: "zh-CN", ai: true, hello: "欢迎。您选择了普通话。" },
  { code: "wzh", fr: "Wenzhou", native: "温州话", dir: "ltr", font: "zh", text: "zh", textNote: "chinois écrit standard", tts: [], stt: null, ai: false, hello: null },
  { code: "yue", fr: "Cantonais", native: "廣東話", dir: "ltr", font: "zh", text: "zh", textNote: "chinois écrit standard", tts: ["zh-HK", "yue"], stt: "yue-Hant-HK", ai: true, hello: "歡迎。" },
  { code: "nan-tc", fr: "Teochew", native: "潮州話", dir: "ltr", font: "zh", text: "zh", textNote: "chinois écrit standard", tts: [], stt: null, ai: false, hello: null },
  { code: "bn", fr: "Bengali", native: "বাংলা", dir: "ltr", text: "fr", tts: ["bn"], stt: "bn-BD", ai: true, hello: "স্বাগতম।" },
  { code: "ta", fr: "Tamoul", native: "தமிழ்", dir: "ltr", text: "fr", tts: ["ta"], stt: "ta-IN", ai: true, hello: "வணக்கம்." },
  { code: "kab", fr: "Kabyle", native: "Taqbaylit", dir: "ltr", text: "fr", tts: [], stt: null, ai: false, hello: null },
  { code: "prs", fr: "Dari", native: "دری", dir: "rtl", text: "fr", tts: ["fa-AF", "prs"], stt: null, ai: true, hello: "خوش آمدید." },
  { code: "ps", fr: "Pachto", native: "پښتو", dir: "rtl", text: "fr", tts: ["ps"], stt: null, ai: true, hello: "ښه راغلاست." },
  { code: "bm", fr: "Bambara", native: "Bamanankan", dir: "ltr", text: "fr", tts: [], stt: null, ai: false, hello: null },
  { code: "ar", fr: "Arabe", native: "العربية", dir: "rtl", text: "ar", tts: ["ar"], stt: "ar-SA", ai: true, hello: "أهلًا وسهلًا. اخترت العربية." },
  { code: "ur", fr: "Ourdou", native: "اردو", dir: "rtl", text: "fr", tts: ["ur"], stt: "ur-PK", ai: true, hello: "خوش آمدید۔" },
  { code: "pa", fr: "Pendjabi", native: "ਪੰਜਾਬੀ · پنجابی", dir: "ltr", text: "fr", tts: ["pa"], stt: "pa-Guru-IN", ai: true, hello: "ਜੀ ਆਇਆਂ ਨੂੰ।" },
  { code: "wo", fr: "Wolof", native: "Wolof", dir: "ltr", text: "fr", tts: [], stt: null, ai: false, hello: null },
  { code: "snk", fr: "Soninké", native: "Sooninkanxanne", dir: "ltr", text: "fr", tts: [], stt: null, ai: false, hello: null },
  { code: "ff", fr: "Peul", native: "Pulaar · Fulfulde", dir: "ltr", text: "fr", tts: [], stt: null, ai: false, hello: null },
  { code: "so", fr: "Somali", native: "Soomaali", dir: "ltr", text: "fr", tts: ["so"], stt: "so-SO", ai: true, hello: "Soo dhawoow." },
  { code: "ti", fr: "Tigrinya", native: "ትግርኛ", dir: "ltr", text: "fr", tts: ["ti"], stt: null, ai: false, hello: null },
  { code: "tr", fr: "Turc", native: "Türkçe", dir: "ltr", text: "fr", tts: ["tr"], stt: "tr-TR", ai: true, hello: "Hoş geldiniz." },
  { code: "fa", fr: "Persan / Farsi", native: "فارسی", dir: "rtl", text: "fr", tts: ["fa-IR", "fa"], stt: "fa-IR", ai: true, hello: "خوش آمدید." },
  { code: "ro", fr: "Roumain", native: "Română", dir: "ltr", text: "fr", tts: ["ro"], stt: "ro-RO", ai: true, hello: "Bun venit." },
  { code: "ru", fr: "Russe", native: "Русский", dir: "ltr", text: "fr", tts: ["ru"], stt: "ru-RU", ai: true, hello: "Добро пожаловать." },
  { code: "uk", fr: "Ukrainien", native: "Українська", dir: "ltr", text: "fr", tts: ["uk"], stt: "uk-UA", ai: true, hello: "Ласкаво просимо." },
  { code: "es", fr: "Espagnol", native: "Español", dir: "ltr", text: "fr", tts: ["es"], stt: "es-ES", ai: true, hello: "Bienvenido." },
  { code: "pt", fr: "Portugais", native: "Português", dir: "ltr", text: "fr", tts: ["pt"], stt: "pt-PT", ai: true, hello: "Bem-vindo." },
  { code: "ht", fr: "Créole haïtien", native: "Kreyòl ayisyen", dir: "ltr", text: "fr", tts: ["ht"], stt: null, ai: true, hello: "Byenveni." }
];
const LANG_BY = Object.fromEntries(LANG_LIST.map(l => [l.code, l]));

/* Enregistrements humains.
   - sample : court extrait (7 s) d'une vraie voix dans la langue, pour la reconnaître à l'oreille
     sur l'écran des langues. Phrases quelconques tirées de corpus publics (le sens n'a pas de
     rapport avec l'application), choisies pour leur contenu neutre et leur licence ouverte.
     Exclus : dari (droits réservés), soninké (pas de licence ouverte), tigrinya et ourdou
     (extraits disponibles au contenu violent ou politique).
   - keys : enregistrements validés des phrases de l'application (voir docs/ENREGISTREMENTS.md),
     prioritaires sur la voix de synthèse. Vide pour l'instant. Exemple :
     RECORDINGS.wo.keys = { helpDocsDoor: "audio/wo/helpDocsDoor.mp3" } */
const RECORDINGS = {
  "fr": { sample: "audio/langues/fr.mp3", voice: "femme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "en": { sample: "audio/langues/en.mp3", voice: "femme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "cmn": { sample: "audio/langues/cmn.mp3", voice: "femme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "wzh": { sample: "audio/langues/wzh.mp3", voice: "homme", credit: "Gabriel. (2013). 关于温州话. In K. P. van Dam, S. Hansen & J. Qi (eds.), Phonemica.", license: "CC BY-NC-SA 4.0 (extrait raccourci, même licence)", source: "https://phonemica.net/x/543746312bd553930782aaca/0", contentChecked: false },
  "yue": { sample: "audio/langues/yue.mp3", voice: "homme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "nan-tc": { sample: "audio/langues/nan-tc.mp3", voice: "homme", credit: "Ruihao (瑞浩). (2013). 潮州市的一个故事. In K. P. van Dam, S. Hansen & J. Qi (eds.), Phonemica.", license: "CC BY-NC-SA 4.0 (extrait raccourci, même licence)", source: "https://phonemica.net/x/543746312bd553930782ab59/0", contentChecked: false },
  "bn": { sample: "audio/langues/bn.mp3", voice: "homme", credit: "Google FLEURS", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs/viewer/bn_in/validation" },
  "ta": { sample: "audio/langues/ta.mp3", voice: "femme", credit: "Google FLEURS", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs/viewer/ta_in/validation" },
  "kab": { sample: "audio/langues/kab.mp3", voice: "homme", credit: "Common Voice volunteer; CommonLanguage by Ganesh Sinisetty, Pavlo Ruban, Oleksandr Dymov, Mirco Ravanelli (2021); Parquet conversion regisss/common_language.", license: "CC BY 4.0", source: "https://huggingface.co/datasets/speechbrain/common_language" },
  "ps": { sample: "audio/langues/ps.mp3", voice: "homme", credit: "Google FLEURS", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs/viewer/ps_af/validation" },
  "bm": { sample: "audio/langues/bm.mp3", voice: "homme", credit: "Sebastien Diarra; Michael Leventhal / RobotsMali; excerpt published by Coleman Donaldson (An ka taa).", license: "CC BY 4.0", source: "https://www.ankataa.com/blog/2022/10/13/the-griots-and-tales-of-jeli-asr", contentChecked: false },
  "ar": { sample: "audio/langues/ar.mp3", voice: "femme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "pa": { sample: "audio/langues/pa.mp3", voice: "homme", credit: "Google FLEURS", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs/viewer/pa_in/validation" },
  "wo": { sample: "audio/langues/wo.mp3", voice: "homme", credit: "Google and FLEURS dataset contributors", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "ff": { sample: "audio/langues/ff.mp3", voice: "homme", credit: "Google and FLEURS dataset contributors", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "so": { sample: "audio/langues/so.mp3", voice: "homme", credit: "Google and FLEURS dataset contributors", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "tr": { sample: "audio/langues/tr.mp3", voice: "homme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "fa": { sample: "audio/langues/fa.mp3", voice: "homme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "ro": { sample: "audio/langues/ro.mp3", voice: "femme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "ru": { sample: "audio/langues/ru.mp3", voice: "homme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "uk": { sample: "audio/langues/uk.mp3", voice: "homme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "es": { sample: "audio/langues/es.mp3", voice: "femme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "pt": { sample: "audio/langues/pt.mp3", voice: "homme", credit: "Google FLEURS ; Alexis Conneau et al., 2022", license: "CC BY 4.0", source: "https://huggingface.co/datasets/google/fleurs" },
  "ht": { sample: "audio/langues/ht.mp3", voice: "femme", credit: "Language Technologies Institute, Carnegie Mellon University, 2010. Corpus original du projet Diplomat ; licence intégrale jointe.", license: "CMU LTI permissive custom license, 2010", source: "https://huggingface.co/datasets/Frostie08/cmu_haitian_creole_speech" }
};


/* Voix de l'appareil pour une langue de la liste, sans substitution. */
function voiceFor(code) {
  const L = LANG_BY[code]; if (!L || !L.tts.length) return null;
  let vs = []; try { vs = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) {}
  const norm = v => (v.lang || "").replace("_", "-").toLowerCase();
  const nameIs = (v, re) => re.test(v.name || "");
  for (const pat of L.tts) {
    const p = pat.toLowerCase();
    const hit = vs.find(v => {
      const n = norm(v);
      if (!(n === p || n.startsWith(p + "-") || (p.length === 2 && n.slice(0, 2) === p && (n.length === 2 || n[2] === "-")))) return false;
      if (code === "cmn" && (/-(hk|mo)$/.test(n) || nameIs(v, /cantonese|粤|粵|yue/i))) return false;
      if (code === "fa" && /-af$/.test(n)) return false;
      if (code === "prs" && !/-af$/.test(n) && n !== "prs") return false;
      return true;
    });
    if (hit) return hit;
  }
  return null;
}
/* Langue des textes affichés (fr, en, zh, ar) pour la langue choisie. */
function textLang(code) { const L = LANG_BY[code]; return L ? L.text : "fr"; }

function recFor(code, key) { const r = RECORDINGS[code]; return r && r.keys ? r.keys[key] || null : null; }
