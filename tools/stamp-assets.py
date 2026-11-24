#!/usr/bin/env python3
"""Stamp /assets/css/styles.css and /assets/js/main.js references in every page
with a short content hash (?v=...), so they can be cached for a year (_headers)
and still update the moment they change. Run after editing CSS or JS."""
import hashlib, pathlib, re, sys

# Default: the repo root (keeps committed pages in sync). With an argument: that folder (the build output).
root = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parent.parent
assets = ['assets/css/styles.css', 'assets/js/main.js']
for rel in assets:
    h = hashlib.sha256((root / rel).read_bytes()).hexdigest()[:10]
    pat = re.compile(r'/' + re.escape(rel) + r'(\?v=[0-9a-f]+)?"')
    for page in root.glob('*.html'):
        s = page.read_text()
        n = pat.sub(f'/{rel}?v={h}"', s)
        if n != s:
            page.write_text(n)
    print(rel, h)
