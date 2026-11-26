/* ===== Textes courts de la refonte (fr, en, zh = chinois écrit standard, ar) =====
   Règle : des légendes de quelques mots, une explication audio par action importante.
   Une langue sans texte relu affiche le français et le signale (badge FR). */
Object.assign(UI, {
  docsDoor: { fr: "Mes documents", en: "My documents", zh: "我的文件", ar: "مستنداتي" },
  togetherDoor: { fr: "Ensemble", en: "Together", zh: "交流", ar: "معًا" },
  helpDocsDoor: { fr: "Mes documents. Photographiez ou ouvrez un courrier, écoutez-le et comprenez quoi faire.", en: "My documents. Photograph or open a letter, listen to it and understand what to do.", zh: "我的文件。拍下或打开一封信，收听它，弄懂该怎么做。", ar: "مستنداتي. صوّر رسالة أو افتحها، واستمع إليها، وافهم ما عليك فعله." },
  helpTogetherDoor: { fr: "Ensemble. Apprenez des mots, posez des questions et rencontrez d’autres personnes.", en: "Together. Learn words, ask questions and meet other people.", zh: "一起。学习词语、提问，认识其他人。", ar: "معًا. تعلّم كلمات، واطرح أسئلة، وتعرّف على أشخاص آخرين." },
  scanShort: { fr: "Scanner", en: "Scan", zh: "拍照", ar: "تصوير" },
  importShort: { fr: "Importer", en: "Import", zh: "导入", ar: "إضافة ملف" },
  helpScan: { fr: "Scanner. Prenez votre courrier en photo, posé à plat, avec de la lumière.", en: "Scan. Take a photo of your letter, lying flat, in good light.", zh: "拍照。把信放平，在光线好的地方拍照。", ar: "تصوير. صوّر رسالتك وهي مسطّحة وفي إضاءة جيدة." },
  helpImport: { fr: "Importer. Choisissez une photo ou un PDF déjà dans votre téléphone.", en: "Import. Choose a photo or a PDF already on your phone.", zh: "导入。选择手机里已有的照片或PDF。", ar: "استيراد. اختر صورة أو ملف PDF موجودًا في هاتفك." },
  savedShort: { fr: "Enregistrés", en: "Saved", zh: "已保存", ar: "المحفوظة" },
  examplesShort: { fr: "Exemples", en: "Examples", zh: "示例", ar: "أمثلة" },
  helpExamples: { fr: "Exemples. Des courriers inventés pour essayer. Ce ne sont pas vos courriers.", en: "Examples. Made-up letters to try things out. They are not your letters.", zh: "示例。用来试用的虚构信件，不是您的信件。", ar: "أمثلة. رسائل مختلَقة للتجربة. ليست رسائلك." },
  exampleBadge: { fr: "Exemple", en: "Example", zh: "示例", ar: "مثال" },
  yourDoc: { fr: "Votre document", en: "Your document", zh: "您的文件", ar: "مستندك" },
  listenShort: { fr: "Écouter", en: "Listen", zh: "收听", ar: "استمع" },
  listenFrBadge: { fr: "Lecture en français", en: "Read in French", zh: "用法语朗读", ar: "قراءة بالفرنسية" },
  whatToDo: { fr: "Quoi faire", en: "What to do", zh: "怎么做", ar: "ماذا أفعل" },
  theLetter: { fr: "Le courrier", en: "The letter", zh: "信件", ar: "الرسالة" },
  askShort: { fr: "Poser une question", en: "Ask a question", zh: "提问", ar: "اطرح سؤالًا" },
  qPurpose: { fr: "À quoi sert ce document ?", en: "What is this document for?", zh: "这份文件是做什么的？", ar: "ما الغرض من هذه الوثيقة؟" },
  qAsked: { fr: "Que me demande-t-on ?", en: "What am I asked to do?", zh: "要我做什么？", ar: "ما المطلوب مني؟" },
  qProvide: { fr: "Que dois-je remplir ou fournir ?", en: "What must I fill in or provide?", zh: "我要填写或提供什么？", ar: "ماذا يجب أن أملأ أو أقدّم؟" },
  qBefore: { fr: "Avant quelle date ?", en: "By what date?", zh: "在哪天之前？", ar: "قبل أي تاريخ؟" },
  dateLetter: { fr: "Date du courrier", en: "Date of the letter", zh: "信件日期", ar: "تاريخ الرسالة" },
  toVerify: { fr: "Date à vérifier", en: "Date to check", zh: "日期待核实", ar: "تاريخ يجب التحقق منه" },
  noDateKnown: { fr: "Aucune date limite n’est connue.", en: "No deadline is known.", zh: "不知道截止日期。", ar: "لا يوجد موعد نهائي معروف." },
  details: { fr: "Détails", en: "Details", zh: "详情", ar: "التفاصيل" },
  helpNow: { fr: "Aide maintenant", en: "Help now", zh: "马上求助", ar: "مساعدة الآن" },
  whoToCall: { fr: "Qui appeler", en: "Who to call", zh: "打给谁", ar: "بمن أتصل" },
  micListening: { fr: "J’écoute… Touchez pour arrêter.", en: "Listening… Tap to stop.", zh: "正在听……点击停止。", ar: "أستمع… المس للإيقاف." },
  micStarting: { fr: "Ouverture du micro…", en: "Opening the microphone…", zh: "正在打开麦克风……", ar: "جارٍ فتح الميكروفون…" },
  micBlocked: { fr: "Le micro est bloqué. Vous pouvez l’autoriser, ou écrire votre question.", en: "The microphone is blocked. You can allow it, or type your question.", zh: "麦克风被禁用。您可以允许使用，或输入问题。", ar: "الميكروفون محظور. يمكنك السماح به أو كتابة سؤالك." },
  micUnavailable: { fr: "Le micro ne fonctionne pas dans votre langue ici. Écrivez votre question.", en: "The microphone does not work in your language here. Type your question.", zh: "这里的麦克风不支持您的语言。请输入问题。", ar: "الميكروفون لا يعمل بلغتك هنا. اكتب سؤالك." },
  micError: { fr: "Le micro s’est arrêté. Réessayez ou écrivez.", en: "The microphone stopped. Try again or type.", zh: "麦克风停止了。请重试或输入文字。", ar: "توقف الميكروفون. حاول مجددًا أو اكتب." },
  askPlaceholder: { fr: "Votre question…", en: "Your question…", zh: "您的问题……", ar: "سؤالك…" },
  send: { fr: "Envoyer", en: "Send", zh: "发送", ar: "إرسال" },
  notUnderstood: { fr: "Je n’ai pas compris", en: "I didn’t understand", zh: "我没听懂", ar: "لم أفهم" },
  aiConsent: { fr: "Pour répondre, le texte de ce courrier et votre question sont envoyés à Claude, un assistant d’intelligence artificielle (Anthropic). Rien d’autre n’est envoyé. D’accord ?", en: "To answer, the text of this letter and your question are sent to Claude, an AI assistant (Anthropic). Nothing else is sent. OK?", zh: "为了回答，这封信的文字和您的问题会发送给人工智能助手 Claude（Anthropic）。不会发送其他内容。同意吗？", ar: "للإجابة، يُرسَل نص هذه الرسالة وسؤالك إلى Claude، وهو مساعد ذكاء اصطناعي (Anthropic). لا يُرسَل أي شيء آخر. موافق؟" },
  agree: { fr: "D’accord", en: "OK", zh: "同意", ar: "موافق" },
  aiUnavailable: { fr: "L’assistant marche seulement dans l’application Claude, connecté à un compte. Ouvrez ce lien dans Claude (site claude.ai ou application) et connectez-vous.", en: "The assistant only works inside the Claude app, signed in. Open this link in Claude (claude.ai or the app) and sign in.", zh: "助手只能在已登录的 Claude 应用中使用。请在 Claude（claude.ai 网站或应用）中打开此链接并登录。", ar: "يعمل المساعد فقط داخل تطبيق Claude مع تسجيل الدخول. افتح هذا الرابط في Claude (موقع claude.ai أو التطبيق) وسجّل الدخول." },
  aiNotGranted: { fr: "Vous avez refusé l’accès à l’assistant. Rechargez la page pour pouvoir l’autoriser.", en: "Access to the assistant was refused. Reload the page to allow it.", zh: "您拒绝了助手的访问。请重新加载页面以允许。", ar: "تم رفض الوصول إلى المساعد. أعد تحميل الصفحة للسماح به." },
  aiDisabled: { fr: "L’assistant n’est pas activé pour ce compte Claude.", en: "The assistant is not enabled for this Claude account.", zh: "此 Claude 账户未启用助手。", ar: "المساعد غير مفعّل لحساب Claude هذا." },
  aiSession: { fr: "La connexion à Claude a expiré. Reconnectez-vous puis réessayez.", en: "Your Claude session has expired. Sign in again, then retry.", zh: "Claude 登录已过期。请重新登录后再试。", ar: "انتهت جلسة Claude. سجّل الدخول مجددًا ثم أعد المحاولة." },
  aiRate: { fr: "Limite d’utilisation atteinte pour l’instant. Réessayez plus tard.", en: "Usage limit reached for now. Try again later.", zh: "暂时已达到使用上限。请稍后再试。", ar: "تم بلوغ حد الاستخدام حاليًا. أعد المحاولة لاحقًا." },
  aiFailed: { fr: "L’assistant n’a pas pu répondre. Réessayez.", en: "The assistant could not answer. Try again.", zh: "助手无法回答。请再试一次。", ar: "لم يتمكن المساعد من الإجابة. أعد المحاولة." },
  aiThinking: { fr: "L’assistant réfléchit…", en: "The assistant is thinking…", zh: "助手正在思考……", ar: "المساعد يفكّر…" },
  aiNote: { fr: "Réponse d’un assistant IA. Vérifiez auprès de l’organisme ou d’une permanence.", en: "Answer from an AI assistant. Check with the organisation or a help desk.", zh: "这是人工智能助手的回答。请向相关机构或咨询处核实。", ar: "إجابة من مساعد ذكاء اصطناعي. تحقّق لدى الجهة المعنية أو مكتب مساعدة." },
  fromLetter: { fr: "Dans le courrier", en: "In the letter", zh: "信中写的", ar: "في الرسالة" },
  general: { fr: "Explication générale", en: "General explanation", zh: "一般解释", ar: "شرح عام" },
  explainAi: { fr: "Demander l’explication", en: "Ask for the explanation", zh: "请求解释", ar: "اطلب الشرح" },
  speedLabel: { fr: "Vitesse", en: "Speed", zh: "语速", ar: "السرعة" },
  replay: { fr: "Réécouter", en: "Listen again", zh: "重听", ar: "أعد الاستماع" },
  learnDoor: { fr: "Apprendre", en: "Learn", zh: "学习", ar: "تعلّم" },
  commDoor: { fr: "Communauté", en: "Community", zh: "社区", ar: "المجتمع" },
  profileDoor: { fr: "Mon profil", en: "My profile", zh: "我的资料", ar: "ملفي" },
  helpLearn: { fr: "Apprendre. De petits jeux avec les mots de vos courriers.", en: "Learn. Short games with the words from your letters.", zh: "学习。用您信件里的词语做小游戏。", ar: "تعلّم. ألعاب قصيرة بكلمات من رسائلك." },
  helpComm: { fr: "Communauté. Posez des questions, répondez, rencontrez des personnes.", en: "Community. Ask questions, answer, meet people.", zh: "社区。提问、回答、认识朋友。", ar: "المجتمع. اطرح أسئلة، وأجب، وتعرّف على أشخاص." },
  helpProfile: { fr: "Mon profil. Ce que les autres voient, et votre espace privé.", en: "My profile. What others see, and your private space.", zh: "我的资料。别人能看到的内容，以及您的私人空间。", ar: "ملفي. ما يراه الآخرون، ومساحتك الخاصة." },
  welcomeBack: { fr: "Bon retour ! On reprend ici, à votre rythme.", en: "Welcome back! Let’s pick up here, at your pace.", zh: "欢迎回来！按您的节奏从这里继续。", ar: "أهلًا بعودتك! نكمل من هنا، على مهلك." },
  keepGoing: { fr: "Bravo, vous pratiquez régulièrement.", en: "Well done, you practise regularly.", zh: "很好，您一直在练习。", ar: "أحسنت، أنت تتدرّب بانتظام." },
  questions: { fr: "Questions", en: "Questions", zh: "问题", ar: "أسئلة" },
  people: { fr: "Personnes", en: "People", zh: "成员", ar: "أشخاص" },
  requests: { fr: "Demandes", en: "Requests", zh: "请求", ar: "طلبات" },
  addFriend: { fr: "Ajouter", en: "Add", zh: "加好友", ar: "إضافة" },
  accept: { fr: "Accepter", en: "Accept", zh: "接受", ar: "قبول" },
  refuse: { fr: "Refuser", en: "Decline", zh: "拒绝", ar: "رفض" },
  publish: { fr: "Publier", en: "Publish", zh: "发布", ar: "نشر" },
  answer: { fr: "Répondre", en: "Reply", zh: "回答", ar: "رد" },
  notOfficial: { fr: "Avis de membres, pas un conseil officiel.", en: "Members’ opinions, not official advice.", zh: "成员的看法，不是官方建议。", ar: "آراء أعضاء، وليست نصيحة رسمية." },
  publicView: { fr: "Ce que les autres voient", en: "What others see", zh: "别人能看到的", ar: "ما يراه الآخرون" },
  privateSpace: { fr: "Mon espace privé", en: "My private space", zh: "我的私人空间", ar: "مساحتي الخاصة" },
  saveDoc: { fr: "Enregistrer", en: "Save", zh: "保存", ar: "حفظ" },
  change: { fr: "Changer", en: "Change", zh: "更改", ar: "تغيير" },
  exportShort: { fr: "Exporter", en: "Export", zh: "导出", ar: "تصدير" }
});

/* Synthèse « quoi faire » et étapes illustrées des courriers d'exemple */
const LETTER_EXTRA = {
  caf: {
    purpose: { fr: "La CAF étudie votre droit à l’aide au logement (APL).", en: "The CAF is reviewing your right to housing aid (APL).", zh: "CAF正在审核您领取住房补助（APL）的权利。", ar: "تدرس CAF حقك في مساعدة السكن (APL)." },
    asked: { fr: "Envoyer 2 documents. Sans réponse, l’aide sera suspendue.", en: "Send 2 documents. Without a reply, the aid will be suspended.", zh: "提交2份文件。不回复的话，补助将被暂停。", ar: "أرسل وثيقتين. من دون رد، ستُعلَّق المساعدة." },
    steps: [
      { icon: "docs", fr: "Trouver l’avis d’imposition 2026", en: "Find the 2026 tax notice", zh: "找到2026年纳税通知书", ar: "ابحث عن إشعار الضريبة لعام 2026" },
      { icon: "sign", fr: "Faire signer l’attestation de loyer", en: "Get the rent certificate signed", zh: "请房东签租金证明", ar: "اطلب توقيع شهادة الإيجار" },
      { icon: "send", fr: "Envoyer les 2 documents", en: "Send the 2 documents", zh: "提交这2份文件", ar: "أرسل الوثيقتين" },
      { icon: "call", fr: "En retard ? Appeler la CAF", en: "Running late? Call the CAF", zh: "来不及？打电话给CAF", ar: "متأخر؟ اتصل بـCAF" }
    ]
  },
  ameli: {
    purpose: { fr: "L’Assurance Maladie étudie votre demande de Complémentaire santé solidaire.", en: "The Assurance Maladie is reviewing your application for supplementary health cover.", zh: "医保机构正在审核您的团结补充医疗保险申请。", ar: "يدرس التأمين الصحي طلبك للتأمين الصحي التكميلي التضامني." },
    asked: { fr: "Envoyer un justificatif de domicile récent, à votre nom.", en: "Send recent proof of address in your name.", zh: "寄一份写有您姓名的近期住址证明。", ar: "أرسل إثبات سكن حديثًا باسمك." },
    steps: [
      { icon: "bill", fr: "Trouver une facture récente à votre nom", en: "Find a recent bill in your name", zh: "找一份写有您姓名的近期账单", ar: "ابحث عن فاتورة حديثة باسمك" },
      { icon: "ask", fr: "Rien à votre nom ? Demander", en: "Nothing in your name? Ask", zh: "没有您名字的？去询问", ar: "لا شيء باسمك؟ اسأل" },
      { icon: "send", fr: "Envoyer le justificatif", en: "Send the proof", zh: "寄出证明", ar: "أرسل الإثبات" }
    ]
  },
  impots: {
    purpose: { fr: "Les impôts mettent à jour votre dossier : ils demandent votre situation familiale.", en: "The tax office is updating your file: it asks for your family situation.", zh: "税务局在更新您的档案，需要了解您的家庭状况。", ar: "تحدّث مصلحة الضرائب ملفك: تطلب وضعك العائلي." },
    asked: { fr: "Remplir le formulaire (3 cases) et le renvoyer avec les actes des enfants.", en: "Fill in the form (3 fields) and send it back with the children’s certificates.", zh: "填写表格（3栏），连同子女的证明文件一起寄回。", ar: "املأ الاستمارة (3 خانات) وأعدها مع وثائق الأطفال." },
    steps: [
      { icon: "tick", fr: "Cocher la situation familiale", en: "Tick the family situation", zh: "勾选家庭状况", ar: "ضع علامة على الوضع العائلي" },
      { icon: "write", fr: "Écrire le nombre d’enfants", en: "Write the number of children", zh: "填写子女人数", ar: "اكتب عدد الأطفال" },
      { icon: "sign", fr: "Dater et signer", en: "Date and sign", zh: "写日期并签名", ar: "أرّخ ووقّع" },
      { icon: "attach", fr: "Joindre les actes des enfants", en: "Attach the children’s certificates", zh: "附上子女的证明", ar: "أرفق وثائق الأطفال" },
      { icon: "send", fr: "Renvoyer le tout", en: "Send everything back", zh: "全部寄回", ar: "أعد كل شيء" }
    ]
  }
};

/* Communauté fictive : questions et membres (exemples clairement signalés) */
const PEOPLE_LANGS = { u1: ["ar", "fr"], u2: ["cmn", "wzh", "fr"], u3: ["fr", "en"], u4: ["kab", "fr"], u5: ["cmn", "fr"], u6: ["ar", "fr"], u7: ["en", "fr"], u8: ["prs", "ps", "fr"] };
const SEED_QUESTIONS = [
  { id: "q1", by: "u4", text: "C’est quoi exactement un justificatif de domicile ? Je suis hébergée chez ma sœur.", answers: [{ by: "u1", text: "Chez moi, on m’a demandé une attestation d’hébergement signée par la personne qui m’héberge, avec sa facture. Demandez à l’organisme ce qu’il accepte." }] },
  { id: "q2", by: "u2", text: "Où peut-on se faire aider pour remplir un formulaire de la CAF près de Saint-Denis ?", answers: [{ by: "u6", text: "Il y a des permanences dans les espaces France Services et les centres sociaux. Appelez avant pour connaître les horaires." }] },
  { id: "q3", by: "u8", text: "Quelqu’un connaît des cours de français le soir à Pantin ?", answers: [] }
];
const SEED_REQUESTS = ["u5", "u7"];
const MONEY_WORDS = /\b(argent|virement|western\s*union|moneygram|iban|rib|carte\s*bancaire|code\s*(secret|de\s*confirmation)?|paypal|bitcoin|crypto|mandat\s*cash|payer|euros?\b)/i;
const PERSONAL_WORDS = /\b(n[°o]\s*(allocataire|dossier|fiscal|s[ée]curit[ée]\s*sociale)|num[ée]ro\s*(allocataire|fiscal|de\s*dossier|de\s*s[ée]curit[ée]\s*sociale)|\d{1,3}\s*(rue|avenue|boulevard|bd|all[ée]e|impasse)\b)/i;
