"""Build a single-file version of the LP with every image and font embedded as a data URI.

Usage (from the omni-dental-mcmurray/ folder):
    python3 tools/build_standalone.py
Writes emergency-dentist-mcmurray.standalone.html next to the source page.
"""
import base64, os, re

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(HERE, "emergency-dentist-mcmurray.html")
OUT = os.path.join(HERE, "emergency-dentist-mcmurray.standalone.html")
MIME = {".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff"}

def data_uri(rel):
    path = os.path.join(HERE, rel)
    with open(path, "rb") as f:
        return "data:%s;base64,%s" % (MIME[os.path.splitext(rel)[1]], base64.b64encode(f.read()).decode())

html = open(SRC, encoding="utf-8").read()
# Font preloads are pointless once fonts are inline.
html = re.sub(r'<link rel="preload" href="assets/fonts/[^"]+"[^>]*>\n?', "", html)
# Responsive srcset/sizes point at separate files; keep the single (largest) src instead.
html = re.sub(r'\s+srcset="[^"]*assets/img/[^"]*"', "", html)
html = re.sub(r'\s+sizes="[^"]*"', "", html)
# Inline every remaining relative asset reference.
html = re.sub(r'assets/(?:img|fonts)/[A-Za-z0-9._-]+', lambda m: data_uri(m.group(0)), html)
assert "assets/" not in html, "unresolved asset reference"
open(OUT, "w", encoding="utf-8").write(html)
print("wrote %s (%d KB)" % (os.path.basename(OUT), os.path.getsize(OUT) // 1024))
