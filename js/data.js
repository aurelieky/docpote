/* ===== Contenus du pilote : courriers fictifs, termes, textes d'interface ===== */

const LANGS = {
  fr: { native: "Français", locale: "fr-FR", dir: "ltr" },
  en: { native: "English", locale: "en-GB", dir: "ltr" },
  zh: { native: "中文（普通话）", locale: "zh-CN", dir: "ltr" },
  ar: { native: "العربية", locale: "ar-u-ca-gregory-nu-latn", dir: "rtl" }
};
const SUPPORT_LANGS = ["en", "zh", "ar"];

/* Textes d'interface : fr + langues d'accompagnement */
const UI = {
  tagline: { fr: "Comprendre un courrier et savoir quoi faire", en: "Understand a letter and know what to do", zh: "看懂信件，知道该怎么做", ar: "افهم رسالتك واعرف ما عليك فعله" },
  chooseLang: { fr: "Choisissez votre langue d’accompagnement", en: "Choose your support language", zh: "选择您的辅助语言", ar: "اختر لغة المساعدة" },
  frOnly: { fr: "Continuer en français seulement", en: "French only", zh: "仅用法语", ar: "الفرنسية فقط" },
  scan: { fr: "Scanner un document", en: "Scan a document", zh: "扫描文件", ar: "تصوير مستند" },
  import: { fr: "Importer une photo ou un PDF", en: "Import a photo or PDF", zh: "导入照片或 PDF", ar: "استيراد صورة أو ملف PDF" },
  demo: { fr: "Essayer avec un courrier fictif", en: "Try with a sample letter", zh: "用示例信件试一试", ar: "جرّب برسالة تجريبية" },
  noAccount: { fr: "Sans compte. Votre document reste sur ce téléphone.", en: "No account needed. Your document stays on this phone.", zh: "无需账户。您的文件只保存在这部手机上。", ar: "لا حاجة إلى حساب. يبقى مستندك على هذا الهاتف." },
  todo: { fr: "Ce que vous devez faire", en: "What you need to do", zh: "您需要做什么", ar: "ما عليك فعله" },
  listenLetter: { fr: "Écouter le courrier dans ma langue", en: "Listen to the letter in my language", zh: "用我的语言收听信件", ar: "استمع إلى الرسالة بلغتي" },
  listenSteps: { fr: "Écouter les étapes", en: "Listen to the steps", zh: "收听步骤", ar: "استمع إلى الخطوات" },
  pause: { fr: "Pause", en: "Pause", zh: "暂停", ar: "إيقاف مؤقت" },
  resume: { fr: "Reprendre", en: "Resume", zh: "继续", ar: "استئناف" },
  stop: { fr: "Arrêter", en: "Stop", zh: "停止", ar: "إيقاف" },
  help: { fr: "Obtenir de l’aide maintenant", en: "Get help now", zh: "立即获取帮助", ar: "احصل على مساعدة الآن" },
  contacts: { fr: "Qui contacter ?", en: "Who to contact?", zh: "联系谁？", ar: "بمن أتصل؟" },
  save: { fr: "Enregistrer ce courrier", en: "Save this letter", zh: "保存这封信", ar: "احفظ هذه الرسالة" },
  saved: { fr: "Enregistré dans Documents", en: "Saved in Documents", zh: "已保存到“文件”", ar: "تم الحفظ في المستندات" },
  addRev: { fr: "Ajouter à mes révisions", en: "Add to my review list", zh: "加入我的复习", ar: "أضف إلى مراجعاتي" },
  inRev: { fr: "Dans mes révisions", en: "In my review list", zh: "已加入复习", ar: "موجود في مراجعاتي" },
  close: { fr: "Fermer", en: "Close", zh: "关闭", ar: "إغلاق" },
  back: { fr: "Retour", en: "Back", zh: "返回", ar: "رجوع" },
  original: { fr: "Le courrier en français", en: "The letter in French", zh: "法语原信", ar: "الرسالة بالفرنسية" },
  translation: { fr: "Traduction", en: "Translation", zh: "译文", ar: "الترجمة" },
  showOriginal: { fr: "Afficher le français", en: "Show the French", zh: "显示法语", ar: "اعرض الفرنسية" },
  tapHint: { fr: "Touchez une expression soulignée pour voir sa fiche. Vous pouvez aussi sélectionner plusieurs mots.", en: "Tap an underlined expression to see its card. You can also select several words.", zh: "点击带下划线的词语查看解释，也可以选中几个词。", ar: "المس عبارة مسطّرة لرؤية بطاقتها. يمكنك أيضًا تحديد عدة كلمات." },
  steps: { fr: "Les étapes", en: "The steps", zh: "步骤", ar: "الخطوات" },
  seePassage: { fr: "Voir le passage du courrier", en: "See the passage in the letter", zh: "查看信中的原文", ar: "اعرض المقطع في الرسالة" },
  formFields: { fr: "Champs du formulaire à remplir", en: "Form fields to fill in", zh: "需要填写的表格栏目", ar: "خانات الاستمارة التي يجب ملؤها" },
  piecesAsked: { fr: "Pièces demandées", en: "Documents requested", zh: "要求提供的材料", ar: "الوثائق المطلوبة" },
  deadline: { fr: "Date limite", en: "Deadline", zh: "截止日期", ar: "الموعد النهائي" },
  near: { fr: "Échéance proche", en: "Deadline soon", zh: "截止日期临近", ar: "الموعد النهائي قريب" },
  passed: { fr: "Échéance dépassée", en: "Deadline passed", zh: "已过截止日期", ar: "انتهى الموعد النهائي" },
  upcoming: { fr: "Échéance à venir", en: "Upcoming deadline", zh: "截止日期未到", ar: "موعد نهائي قادم" },
  isToday: { fr: "C’est aujourd’hui", en: "It is today", zh: "就是今天", ar: "إنه اليوم" },
  noDeadline: { fr: "Ce courrier n’indique pas de date limite.", en: "This letter does not give a deadline.", zh: "这封信没有写截止日期。", ar: "لا تذكر هذه الرسالة موعدًا نهائيًا." },
  noDeadlineAdvice: { fr: "Envoyez le document dès que possible : votre demande attend ce document.", en: "Send the document as soon as you can: your application is waiting for it.", zh: "请尽快寄出文件：您的申请正在等待这份文件。", ar: "أرسل الوثيقة في أقرب وقت: طلبك ينتظر هذه الوثيقة." },
  needReception: { fr: "Le délai de 30 jours commence à la réception du courrier. Quand l’avez-vous reçu ?", en: "The 30-day limit starts when you received the letter. When did you receive it?", zh: "30天期限从收到信件之日起算。您是哪天收到的？", ar: "تبدأ مهلة 30 يومًا من تاريخ استلام الرسالة. متى استلمتها؟" },
  receivedOn: { fr: "Date de réception", en: "Date received", zh: "收信日期", ar: "تاريخ الاستلام" },
  receivedToday: { fr: "Reçu aujourd’hui", en: "Received today", zh: "今天收到", ar: "استلمتها اليوم" },
  dontKnow: { fr: "Je ne sais pas", en: "I don’t know", zh: "我不知道", ar: "لا أعرف" },
  validate: { fr: "Calculer la date limite", en: "Work out the deadline", zh: "计算截止日期", ar: "احسب الموعد النهائي" },
  changeReception: { fr: "Changer la date de réception", en: "Change the date received", zh: "修改收信日期", ar: "غيّر تاريخ الاستلام" },
  unknownReception: { fr: "Sans la date de réception, la date limite ne peut pas être calculée. Regardez le cachet de la poste sur l’enveloppe, ou demandez de l’aide.", en: "Without the date you received it, the deadline cannot be worked out. Look at the postmark on the envelope, or ask for help.", zh: "没有收信日期，就无法计算截止日期。请查看信封上的邮戳，或寻求帮助。", ar: "من دون تاريخ الاستلام لا يمكن حساب الموعد النهائي. انظر إلى ختم البريد على الظرف، أو اطلب المساعدة." },
  receptionBefore: { fr: "Cette date est avant la date du courrier. Vérifiez la date de réception.", en: "This date is before the date of the letter. Check the date you received it.", zh: "这个日期早于信件日期，请核对收信日期。", ar: "هذا التاريخ قبل تاريخ الرسالة. تحقّق من تاريخ الاستلام." },
  receptionFuture: { fr: "Cette date est dans le futur. Vérifiez la date de réception.", en: "This date is in the future. Check the date you received it.", zh: "这个日期在未来，请核对收信日期。", ar: "هذا التاريخ في المستقبل. تحقّق من تاريخ الاستلام." },
  computedFrom: { fr: "Calculé à partir de la date de réception que vous avez indiquée.", en: "Worked out from the date received that you entered.", zh: "根据您填写的收信日期计算。", ar: "محسوب انطلاقًا من تاريخ الاستلام الذي أدخلته." },
  threeMonthsTitle: { fr: "« De moins de trois mois » n’est pas une date limite", en: "“Less than three months old” is not a deadline", zh: "“三个月以内”不是截止日期", ar: "«لا يزيد عمره عن ثلاثة أشهر» ليس موعدًا نهائيًا" },
  helpIntro: { fr: "Voici qui peut vous aider pour ce courrier. Rien n’est envoyé automatiquement : c’est vous qui décidez d’appeler.", en: "Here is who can help with this letter. Nothing is sent automatically: you decide whether to call.", zh: "以下机构可以帮助您处理这封信。不会自动发送任何内容：是否打电话由您决定。", ar: "هذه هي الجهات التي يمكنها مساعدتك في هذه الرسالة. لا يُرسَل أي شيء تلقائيًا: أنت من يقرّر الاتصال." },
  why: { fr: "Pourquoi ce contact", en: "Why this contact", zh: "为什么推荐这个联系方式", ar: "لماذا هذه الجهة" },
  noDocSent: { fr: "Aucun document n’est transmis à ce contact.", en: "No document is passed on to this contact.", zh: "不会向该联系人发送任何文件。", ar: "لا تُرسَل أي وثيقة إلى هذه الجهة." },
  urgentWhyNear: { fr: "La date limite est très proche et l’enjeu est important.", en: "The deadline is very close and a lot is at stake.", zh: "截止日期非常近，而且事关重大。", ar: "الموعد النهائي قريب جدًا والأمر مهم." },
  urgentWhyPassed: { fr: "La date limite est dépassée. Appelez vite pour savoir ce qui est encore possible.", en: "The deadline has passed. Call soon to find out what is still possible.", zh: "截止日期已过。请尽快打电话了解还能怎么办。", ar: "انتهى الموعد النهائي. اتصل بسرعة لتعرف ما الذي لا يزال ممكنًا." },
  urgentWhyUnknown: { fr: "La date limite est incertaine et l’enjeu est important.", en: "The deadline is uncertain and a lot is at stake.", zh: "截止日期不确定，而且事关重大。", ar: "الموعد النهائي غير مؤكَّد والأمر مهم." },
  importTitle: { fr: "Votre fichier", en: "Your file", zh: "您的文件", ar: "ملفك" },
  importLimit: { fr: "Ce pilote ne sait pas encore lire un vrai courrier : la lecture automatique (OCR) et la traduction ne sont pas branchées. Aucune analyse n’est affichée pour ce fichier. Il reste sur ce téléphone et n’est envoyé nulle part.", en: "This pilot cannot read a real letter yet: automatic reading (OCR) and translation are not connected. No analysis is shown for this file. It stays on this phone and is not sent anywhere.", zh: "本试用版还不能读取真实信件：自动识别（OCR）和翻译功能尚未接入。因此不会显示这个文件的分析。文件只保存在这部手机上，不会被发送。", ar: "لا يستطيع هذا الإصدار التجريبي قراءة رسالة حقيقية بعد: القراءة الآلية (OCR) والترجمة غير موصولتين. لذلك لا يُعرض أي تحليل لهذا الملف. يبقى على هذا الهاتف ولا يُرسَل إلى أي مكان." },
  importTry: { fr: "Pour voir le parcours complet, essayez un courrier fictif.", en: "To see the full journey, try a sample letter.", zh: "想体验完整流程，请试试示例信件。", ar: "لرؤية المسار كاملًا، جرّب رسالة تجريبية." },
  pickDemo: { fr: "Choisissez un courrier fictif", en: "Choose a sample letter", zh: "选择一封示例信件", ar: "اختر رسالة تجريبية" },
  fictive: { fr: "Courrier fictif", en: "Sample letter", zh: "示例信件", ar: "رسالة تجريبية" },
  noVoice: { fr: "Aucune voix n’est disponible pour cette langue sur cet appareil. Le texte reste affiché.", en: "No voice is available for this language on this device. The text stays on screen.", zh: "此设备上没有这种语言的语音。文字仍会显示。", ar: "لا يتوفر صوت لهذه اللغة على هذا الجهاز. يبقى النص معروضًا." },
  noSpeech: { fr: "La lecture audio n’est pas disponible dans ce navigateur. Le texte reste affiché.", en: "Audio reading is not available in this browser. The text stays on screen.", zh: "此浏览器不支持语音朗读。文字仍会显示。", ar: "القراءة الصوتية غير متاحة في هذا المتصفح. يبقى النص معروضًا." },
  reading: { fr: "Lecture en cours", en: "Now reading", zh: "正在朗读", ar: "جارٍ القراءة" },
  paused: { fr: "En pause", en: "Paused", zh: "已暂停", ar: "متوقف مؤقتًا" },
  definition: { fr: "Définition", en: "Definition", zh: "解释", ar: "التعريف" },
  example: { fr: "Exemple", en: "Example", zh: "例句", ar: "مثال" },
  noCard: { fr: "Ce mot n’a pas encore de fiche dans le pilote.", en: "This word does not have a card in the pilot yet.", zh: "试用版中还没有这个词的解释。", ar: "لا توجد بطاقة لهذه الكلمة في الإصدار التجريبي بعد." },
  tabScan: { fr: "Scanner", en: "Scan", zh: "扫描", ar: "تصوير" },
  tabDocs: { fr: "Documents", en: "Documents", zh: "文件", ar: "المستندات" },
  tabLearn: { fr: "Apprendre", en: "Learn", zh: "学习", ar: "تعلّم" },
  tabComm: { fr: "Communauté", en: "Community", zh: "社区", ar: "المجتمع" },
  tabProfile: { fr: "Profil", en: "Profile", zh: "个人资料", ar: "الملف الشخصي" },
  docsEmpty: { fr: "Aucun courrier enregistré. Après l’analyse, touchez « Enregistrer ce courrier ».", en: "No saved letters. After the analysis, tap “Save this letter”.", zh: "还没有保存的信件。分析后点击“保存这封信”。", ar: "لا توجد رسائل محفوظة. بعد التحليل، المس «احفظ هذه الرسالة»." },
  privateNote: { fr: "Vos documents, échéances et révisions restent privés, même si votre profil est visible.", en: "Your documents, deadlines and reviews stay private, even if your profile is visible.", zh: "即使您的个人资料公开，您的文件、截止日期和复习内容也始终保密。", ar: "تبقى مستنداتك ومواعيدك ومراجعاتك خاصة، حتى لو كان ملفك الشخصي ظاهرًا." },
  open: { fr: "Ouvrir", en: "Open", zh: "打开", ar: "فتح" },
  del: { fr: "Supprimer", en: "Delete", zh: "删除", ar: "حذف" },
  confirmDel: { fr: "Supprimer ce document ? C’est définitif.", en: "Delete this document? This cannot be undone.", zh: "删除这份文件？删除后无法恢复。", ar: "حذف هذا المستند؟ لا يمكن التراجع عن ذلك." },
  yesDel: { fr: "Oui, supprimer", en: "Yes, delete", zh: "确认删除", ar: "نعم، احذف" },
  cancel: { fr: "Annuler", en: "Cancel", zh: "取消", ar: "إلغاء" },
  learnOptional: { fr: "Réviser est facultatif. Aucun exercice ne bloque l’accès à vos courriers ou à l’aide.", en: "Reviewing is optional. No exercise blocks access to your letters or to help.", zh: "复习是自愿的。任何练习都不会妨碍您查看信件或获取帮助。", ar: "المراجعة اختيارية. لا يمنعك أي تمرين من الوصول إلى رسائلك أو إلى المساعدة." },
  learnEmpty: { fr: "Ajoutez des expressions depuis un courrier : touchez une expression soulignée, puis « Ajouter à mes révisions ».", en: "Add expressions from a letter: tap an underlined expression, then “Add to my review list”.", zh: "从信件中添加词语：点击带下划线的词语，再点“加入我的复习”。", ar: "أضف عبارات من رسالة: المس عبارة مسطّرة، ثم «أضف إلى مراجعاتي»." },
  startQuiz: { fr: "Commencer une révision", en: "Start a review", zh: "开始复习", ar: "ابدأ المراجعة" },
  qMeaning: { fr: "Que veut dire cette expression ?", en: "What does this expression mean?", zh: "这个词语是什么意思？", ar: "ماذا تعني هذه العبارة؟" },
  qCloze: { fr: "Quelle expression complète la phrase ?", en: "Which expression completes the sentence?", zh: "哪个词语可以填入句子？", ar: "أي عبارة تكمل الجملة؟" },
  wrong: { fr: "Pas tout à fait.", en: "Not quite.", zh: "不太对。", ar: "ليس تمامًا." },
  whyLabel: { fr: "Pourquoi", en: "Why", zh: "原因", ar: "السبب" },
  retry: { fr: "Réessayer", en: "Try again", zh: "再试一次", ar: "حاول مرة أخرى" },
  next: { fr: "Question suivante", en: "Next question", zh: "下一题", ar: "السؤال التالي" },
  finish: { fr: "Terminer", en: "Finish", zh: "完成", ar: "إنهاء" },
  sessionDone: { fr: "Révision terminée. Bravo !", en: "Review finished. Well done!", zh: "复习完成，太棒了！", ar: "انتهت المراجعة. أحسنت!" },
  daysStreak: { fr: "jours de pratique d’affilée", en: "days of practice in a row", zh: "连续练习天数", ar: "أيام تدريب متتالية" },
  myExpressions: { fr: "Mes expressions", en: "My expressions", zh: "我的词语", ar: "عباراتي" },
  hello: { fr: "Saluer", en: "Say hello", zh: "打招呼", ar: "ألقِ التحية" },
  block: { fr: "Bloquer", en: "Block", zh: "屏蔽", ar: "حظر" },
  report: { fr: "Signaler", en: "Report", zh: "举报", ar: "إبلاغ" },
  safety: { fr: "Ne partagez ni argent, ni codes, ni documents administratifs avec un autre membre.", en: "Never share money, codes or official documents with another member.", zh: "不要与其他成员分享钱、验证码或行政文件。", ar: "لا تشارك المال أو الرموز أو الوثائق الإدارية مع أي عضو آخر." },
  makeVisible: { fr: "Rendre visible", en: "Make visible", zh: "设为公开", ar: "اجعله ظاهرًا" },
  dataErase: { fr: "Effacer mes données sur ce téléphone", en: "Erase my data on this phone", zh: "清除这部手机上的我的数据", ar: "امسح بياناتي على هذا الهاتف" }
};

const CORRECT_MSGS = {
  fr: ["Bravo, c’est juste !", "Exactement !", "Très bien, vous progressez.", "Parfait !"],
  en: ["Well done, that’s right!", "Exactly!", "Great, you’re making progress.", "Perfect!"],
  zh: ["太棒了，答对了！", "完全正确！", "很好，您在进步。", "非常好！"],
  ar: ["أحسنت، إجابة صحيحة!", "بالضبط!", "رائع، أنت تتقدّم.", "ممتاز!"]
};

const DAYS_LEFT = {
  fr: n => n === 1 ? "Il reste 1 jour" : `Il reste ${n} jours`,
  en: n => n === 1 ? "1 day left" : `${n} days left`,
  zh: n => `还剩 ${n} 天`,
  ar: n => `الأيام المتبقية: ${n}`
};
const DAYS_PASSED = {
  fr: n => n === 1 ? "Dépassée depuis 1 jour" : `Dépassée depuis ${n} jours`,
  en: n => n === 1 ? "Passed 1 day ago" : `Passed ${n} days ago`,
  zh: n => `已过期 ${n} 天`,
  ar: n => `الأيام منذ انتهاء الموعد: ${n}`
};
const THIRTY_AFTER = { fr: "dans les 30 jours après la réception", en: "within 30 days of receiving it", zh: "收到后30天内", ar: "خلال 30 يومًا من الاستلام" };
const THREE_MONTHS_NOTE = {
  fr: d => `Le justificatif doit être daté après le ${d}. C’est l’âge du document, pas un délai pour répondre.`,
  en: d => `The proof must be dated after ${d}. This is the age of the document, not a time limit to reply.`,
  zh: d => `证明文件的日期必须在${d}之后。这是指文件的日期，而不是回复期限。`,
  ar: d => `يجب أن يكون تاريخ الإثبات بعد ${d}. هذا عمر الوثيقة، وليس مهلة للرد.`
};

/* Répertoire de contacts vérifiés (pages officielles consultées le 13/11/2026) */
const CONTACTS = {
  caf: {
    name: "CAF (Caisse d’allocations familiales)",
    phone: "3230", phoneNote: "Service gratuit + prix d’appel",
    url: "https://www.caf.fr", urlLabel: "caf.fr : Ma Caf, Contacter ma Caf",
    source: "https://caf.fr/sites/default/files/medias/331/doc%20PARTENAIRESmodalitesdecontactusagers052026.pdf",
    why: { fr: "Ce courrier vient de la CAF. Elle seule peut vérifier votre dossier ou vous dire si un document peut arriver en retard.", en: "This letter comes from the CAF. Only the CAF can check your file or tell you whether a document can arrive late.", zh: "这封信来自CAF。只有CAF能核查您的档案，或告诉您文件能否晚交。", ar: "هذه الرسالة من CAF. هي وحدها تستطيع التحقق من ملفك أو إخبارك إن كان يمكن إرسال وثيقة متأخرة." }
  },
  impots: {
    name: "Service des impôts (Finances publiques)",
    phone: "0 809 401 401", phoneNote: "Service gratuit + coût de l’appel, du lundi au vendredi, 8 h 30 – 19 h",
    url: "https://www.impots.gouv.fr/contacts", urlLabel: "impots.gouv.fr : Contact et prise de rendez-vous",
    source: "https://www.impots.gouv.fr/contacts",
    why: { fr: "Ce courrier vient du service des impôts. Il peut répondre à vos questions sur le formulaire et sur le délai.", en: "This letter comes from the tax office. It can answer your questions about the form and the time limit.", zh: "这封信来自税务局。税务局可以回答您关于表格和期限的问题。", ar: "هذه الرسالة من مصلحة الضرائب. يمكنها الإجابة عن أسئلتك حول الاستمارة والمهلة." }
  },
  ameli: {
    name: "Assurance Maladie",
    phone: "36 46", phoneNote: "Service gratuit + prix de l’appel",
    url: "https://www.ameli.fr", urlLabel: "ameli.fr",
    source: "https://forum-assures.ameli.fr/questions/1450847",
    why: { fr: "Ce courrier vient de l’Assurance Maladie. Elle peut vous dire quel justificatif elle accepte.", en: "This letter comes from the Assurance Maladie. It can tell you which proof it accepts.", zh: "这封信来自医保机构（Assurance Maladie）。它可以告诉您接受哪种证明。", ar: "هذه الرسالة من التأمين الصحي (Assurance Maladie). يمكنه أن يخبرك بالإثبات الذي يقبله." }
  },
  traducteurs: {
    name: "Annuaire officiel des traducteurs agréés",
    phone: null, phoneNote: null,
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R45936", urlLabel: "service-public.gouv.fr : Trouver un traducteur agréé",
    source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12956",
    why: { fr: "Le courrier demande une traduction par un traducteur agréé. Cet annuaire officiel donne la liste des traducteurs agréés près de chez vous. Leur service est payant.", en: "The letter asks for a translation by an approved translator. This official directory lists approved translators near you. Their service is paid.", zh: "信中要求由认证翻译员翻译。这个官方名录列出您附近的认证翻译员。他们的服务需要付费。", ar: "تطلب الرسالة ترجمة من مترجم معتمد. يضم هذا الدليل الرسمي المترجمين المعتمدين القريبين منك. خدماتهم مدفوعة." }
  }
};

/* Termes (fiches façon Kindle) */
const TERMS = {
  pj: { fr: "pièces justificatives",
    tr: { en: "supporting documents", zh: "证明文件", ar: "وثائق داعمة" },
    def: { fr: "Des documents qui prouvent ce que vous déclarez.", en: "Documents that prove what you say about your situation.", zh: "用来证明您所申报情况的文件。", ar: "وثائق تثبت ما تصرّح به عن وضعك." },
    ex: "La CAF demande deux pièces justificatives.", exTr: { en: "The CAF asks for two supporting documents.", zh: "CAF要求提供两份证明文件。", ar: "تطلب CAF وثيقتين داعمتين." },
    quiz: "Pour votre dossier, envoyez toutes les ___ demandées." },
  avis: { fr: "avis d’imposition",
    tr: { en: "tax notice", zh: "纳税通知书", ar: "إشعار الضريبة" },
    def: { fr: "Le document envoyé chaque année par les impôts. Il indique vos revenus et l’impôt à payer, même s’il est de zéro.", en: "The document the tax office sends every year. It shows your income and the tax to pay, even if it is zero.", zh: "税务局每年寄来的文件，写明您的收入和应缴税款，即使税款为零。", ar: "وثيقة ترسلها مصلحة الضرائب كل عام، تبيّن دخلك والضريبة المستحقة حتى لو كانت صفرًا." },
    ex: "Je télécharge mon avis d’imposition sur impots.gouv.fr.", exTr: { en: "I download my tax notice from impots.gouv.fr.", zh: "我在impots.gouv.fr上下载我的纳税通知书。", ar: "أُنزّل إشعار الضريبة من موقع impots.gouv.fr." },
    quiz: "Gardez bien votre ___ : beaucoup d’organismes le demandent." },
  attest: { fr: "attestation de loyer",
    tr: { en: "rent certificate", zh: "租金证明", ar: "شهادة إيجار" },
    def: { fr: "Un formulaire où le propriétaire confirme le montant de votre loyer.", en: "A form in which the landlord confirms how much rent you pay.", zh: "由房东确认您房租金额的表格。", ar: "استمارة يؤكد فيها المالك قيمة إيجارك." },
    ex: "Mon propriétaire a signé l’attestation de loyer.", exTr: { en: "My landlord signed the rent certificate.", zh: "我的房东签了租金证明。", ar: "وقّع المالك شهادة الإيجار." },
    quiz: "Votre propriétaire doit remplir et signer une ___." },
  bailleur: { fr: "bailleur",
    tr: { en: "landlord", zh: "房东（出租人）", ar: "المؤجِّر (صاحب السكن)" },
    def: { fr: "La personne ou l’organisme qui vous loue votre logement.", en: "The person or organisation that rents your home to you.", zh: "把住房租给您的人或机构。", ar: "الشخص أو الجهة التي تؤجّرك مسكنك." },
    ex: "Mon bailleur est un office HLM.", exTr: { en: "My landlord is a social housing office.", zh: "我的房东是一家社会住房机构。", ar: "المؤجِّر الذي أتعامل معه هيئة سكن اجتماعي." },
    quiz: "En cas de fuite d’eau, prévenez votre ___." },
  versement: { fr: "versement",
    tr: { en: "payment", zh: "发放（付款）", ar: "صرف المبلغ" },
    def: { fr: "Quand un organisme vous paie une somme d’argent.", en: "When an organisation pays you a sum of money.", zh: "机构向您支付一笔钱。", ar: "حين تدفع لك جهة ما مبلغًا من المال." },
    ex: "Le versement arrive le 5 de chaque mois.", exTr: { en: "The payment arrives on the 5th of each month.", zh: "每月5号发放。", ar: "يصل المبلغ في الخامس من كل شهر." },
    quiz: "Le ___ de l’aide se fait chaque mois sur votre compte." },
  suspendu: { fr: "suspendu",
    tr: { en: "suspended (stopped for a time)", zh: "暂停", ar: "معلَّق (متوقف مؤقتًا)" },
    def: { fr: "Arrêté pour un temps, jusqu’à ce que le problème soit réglé.", en: "Stopped for a while, until the problem is solved.", zh: "暂时停止，直到问题解决。", ar: "متوقف لفترة إلى أن تُحلّ المشكلة." },
    ex: "Le paiement a été suspendu, puis il a repris.", exTr: { en: "The payment was suspended, then it started again.", zh: "付款曾被暂停，后来恢复了。", ar: "عُلِّق الدفع ثم استُؤنف." },
    quiz: "Sans réponse, le paiement sera ___ jusqu’à l’arrivée des documents." },
  css: { fr: "Complémentaire santé solidaire",
    tr: { en: "free or low-cost supplementary health cover", zh: "团结补充医疗保险", ar: "التأمين الصحي التكميلي التضامني" },
    def: { fr: "Une aide qui paie la partie des frais de santé que la Sécurité sociale ne rembourse pas, pour les personnes aux revenus modestes.", en: "An aid that pays the part of health costs not covered by social security, for people on low incomes.", zh: "为低收入人群支付社会保险不报销部分医疗费用的补助。", ar: "مساعدة تدفع جزء نفقات العلاج الذي لا يعوّضه الضمان الاجتماعي، لذوي الدخل المحدود." },
    ex: "Avec la Complémentaire santé solidaire, je n’avance pas les frais chez le médecin.", exTr: { en: "With Complémentaire santé solidaire, I don’t pay upfront at the doctor’s.", zh: "有了团结补充医疗保险，我看医生不用先垫付费用。", ar: "مع هذا التأمين التكميلي، لا أدفع مسبقًا عند الطبيب." },
    quiz: "Elle a demandé la ___ pour être mieux remboursée." },
  jdd: { fr: "justificatif de domicile",
    tr: { en: "proof of address", zh: "住址证明", ar: "إثبات السكن" },
    def: { fr: "Un document qui montre où vous habitez, avec votre nom et votre adresse.", en: "A document that shows where you live, with your name and address.", zh: "写有您姓名和地址、证明您住在哪里的文件。", ar: "وثيقة تبيّن مكان سكنك، وعليها اسمك وعنوانك." },
    ex: "Une facture d’électricité peut servir de justificatif de domicile.", exTr: { en: "An electricity bill can be used as proof of address.", zh: "电费账单可以用作住址证明。", ar: "يمكن أن تُستخدم فاتورة الكهرباء إثباتًا للسكن." },
    quiz: "Pour ouvrir un compte en banque, il faut souvent un ___." },
  moins3: { fr: "de moins de trois mois",
    tr: { en: "less than three months old", zh: "三个月以内的", ar: "لا يزيد عمره عن ثلاثة أشهر" },
    def: { fr: "Le document doit être daté des trois derniers mois. C’est l’âge du document, pas un délai pour répondre.", en: "The document must be dated within the last three months. This is the document’s age, not a deadline to reply.", zh: "文件日期必须在最近三个月内。这是指文件的日期，不是回复的期限。", ar: "يجب أن يكون تاريخ الوثيقة خلال الأشهر الثلاثة الأخيرة. هذا عمر الوثيقة، وليس مهلة للرد." },
    ex: "Ma facture du mois dernier date de moins de trois mois.", exTr: { en: "My bill from last month is less than three months old.", zh: "我上个月的账单是三个月以内的。", ar: "فاتورتي من الشهر الماضي لا يزيد عمرها عن ثلاثة أشهر." },
    quiz: "Apportez une facture d’eau ___ ." },
  quittance: { fr: "quittance de loyer",
    tr: { en: "rent receipt", zh: "房租收据", ar: "إيصال الإيجار" },
    def: { fr: "Le reçu que le propriétaire donne quand le loyer est payé.", en: "The receipt the landlord gives when the rent is paid.", zh: "房租付清后房东开的收据。", ar: "الإيصال الذي يعطيه المالك عند دفع الإيجار." },
    ex: "Je demande ma quittance de loyer chaque mois.", exTr: { en: "I ask for my rent receipt every month.", zh: "我每个月都要房租收据。", ar: "أطلب إيصال الإيجار كل شهر." },
    quiz: "Votre propriétaire doit vous donner une ___ si vous la demandez." },
  facture: { fr: "facture",
    tr: { en: "bill", zh: "账单", ar: "فاتورة" },
    def: { fr: "Le document qui indique combien vous devez payer pour un service.", en: "The document that shows how much you must pay for a service.", zh: "写明您需为某项服务支付多少钱的单据。", ar: "وثيقة تبيّن المبلغ الذي يجب أن تدفعه مقابل خدمة." },
    ex: "La facture de gaz arrive tous les deux mois.", exTr: { en: "The gas bill comes every two months.", zh: "燃气账单每两个月来一次。", ar: "تصل فاتورة الغاز كل شهرين." },
    quiz: "J’ai reçu la ___ d’électricité de novembre." },
  sitfam: { fr: "situation familiale",
    tr: { en: "family situation (marital status)", zh: "家庭状况（婚姻状况）", ar: "الوضع العائلي" },
    def: { fr: "Si vous êtes célibataire, marié(e), pacsé(e), divorcé(e) ou veuf/veuve.", en: "Whether you are single, married, in a civil partnership, divorced or widowed.", zh: "您是单身、已婚、民事伴侣、离婚还是丧偶。", ar: "هل أنت أعزب، متزوج، مرتبط بعقد PACS، مطلّق أو أرمل." },
    ex: "Ma situation familiale a changé cette année : je me suis marié.", exTr: { en: "My family situation changed this year: I got married.", zh: "我今年家庭状况变了：我结婚了。", ar: "تغيّر وضعي العائلي هذا العام: تزوّجت." },
    quiz: "Après un mariage, signalez votre nouvelle ___." },
  charge: { fr: "enfants à charge",
    tr: { en: "dependent children", zh: "受抚养子女", ar: "الأطفال المُعالون" },
    def: { fr: "Les enfants qui vivent avec vous et dont vous payez les besoins.", en: "Children who live with you and whose needs you pay for.", zh: "与您同住、由您负担生活费用的孩子。", ar: "الأطفال الذين يعيشون معك وتتكفّل باحتياجاتهم." },
    ex: "Elle a trois enfants à charge.", exTr: { en: "She has three dependent children.", zh: "她有三个受抚养子女。", ar: "لديها ثلاثة أطفال تعولهم." },
    quiz: "Indiquez sur le formulaire le nombre d’___." },
  livret: { fr: "livret de famille",
    tr: { en: "family record book", zh: "家庭户口簿（livret de famille）", ar: "دفتر العائلة" },
    def: { fr: "Un petit livre officiel donné par la mairie, qui contient le mariage et les naissances des enfants.", en: "A small official booklet given by the town hall, recording the marriage and the children’s births.", zh: "由市政府发放的官方小册子，记录婚姻和子女出生信息。", ar: "كتيّب رسمي تسلّمه البلدية، يُسجَّل فيه الزواج وولادة الأطفال." },
    ex: "La mairie a ajouté mon fils dans le livret de famille.", exTr: { en: "The town hall added my son to the family record book.", zh: "市政府把我儿子登记进了家庭户口簿。", ar: "أضافت البلدية ابني إلى دفتر العائلة." },
    quiz: "Après une naissance, la mairie met à jour le ___." },
  acte: { fr: "acte de naissance",
    tr: { en: "birth certificate", zh: "出生证明", ar: "شهادة الميلاد" },
    def: { fr: "Le document officiel qui indique la date et le lieu de naissance d’une personne, et ses parents.", en: "The official document showing a person’s date and place of birth, and their parents.", zh: "写明出生日期、出生地点和父母的正式文件。", ar: "الوثيقة الرسمية التي تذكر تاريخ ومكان ولادة الشخص ووالديه." },
    ex: "Il faut un acte de naissance pour faire une carte d’identité.", exTr: { en: "You need a birth certificate to get an ID card.", zh: "办身份证需要出生证明。", ar: "تحتاج إلى شهادة ميلاد لاستخراج بطاقة الهوية." },
    quiz: "Pour inscrire votre enfant, apportez son ___." },
  acompter: { fr: "à compter de la réception",
    tr: { en: "from the date you receive it", zh: "自收到之日起", ar: "ابتداءً من تاريخ الاستلام" },
    def: { fr: "Le délai commence le jour où vous avez reçu le courrier, pas le jour où il a été écrit.", en: "The time limit starts the day you received the letter, not the day it was written.", zh: "期限从您收到信件的那天开始算，而不是写信的那天。", ar: "تبدأ المهلة من يوم استلامك الرسالة، لا من يوم كتابتها." },
    ex: "Vous avez 15 jours à compter de la réception pour répondre.", exTr: { en: "You have 15 days from receipt to reply.", zh: "自收到之日起，您有15天时间回复。", ar: "لديك 15 يومًا من تاريخ الاستلام للرد." },
    quiz: "Le délai de 30 jours court ___ de la lettre." },
  agree: { fr: "traducteur agréé",
    tr: { en: "approved (sworn) translator", zh: "认证翻译员", ar: "مترجم معتمد" },
    def: { fr: "Un traducteur inscrit auprès d’une cour d’appel. L’administration accepte ses traductions. Son travail est payant.", en: "A translator registered with a court of appeal. The administration accepts their translations. Their work is paid.", zh: "在上诉法院登记的翻译员，其译文被行政部门认可，需要付费。", ar: "مترجم مسجّل لدى محكمة استئناف، تقبل الإدارة ترجماته، وخدمته مدفوعة." },
    ex: "J’ai fait traduire mon acte de mariage par un traducteur agréé.", exTr: { en: "I had my marriage certificate translated by an approved translator.", zh: "我请认证翻译员翻译了我的结婚证明。", ar: "ترجمتُ عقد زواجي عند مترجم معتمد." },
    quiz: "Pour un acte étranger, l’administration demande souvent la traduction d’un ___." },
  messagerie: { fr: "messagerie sécurisée",
    tr: { en: "secure messaging", zh: "安全信箱", ar: "المراسلة الآمنة" },
    def: { fr: "Un service de messages dans votre espace en ligne, pour écrire à l’administration en toute sécurité.", en: "A messaging service in your online account, for writing to the administration safely.", zh: "您在线个人空间里的消息服务，可以安全地给行政部门写信。", ar: "خدمة رسائل في فضائك على الإنترنت، للكتابة إلى الإدارة بأمان." },
    ex: "J’ai posé ma question par la messagerie sécurisée.", exTr: { en: "I asked my question through the secure messaging.", zh: "我通过安全信箱提了问题。", ar: "طرحت سؤالي عبر المراسلة الآمنة." },
    quiz: "Écrivez aux impôts par la ___ de votre espace particulier." }
};

/* Courriers fictifs. Dates relatives à la date de référence de la démo (en jours). */
const LETTERS = [
  {
    id: "caf", org: "Caisse d’allocations familiales", contact: "caf", stakes: "high", kind: "courrier",
    letterOffset: -6, deadline: { type: "fixed", offset: 4 },
    title: { fr: "CAF · Pièces à envoyer pour l’aide au logement", en: "CAF · Documents to send for housing aid", zh: "CAF · 需提交的住房补助材料", ar: "CAF · وثائق مطلوبة لمساعدة السكن" },
    teaser: { fr: "Échéance proche", en: "Deadline soon", zh: "截止日期临近", ar: "موعد قريب" },
    summary: { fr: "Envoyer 2 documents à la CAF avant la date limite. Sinon, le versement de votre aide au logement sera suspendu.", en: "Send 2 documents to the CAF before the deadline. Otherwise, your housing aid payments will be suspended.", zh: "在截止日期前向CAF提交2份文件，否则您的住房补助将被暂停发放。", ar: "أرسل وثيقتين إلى CAF قبل الموعد النهائي، وإلا سيُعلَّق صرف مساعدة السكن." },
    pieces: ["avis", "attest"],
    terms: ["pj", "avis", "attest", "bailleur", "versement", "suspendu"],
    paras: [
      { id: "p1", fr: "Objet : demande de pièces justificatives", en: "Subject: request for supporting documents", zh: "事由：要求提供证明文件", ar: "الموضوع: طلب وثائق داعمة" },
      { id: "p2", fr: "Madame, Monsieur, pour continuer l’étude de vos droits à l’aide personnalisée au logement (APL), nous avons besoin de pièces justificatives complémentaires.", en: "Dear Sir or Madam, to continue reviewing your right to personal housing aid (APL), we need additional supporting documents.", zh: "女士/先生：为了继续审核您领取个人住房补助（APL）的权利，我们需要您补充证明文件。", ar: "سيدتي، سيدي، لمواصلة دراسة حقك في مساعدة السكن الشخصية (APL)، نحتاج إلى وثائق داعمة إضافية." },
      { id: "p3", fr: "Merci de nous transmettre votre avis d’imposition 2026 et une attestation de loyer remplie et signée par votre bailleur.", en: "Please send us your 2026 tax notice and a rent certificate filled in and signed by your landlord.", zh: "请向我们提交您的2026年纳税通知书，以及由房东填写并签字的租金证明。", ar: "يرجى إرسال إشعار الضريبة لعام 2026، وشهادة إيجار يملؤها ويوقّعها المؤجِّر." },
      { id: "p4", fr: "Vous devez nous faire parvenir ces documents avant le {deadline}. Sans réponse de votre part à cette date, le versement de votre aide sera suspendu.", en: "You must send us these documents before {deadline}. If we have no reply from you by that date, payment of your aid will be suspended.", zh: "您必须在{deadline}之前将这些文件寄给我们。如果到该日期仍未收到您的回复，您的补助发放将被暂停。", ar: "يجب أن تُرسل إلينا هذه الوثائق قبل {deadline}. إذا لم نتلقَّ ردك حتى هذا التاريخ، سيُعلَّق صرف مساعدتك." },
      { id: "p5", fr: "Vous pouvez déposer vos documents en ligne dans votre espace Mon Compte sur caf.fr, rubrique « Mes démarches ».", en: "You can upload your documents in your “Mon Compte” area on caf.fr, under “Mes démarches”.", zh: "您可以在caf.fr网站的“Mon Compte”个人空间，在“Mes démarches”栏目上传文件。", ar: "يمكنك إيداع وثائقك عبر الإنترنت في فضاء «Mon Compte» على موقع caf.fr، في قسم «Mes démarches»." },
      { id: "p6", fr: "Veuillez agréer, Madame, Monsieur, nos salutations distinguées.", en: "Yours faithfully.", zh: "此致敬礼。", ar: "وتفضلوا بقبول فائق الاحترام." }
    ],
    steps: [
      { refs: ["p3"], fr: "Retrouvez votre avis d’imposition 2026. Vous pouvez aussi le télécharger sur impots.gouv.fr.", en: "Find your 2026 tax notice. You can also download it from impots.gouv.fr.", zh: "找到您的2026年纳税通知书。也可以在impots.gouv.fr上下载。", ar: "ابحث عن إشعار الضريبة لعام 2026. يمكنك أيضًا تنزيله من موقع impots.gouv.fr." },
      { refs: ["p3"], fr: "Demandez à votre bailleur de remplir et de signer l’attestation de loyer.", en: "Ask your landlord to fill in and sign the rent certificate.", zh: "请房东填写并签署租金证明。", ar: "اطلب من المؤجِّر أن يملأ شهادة الإيجار ويوقّعها." },
      { refs: ["p4", "p5"], fr: "Envoyez les deux documents avant le {deadline}, sur caf.fr (Mon Compte, Mes démarches).", en: "Send both documents before {deadline}, on caf.fr (Mon Compte, Mes démarches).", zh: "在{deadline}之前，通过caf.fr（Mon Compte，Mes démarches）提交这两份文件。", ar: "أرسل الوثيقتين قبل {deadline} عبر موقع caf.fr (Mon Compte، Mes démarches)." },
      { refs: ["p4"], fr: "Si vous ne pouvez pas les envoyer à temps, appelez la CAF avant cette date.", en: "If you cannot send them in time, call the CAF before that date.", zh: "如果无法按时提交，请在该日期之前致电CAF。", ar: "إذا لم تستطع إرسالها في الوقت المحدد، اتصل بـCAF قبل هذا التاريخ." }
    ]
  },
  {
    id: "ameli", org: "Assurance Maladie – Caisse primaire", contact: "ameli", stakes: "medium", kind: "courrier",
    letterOffset: -9, deadline: { type: "none" }, threeMonths: true,
    title: { fr: "Assurance Maladie · Justificatif de domicile", en: "Health insurance · Proof of address", zh: "医保 · 住址证明", ar: "التأمين الصحي · إثبات السكن" },
    teaser: { fr: "Sans date limite", en: "No deadline", zh: "无截止日期", ar: "بلا موعد نهائي" },
    summary: { fr: "Envoyer un justificatif de domicile récent à l’Assurance Maladie. Le courrier ne donne pas de date limite, mais votre demande attend ce document.", en: "Send recent proof of address to the Assurance Maladie. The letter gives no deadline, but your application is waiting for this document.", zh: "向医保机构寄一份近期的住址证明。信中没有写截止日期，但您的申请正在等待这份文件。", ar: "أرسل إثبات سكن حديثًا إلى التأمين الصحي. لا تذكر الرسالة موعدًا نهائيًا، لكن طلبك ينتظر هذه الوثيقة." },
    pieces: ["jdd"],
    terms: ["css", "jdd", "moins3", "facture", "quittance"],
    paras: [
      { id: "p1", fr: "Objet : votre demande de Complémentaire santé solidaire", en: "Subject: your application for Complémentaire santé solidaire (supplementary health cover)", zh: "事由：您的团结补充医疗保险（Complémentaire santé solidaire）申请", ar: "الموضوع: طلبك للحصول على التأمين الصحي التكميلي التضامني (Complémentaire santé solidaire)" },
      { id: "p2", fr: "Madame, Monsieur, nous avons bien reçu votre demande. Pour l’étudier, il nous manque un document.", en: "Dear Sir or Madam, we have received your application. To review it, we are missing one document.", zh: "女士/先生：我们已收到您的申请。为了审核，我们还缺少一份文件。", ar: "سيدتي، سيدي، لقد تلقّينا طلبك. لدراسته، تنقصنا وثيقة واحدة." },
      { id: "p3", fr: "Merci de nous adresser un justificatif de domicile de moins de trois mois, à votre nom : par exemple une facture d’électricité, de gaz ou d’eau, ou une quittance de loyer.", en: "Please send us proof of address less than three months old, in your name: for example an electricity, gas or water bill, or a rent receipt.", zh: "请寄给我们一份三个月以内、写有您姓名的住址证明，例如电费、燃气费或水费账单，或房租收据。", ar: "يرجى إرسال إثبات سكن لا يزيد عمره عن ثلاثة أشهر، باسمك: مثلًا فاتورة كهرباء أو غاز أو ماء، أو إيصال إيجار." },
      { id: "p4", fr: "Dès réception de ce document, nous poursuivrons l’étude de votre dossier.", en: "As soon as we receive this document, we will continue reviewing your file.", zh: "收到该文件后，我们将继续审核您的申请材料。", ar: "فور استلام هذه الوثيقة، سنواصل دراسة ملفك." },
      { id: "p5", fr: "Vous pouvez l’envoyer depuis votre compte ameli, rubrique « Mes démarches », ou par courrier à l’adresse indiquée en haut de cette lettre.", en: "You can send it from your ameli account, under “Mes démarches”, or by post to the address at the top of this letter.", zh: "您可以通过ameli账户的“Mes démarches”栏目发送，或邮寄到本信顶部的地址。", ar: "يمكنك إرسالها من حسابك على ameli، في قسم «Mes démarches»، أو بالبريد إلى العنوان المذكور أعلى هذه الرسالة." },
      { id: "p6", fr: "Nous vous prions d’agréer, Madame, Monsieur, l’expression de nos salutations distinguées.", en: "Yours faithfully.", zh: "此致敬礼。", ar: "وتفضلوا بقبول فائق الاحترام." }
    ],
    steps: [
      { refs: ["p3"], fr: "Trouvez une facture ou une quittance de loyer à votre nom, datée après le {limit3m}.", en: "Find a bill or rent receipt in your name, dated after {limit3m}.", zh: "找一份写有您姓名、日期在{limit3m}之后的账单或房租收据。", ar: "ابحث عن فاتورة أو إيصال إيجار باسمك، بتاريخ بعد {limit3m}." },
      { refs: ["p3"], fr: "Si aucun document n’est à votre nom, demandez à l’Assurance Maladie lequel elle accepte.", en: "If no document is in your name, ask the Assurance Maladie which one it accepts.", zh: "如果没有写您名字的文件，请询问医保机构可以接受哪种文件。", ar: "إذا لم تكن أي وثيقة باسمك، اسأل التأمين الصحي عن الوثيقة التي يقبلها." },
      { refs: ["p5"], fr: "Envoyez-le depuis votre compte ameli (Mes démarches) ou par courrier.", en: "Send it from your ameli account (Mes démarches) or by post.", zh: "通过ameli账户（Mes démarches）或邮寄发送。", ar: "أرسلها من حسابك على ameli (Mes démarches) أو بالبريد." }
    ]
  },
  {
    id: "impots", org: "Finances publiques – Service des impôts des particuliers", contact: "impots", stakes: "high", kind: "formulaire",
    letterOffset: -26, deadline: { type: "reception", days: 30 }, certifiedTranslation: true,
    title: { fr: "Impôts · Formulaire de situation familiale", en: "Tax office · Family situation form", zh: "税务局 · 家庭状况表", ar: "الضرائب · استمارة الوضع العائلي" },
    teaser: { fr: "Délai selon la réception", en: "Deadline depends on receipt", zh: "期限取决于收信日期", ar: "المهلة حسب الاستلام" },
    summary: { fr: "Remplir 3 champs du formulaire, joindre les actes des enfants et renvoyer le tout dans les 30 jours après la réception.", en: "Fill in 3 fields of the form, attach the children’s certificates and send everything back within 30 days of receiving it.", zh: "填写表格的3个栏目，附上子女的证明文件，并在收信后30天内全部寄回。", ar: "املأ 3 خانات في الاستمارة، وأرفق وثائق الأطفال، وأعد كل شيء خلال 30 يومًا من الاستلام." },
    pieces: ["livret", "acte"],
    terms: ["sitfam", "charge", "livret", "acte", "agree", "acompter", "messagerie"],
    paras: [
      { id: "p1", fr: "Objet : demande de renseignements – formulaire à compléter", en: "Subject: request for information – form to complete", zh: "事由：信息核实——需填写表格", ar: "الموضوع: طلب معلومات – استمارة يجب ملؤها" },
      { id: "p2", fr: "Madame, Monsieur, afin de mettre à jour votre dossier fiscal, nous avons besoin de précisions sur votre situation familiale.", en: "Dear Sir or Madam, to update your tax file, we need details about your family situation.", zh: "女士/先生：为了更新您的税务档案，我们需要了解您家庭状况的详细信息。", ar: "سيدتي، سيدي، لتحديث ملفك الضريبي، نحتاج إلى تفاصيل عن وضعك العائلي." },
      { id: "p3", fr: "Merci de compléter le formulaire joint : cochez votre situation familiale, indiquez le nombre d’enfants à charge, puis datez et signez en bas de la page 2.", en: "Please complete the enclosed form: tick your family situation, write the number of dependent children, then date and sign at the bottom of page 2.", zh: "请填写随附表格：勾选您的家庭状况，填写受抚养子女人数，然后在第2页底部写上日期并签名。", ar: "يرجى ملء الاستمارة المرفقة: ضع علامة على وضعك العائلي، واكتب عدد الأطفال الذين تعولهم، ثم أرّخ ووقّع أسفل الصفحة 2." },
      { id: "p4", fr: "Joignez une copie du livret de famille ou de l’acte de naissance de chaque enfant à charge. Si un acte est rédigé dans une langue étrangère, joignez sa traduction par un traducteur agréé.", en: "Attach a copy of the family record book or the birth certificate of each dependent child. If a certificate is written in a foreign language, attach its translation by an approved translator.", zh: "请附上家庭户口簿（livret de famille）或每个受抚养子女出生证明的复印件。如果证明是外文的，请附上由认证翻译员翻译的译文。", ar: "أرفق نسخة من دفتر العائلة أو شهادة ميلاد كل طفل تعوله. إذا كانت الشهادة مكتوبة بلغة أجنبية، أرفق ترجمتها من مترجم معتمد." },
      { id: "p5", fr: "Vous disposez d’un délai de 30 jours à compter de la réception du présent courrier pour nous retourner le formulaire complété.", en: "You have 30 days from receipt of this letter to return the completed form to us.", zh: "自收到本信之日起，您有30天时间将填好的表格寄回给我们。", ar: "لديك مهلة 30 يومًا من تاريخ استلام هذه الرسالة لإعادة الاستمارة مملوءة إلينا." },
      { id: "p6", fr: "Vous pouvez répondre par la messagerie sécurisée de votre espace particulier sur impots.gouv.fr, ou par courrier.", en: "You can reply through the secure messaging of your personal area on impots.gouv.fr, or by post.", zh: "您可以通过impots.gouv.fr个人空间的安全信箱回复，或邮寄回复。", ar: "يمكنك الرد عبر المراسلة الآمنة في فضائك الشخصي على impots.gouv.fr، أو بالبريد." },
      { id: "f1", form: true, fr: "Champ 1 – Situation familiale : ☐ célibataire  ☐ marié(e) ou pacsé(e)  ☐ divorcé(e) ou séparé(e)  ☐ veuf ou veuve", en: "Field 1 – Family situation: ☐ single  ☐ married or in a civil partnership (PACS)  ☐ divorced or separated  ☐ widowed", zh: "第1栏——家庭状况：☐ 单身  ☐ 已婚或已签民事伴侣协议（PACS）  ☐ 离婚或分居  ☐ 丧偶", ar: "الخانة 1 – الوضع العائلي: ☐ أعزب/عزباء  ☐ متزوج(ة) أو مرتبط(ة) بعقد PACS  ☐ مطلّق(ة) أو منفصل(ة)  ☐ أرمل(ة)" },
      { id: "f2", form: true, fr: "Champ 2 – Nombre d’enfants à charge : ______", en: "Field 2 – Number of dependent children: ______", zh: "第2栏——受抚养子女人数：______", ar: "الخانة 2 – عدد الأطفال المُعالين: ______" },
      { id: "f3", form: true, fr: "Champ 3 – Date et signature (bas de la page 2) : ______", en: "Field 3 – Date and signature (bottom of page 2): ______", zh: "第3栏——日期和签名（第2页底部）：______", ar: "الخانة 3 – التاريخ والتوقيع (أسفل الصفحة 2): ______" }
    ],
    steps: [
      { refs: ["f1", "p3"], fr: "Champ 1 : cochez une seule case pour votre situation familiale.", en: "Field 1: tick one box only for your family situation.", zh: "第1栏：在家庭状况中只勾选一个框。", ar: "الخانة 1: ضع علامة في خانة واحدة فقط لوضعك العائلي." },
      { refs: ["f2", "p3"], fr: "Champ 2 : écrivez le nombre d’enfants à charge.", en: "Field 2: write the number of dependent children.", zh: "第2栏：写上受抚养子女人数。", ar: "الخانة 2: اكتب عدد الأطفال الذين تعولهم." },
      { refs: ["f3", "p3"], fr: "Champ 3 : datez et signez en bas de la page 2.", en: "Field 3: date and sign at the bottom of page 2.", zh: "第3栏：在第2页底部写上日期并签名。", ar: "الخانة 3: أرّخ ووقّع أسفل الصفحة 2." },
      { refs: ["p4"], fr: "Joignez une copie du livret de famille ou de l’acte de naissance de chaque enfant, avec une traduction par un traducteur agréé si l’acte est en langue étrangère.", en: "Attach a copy of the family record book or each child’s birth certificate, with a translation by an approved translator if a certificate is in a foreign language.", zh: "附上家庭户口簿或每个孩子出生证明的复印件；如果证明是外文的，还要附上认证翻译员的译文。", ar: "أرفق نسخة من دفتر العائلة أو شهادة ميلاد كل طفل، مع ترجمة من مترجم معتمد إذا كانت الشهادة بلغة أجنبية." },
      { refs: ["p5", "p6"], fr: "Renvoyez le tout {deadlineOr}, par la messagerie sécurisée sur impots.gouv.fr ou par courrier.", en: "Send everything back {deadlineOr}, through the secure messaging on impots.gouv.fr or by post.", zh: "请{deadlineOr}通过impots.gouv.fr的安全信箱或邮寄方式全部寄回。", ar: "أعد كل شيء {deadlineOr}، عبر المراسلة الآمنة على impots.gouv.fr أو بالبريد." }
    ]
  }
];
const BEFORE_DATE = { fr: d => `avant le ${d}`, en: d => `before ${d}`, zh: d => `在${d}之前`, ar: d => `قبل ${d}` };

/* Communauté : profils fictifs, sans lien avec un type de courrier */
const CITIES = ["Aubervilliers", "Bobigny", "Bondy", "Montreuil", "Pantin", "Saint-Denis", "Saint-Ouen"];
const INTERESTS = ["Cuisine", "Couture", "Football", "Musique", "Lecture", "Randonnée", "Jeux de société", "Jardinage", "Vélo", "Badminton"];
const PEOPLE = [
  { id: "u1", name: "Nour", city: "Saint-Denis", interests: ["Cuisine", "Couture"], bio: "J’apprends le français le soir. J’aime cuisiner pour mes voisins.", hue: 0 },
  { id: "u2", name: "Wei", city: "Aubervilliers", interests: ["Badminton", "Cuisine"], bio: "Je cherche des personnes pour parler français autour d’un thé.", hue: 1 },
  { id: "u3", name: "Samuel", city: "Montreuil", interests: ["Football", "Musique"], bio: "Supporter du Red Star, guitariste débutant.", hue: 2 },
  { id: "u4", name: "Leïla", city: "Bobigny", interests: ["Lecture", "Randonnée"], bio: "Je lis des romans faciles en français. Vos conseils de livres sont bienvenus.", hue: 3 },
  { id: "u5", name: "Meng", city: "Saint-Denis", interests: ["Jeux de société", "Couture"], bio: "Le dimanche, je joue aux cartes avec des amis du quartier.", hue: 4 },
  { id: "u6", name: "Karim", city: "Aubervilliers", interests: ["Football", "Jardinage"], bio: "Je m’occupe d’un petit jardin partagé. Venez planter des tomates.", hue: 5 },
  { id: "u7", name: "Grace", city: "Montreuil", interests: ["Musique", "Cuisine"], bio: "Je chante dans une chorale. On répète le mercredi.", hue: 1 },
  { id: "u8", name: "Ahmad", city: "Pantin", interests: ["Vélo", "Jeux de société"], bio: "Balades à vélo le long du canal de l’Ourcq le samedi matin.", hue: 2 }
];
const REPORT_REASONS = ["Demande d’argent", "Se fait passer pour un organisme", "Demande des codes ou des documents", "Propos insultants", "Faux profil", "Autre raison"];

/* ===== Lecture de vrais documents (OCR local) ===== */
Object.assign(UI, {
  ocrLoading: { fr: "Préparation du moteur de lecture (une seule fois, environ 5 Mo)…", en: "Preparing the reading engine (only once, about 5 MB)…", zh: "正在准备识别引擎（仅一次，约5MB）……", ar: "جارٍ تجهيز محرك القراءة (مرة واحدة فقط، نحو 5 ميغابايت)…" },
  ocrReading: { fr: "Lecture du document sur ce téléphone…", en: "Reading the document on this phone…", zh: "正在这部手机上识别文件……", ar: "جارٍ قراءة المستند على هذا الهاتف…" },
  ocrNote: { fr: "Lu sur ce téléphone avec Tesseract. Rien n’est envoyé. La lecture automatique peut se tromper : vérifiez les chiffres et les dates sur le papier.", en: "Read on this phone with Tesseract. Nothing is sent. Automatic reading can make mistakes: check numbers and dates on the paper.", zh: "已用 Tesseract 在这部手机上识别，不会发送任何内容。自动识别可能出错：请对照纸质信件核对数字和日期。", ar: "قُرئ على هذا الهاتف باستخدام Tesseract. لا يُرسَل أي شيء. قد تخطئ القراءة الآلية: تحقّق من الأرقام والتواريخ على الورقة." },
  ocrNoTranslation: { fr: "La traduction et l’explication d’un vrai courrier ne sont pas encore branchées dans le pilote. Vous pouvez écouter le texte en français et toucher les expressions surlignées.", en: "Translation and explanation of a real letter are not connected in the pilot yet. You can listen to the French text and tap highlighted expressions.", zh: "试用版尚未接入真实信件的翻译和解释。您可以收听法语原文，并点击高亮词语。", ar: "ترجمة رسالة حقيقية وشرحها غير موصولين في الإصدار التجريبي بعد. يمكنك الاستماع إلى النص الفرنسي ولمس العبارات المميّزة." },
  ocrFail: { fr: "Le moteur de lecture n’a pas pu démarrer sur cet appareil.", en: "The reading engine could not start on this device.", zh: "识别引擎无法在此设备上启动。", ar: "تعذّر تشغيل محرك القراءة على هذا الجهاز." },
  ocrEmpty: { fr: "Aucun texte n’a été reconnu. Reprenez la photo à plat, bien éclairée, sans reflet.", en: "No text was recognised. Retake the photo flat, well lit, without glare.", zh: "未识别出文字。请把信件放平，在光线充足、无反光的地方重拍。", ar: "لم يُتعرَّف على أي نص. أعد التصوير والورقة مسطّحة، في إضاءة جيدة ومن دون انعكاس." },
  layoutView: { fr: "Mise en page", en: "Layout", zh: "原版式", ar: "التخطيط" },
  textView: { fr: "Texte", en: "Text", zh: "文字", ar: "النص" },
  fieldsTitle: { fr: "Cases à remplir", en: "Boxes to fill in", zh: "需要填写的栏目", ar: "الخانات التي يجب ملؤها" },
  fieldsNone: { fr: "Aucune case à remplir n’a été repérée.", en: "No boxes to fill in were found.", zh: "没有找到需要填写的栏目。", ar: "لم يُعثر على خانات يجب ملؤها." },
  numbersTitle: { fr: "Chiffres et dates repérés", en: "Numbers and dates found", zh: "识别出的数字和日期", ar: "الأرقام والتواريخ المكتشفة" },
  pickDeadline: { fr: "Une de ces dates est la date limite ? Touchez-la.", en: "Is one of these dates the deadline? Tap it.", zh: "其中有截止日期吗？请点击它。", ar: "هل أحد هذه التواريخ هو الموعد النهائي؟ المسه." },
  chosenByYou: { fr: "Date limite choisie par vous dans le courrier.", en: "Deadline chosen by you from the letter.", zh: "这是您从信中选定的截止日期。", ar: "موعد نهائي اخترته أنت من الرسالة." },
  listenFr: { fr: "Écouter le texte en français", en: "Listen to the French text", zh: "收听法语原文", ar: "استمع إلى النص الفرنسي" },
  exportPdf: { fr: "Exporter le document rempli (PDF)", en: "Export the filled document (PDF)", zh: "导出填好的文件（PDF）", ar: "صدّر المستند المملوء (PDF)" },
  lowConf: { fr: "Lecture incertaine", en: "Uncertain reading", zh: "识别不确定", ar: "قراءة غير مؤكَّدة" },
  column: { fr: "Colonne", en: "Column", zh: "栏", ar: "العمود" }
});
