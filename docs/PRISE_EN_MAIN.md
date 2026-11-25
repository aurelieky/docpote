# DocPote : prise en main

Bienvenue Aurélie ! Ce document résume où en est le projet, ce que fait le pilote, et comment continuer à le faire évoluer avec Claude sans écrire de code.

## 1. Où trouver quoi

| Quoi | Où |
|---|---|
| Le pilote en ligne (version Vercel) | Le lien envoyé par Adam après la mise en ligne. Il se met à jour à chaque changement validé. |
| Le pilote hébergé sur Claude (version de secours) | [claude.ai/artifact/QmmU6MdDTWqWPhQt1VGs3W](https://claude.ai/artifact/QmmU6MdDTWqWPhQt1VGs3W) |
| Les maquettes (pistes A, B, C, palettes, apprentissage, espace personnel) | [claude.ai/artifact/RnkFQevoTJzyHkcY5EEoBH](https://claude.ai/artifact/RnkFQevoTJzyHkcY5EEoBH) |
| Le cahier des charges par scénario de cible | [claude.ai/artifact/SC9kfA9R9n2TUidyuojLwz](https://claude.ai/artifact/SC9kfA9R9n2TUidyuojLwz) |
| Financement et nouveau nom | [claude.ai/artifact/HwYG1kVES8hQxbtPKEFMrp](https://claude.ai/artifact/HwYG1kVES8hQxbtPKEFMrp) |
| Revue façon jury, résumé, points de friction, comparaison des pistes, piste B, pitch de 3 min + 7 min de questions | dossier [`docs/pdf`](pdf) |
| Les trois propositions de logo (pli, duo, surlignage) | dossier [`docs/logos`](logos) |

Si un lien claude.ai affiche « Page not found », c'est qu'il n'est pas encore partagé : demandez à Adam de l'ouvrir au partage (menu Partager → « Toute personne disposant du lien »).

## 2. Ce que fait le pilote aujourd'hui

L'application est pensée pour des personnes qui lisent peu ou pas le français : les images portent les actions, les légendes font quelques mots, et chaque action importante a un bouton haut-parleur rond pour l'explication orale. Elle n'a **pas encore été testée avec des personnes non lectrices** : c'est le prochain test à faire.

**S'installe comme une application** : depuis le lien Vercel, sur Android menu ⋮ → « Installer l'application » ; sur iPhone, Safari → bouton Partager → « Sur l'écran d'accueil ». L'icône DocPote apparaît sur l'écran d'accueil. Après une première visite, elle s'ouvre même sans réseau (sauf l'assistant). Le bouton « i » rappelle comment faire.

**Le parcours**

- **Langue, à l'oreille** (premier lancement seulement) : 28 langues en grandes cartes, sans drapeau. Chaque carte a un bouton « écouter » séparé du bouton « choisir ». Pour 24 langues, on entend un court extrait d'une **vraie voix humaine** (phrase au hasard tirée d'un corpus public, juste pour reconnaître la langue) ; sinon la voix du téléphone dit le nom de la langue. Pas encore d'extrait pour le dari, le soninké, le tigrinya et l'ourdou. De petites icônes indiquent ce qui marche vraiment : textes, voix du téléphone, micro. Le choix est mémorisé. Les crédits des voix sont dans le bouton « i ».
- **Accueil** : deux grandes portes, « Mes documents » et « Ensemble ».
- **Mes documents** : Scanner (appareil photo), Importer (photo ou PDF), Enregistrés, Exemples (trois courriers inventés : CAF, Assurance Maladie, impôts).
- **Lire un document** :
  - **Écouter** : lecture dans la langue choisie quand c'est possible, sinon en français (annoncé). Le passage français correspondant est surligné en jaune, bloc par bloc, et la page défile. Pause, réécoute, vitesse.
  - **Date limite** : calendrier, état clair (proche, dépassée, à vérifier), écoutable. La date du courrier et l'ancienneté d'un justificatif sont affichées à part. Si une information manque (date de réception), l'application la demande.
  - **Quoi faire** : à quoi sert le document, ce qu'on demande, quoi fournir, avant quelle date. Puis les étapes illustrées, une action par étape, détails à la demande.
  - **Le courrier** : on touche une expression pour sa traduction, sa définition, l'écoute et l'ajout aux révisions. Pour un vrai document, le texte reconnu est posé sur l'image (sélectionnable) et les cases à remplir sont remplissables.
  - **Poser une question** : gros bouton micro, ou texte. L'assistant (Claude) répond en séparant « dans le courrier » et « explication générale ». « Je n'ai pas compris » le fait reformuler plus simplement.
  - **Aide maintenant** en cas d'urgence : contacts vérifiés (CAF 3230, impôts 0 809 401 401, Assurance Maladie 36 46, annuaire des traducteurs agréés), jamais un numéro inventé.
- **Ensemble** :
  - **Apprendre** : quiz à partir des mots enregistrés, questions et réponses écoutables, images quand elles sont claires, XP, niveau, série de jours, encouragements sans culpabiliser.
  - **Communauté** : questions et réponses (aussi en dictée), aperçu et contrôle avant publication (pas de lien, de numéro, de demande d'argent ni d'information personnelle), personnes avec leurs langues, demandes d'amis à accepter ou refuser, Bloquer, Signaler, rappel de sécurité écrit et oral.
  - **Mon profil** : ce que les autres voient (privé par défaut, aperçu avant de le rendre visible) séparé de mon espace privé (documents, révisions, XP, amis).

**Ce qui est simulé ou limité**

- Les trois exemples sont inventés. Leurs traductions et explications existent en anglais, chinois écrit et arabe ; les autres langues voient le français avec un badge « FR ».
- La communauté est fictive : rien n'est envoyé, aucun modérateur ne reçoit les signalements. Pas de compte : un profil local de démonstration.
- L'assistant (questions et explication d'un vrai courrier) ne marche que dans l'application Claude (site claude.ai ou application), **connecté à un compte**, après accord de la personne, et peut se tromper. Ailleurs (site Vercel, lien ouvert sans être connecté), un message explique quoi faire. Si l'accord a été refusé, il faut recharger la page.
- Les extraits de voix humaine servent seulement à reconnaître sa langue. Pour que l'application **parle** wolof, bambara, soninké, etc., il faudra faire enregistrer ses phrases par des locuteurs natifs (voir les prochaines étapes).
- Le micro dépend du navigateur et de la langue. Il est indiqué indisponible pour les langues sans service connu (wenzhou, teochew, kabyle, bambara, wolof, soninké, peul, tigrinya, dari, pachto, créole haïtien).
- Les voix dépendent du téléphone. Aucune voix de remplacement n'est utilisée : pas de voix mandarine pour le wenzhou ou le teochew, pas de voix d'Iran pour le dari.
- Les données restent sur le téléphone.

## 3. Démonstration de 90 secondes devant le jury

1. Au premier écran, toucher le haut-parleur de « العربية » : on entend la langue. Puis toucher la coche pour la choisir.
2. Accueil : deux grandes images. Toucher le haut-parleur de « Mes documents » pour l'explication orale.
3. Mes documents → Exemples → le courrier de la CAF : date limite proche, « Aide maintenant ».
4. « Écouter » : la traduction arabe est lue et le passage français correspondant se surligne en jaune. Pause.
5. Toucher « attestation de loyer » dans le courrier : traduction, écoute, ajout aux révisions.
6. « Poser une question » : toucher le micro, demander « Qu'est-ce que je dois envoyer ? ». L'assistant répond après accord.
7. Ensemble → Apprendre : une question ratée, l'explication écoutée, réessayer, XP gagnés.
8. Bonus : Mes documents → Importer une photo de formulaire. Les colonnes, les dates et les cases à remplir apparaissent sur l'image.

La date de référence des exemples est celle du jour : le courrier de la CAF reste « urgent » le jour de la présentation. On peut la fixer avec le petit bouton « i » en haut à droite.

## 4. Demander un changement à Claude

1. Sur la page du dépôt GitHub, onglet **Issues** → **New issue** → **Demande pour Claude**.
2. Écrivez (ou dictez) ce que vous voulez, en français, avec vos mots. Une demande par issue, c'est plus simple.
3. **Chaque soir vers 20 h 30**, Claude lit les nouvelles demandes. Pour chacune :
   - il fait le changement et teste toute l'application ;
   - il propose le changement (« pull request ») ;
   - il vous répond dans l'issue, en français, avec ce qui a changé et comment tester.
4. Ouvrez le lien d'aperçu de Vercel, indiqué dans la pull request, et testez sur votre téléphone.
   - **Si c'est bon :** appuyez sur **Merge pull request**. Le changement passe sur le site principal.
   - **Sinon :** répondez dans l'issue en expliquant ce qui ne va pas. Claude reprend le soir suivant.

**Les étiquettes**

- `pour-claude` : demande à traiter.
- `en-cours` : Claude travaille dessus.
- `question` : Claude a besoin d'une précision ; répondez dans l'issue.
- `fait` : terminé.

**Conseils pour une bonne demande**

- Dites **sur quel écran** et **ce que la personne doit pouvoir faire**. Par exemple : « Sur l'écran du courrier, une personne qui ne lit pas le français doit trouver le bouton d'écoute sans aide. »
- Décrivez ce que vous avez **observé pendant un test** avec une personne : c'est souvent plus utile qu'une solution toute faite.
- Vous pouvez préparer votre demande avec votre compte Claude gratuit, puis la coller dans l'issue.

**Ce que Claude ne fera pas**

- Inventer un numéro de téléphone, une date limite ou une analyse.
- Faire passer un courrier fictif pour l'analyse de votre document.
- Envoyer un document personnel à un service extérieur.
- Mettre un changement en ligne sans votre validation.

Si une demande va contre une de ces règles, il vous l'expliquera dans l'issue.

## 5. Prochaines étapes suggérées

Elles sont tirées du cahier des charges et du document sur le financement.

1. **Tester sur le terrain** : 20 entretiens courts dans 2 ou 3 permanences (France Services, centres sociaux, associations) et 10 tests du pilote avec un vrai courrier anonymisé.
2. **Choisir le nom** : tester « Ouf », « Pigé » et « Origami » auprès d'une dizaine d'usagers, puis vérifier sur data.inpi.fr. Le nom se change à un seul endroit dans le code (une demande à Claude suffit).
3. **Créer l'association** (loi 1901) : presque tous les financeurs l'exigent, souvent avec 1 à 3 ans d'ancienneté.
4. **Premiers financements accessibles** :
   - tout de suite : CVEC et FSDIE de Paris 8, statut étudiant-entrepreneur PEPITE ;
   - dès janvier 2027 : appel « Fonds publics et territoires » de la CAF 93.
5. **Faire enregistrer les phrases de l'application** par des locuteurs natifs (associations, permanences) pour les langues sans voix sur le téléphone : environ 40 phrases courtes par langue (portes, aides orales, étapes). L'application est prête à les recevoir.
6. **Brancher l'explication d'un vrai courrier** (traduction et étapes) : c'est la plus grosse prochaine étape technique. Elle demande un accord explicite de la personne avant tout envoi à un service extérieur.
