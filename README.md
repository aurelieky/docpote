# DocPote

Pilote d'une application qui aide les personnes allophones de Seine-Saint-Denis à comprendre un courrier administratif, à savoir quoi faire, et à apprendre le vocabulaire rencontré.

**Nouvelle sur le projet ? Commencez par [`docs/PRISE_EN_MAIN.md`](docs/PRISE_EN_MAIN.md)** : état du pilote, démo de 90 secondes, liens vers les maquettes, le cahier des charges, le financement, le pitch et les logos.

## Voir l'application

Le site est publié par Vercel à partir de la branche `main`. Chaque proposition de changement (pull request) reçoit aussi son propre lien d'aperçu, pour tester avant de valider.

C'est une application installable (PWA) : sur Android, menu ⋮ → « Installer l'application » ; sur iPhone, Safari → Partager → « Sur l'écran d'accueil ». Après une première visite, elle s'ouvre sans réseau (sauf l'assistant).

### Mettre en ligne avec Vercel (une seule fois)

1. Sur [vercel.com](https://vercel.com), se connecter avec le compte GitHub **propriétaire du dépôt**.
2. **Add New… → Project**, choisir le dépôt `DocPote`, puis **Import**.
3. Ne rien changer (« Framework Preset : Other », pas de commande de build : `vercel.json` s'en occupe) et cliquer **Deploy**.
4. Le lien `https://….vercel.app` est l'application. Chaque pull request reçoit ensuite son lien d'aperçu automatiquement.

Sur l'offre gratuite (Hobby), le dépôt doit être **public** pour que les changements proposés par d'autres comptes (Aurélie, Claude) soient déployés.

## Demander un changement à Claude

1. Ouvrez l'onglet **Issues**, puis **New issue** et choisissez **Demande pour Claude**.
2. Décrivez ce que vous voulez, en français, avec vos mots. Vous pouvez dicter avec le micro du téléphone.
3. Une fois par jour, Claude lit les nouvelles demandes, fait le changement et répond dans l'issue avec un lien pour tester.
4. Testez sur votre téléphone. Si c'est bon, validez la pull request (**Merge**). Sinon, répondez dans l'issue : Claude reprendra au passage suivant.

Les étiquettes : `pour-claude` (demande à traiter), `en-cours` (Claude travaille dessus), `question` (Claude a besoin d'une précision), `fait` (terminé).

## Pour les développeurs

Site statique sans compilation : `index.html`, `css/`, `js/`, `tess/` (données françaises de Tesseract), `audio/`, `icons/`, `manifest.webmanifest` et `sw.js` (application installable). `vercel.json` sert le dossier tel quel. Le nom de l'application se change à un seul endroit : `APP_NAME` dans `js/app.js`.

Tests (hors ligne) :

```bash
npm ci
python3 tests/test_app.py
```

Voir `CLAUDE.md` pour les règles du projet.
