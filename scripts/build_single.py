"""Assemble index.html + css/ + js/ en un seul fichier HTML (pour l'aperçu hébergé sur claude.ai).
Usage : python3 scripts/build_single.py [sortie]   (par défaut build/docpote.html, ignoré par git)
Le fichier tess/fra-lang.wasm doit être publié à côté, au chemin tess/fra-lang.wasm."""
import pathlib, re, sys
R = pathlib.Path(__file__).resolve().parent.parent
html = (R / "index.html").read_text()
html = html.replace('<link rel="stylesheet" href="css/style.css">', "<style>\n" + (R / "css/style.css").read_text() + "\n</style>")
html = re.sub(r'<script src="(js/[a-z]+\.js)"></script>', lambda m: "<script>\n" + (R / m.group(1)).read_text() + "\n</script>", html)
html = "\n".join(l for l in html.split("\n") if "data-pwa" not in l)  # pas de manifeste ni de service worker dans la copie claude.ai
body = html[html.index("<title>"):html.index("</head>")] + html[html.index("<body>") + 6:html.index("</body>")]
body = body.replace("<title>", '<meta name="claude:viewport-fit-sides" content="cover">\n<title>', 1) if False else body
out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else R / "build/docpote.html"
out.parent.mkdir(parents=True, exist_ok=True); out.write_text(body); print(out, len(body))
