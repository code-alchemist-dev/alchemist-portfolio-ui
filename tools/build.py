#!/usr/bin/env python3
"""Build the deployable site into dist/: copy only the public files, then stamp
the CSS/JS URLs with a content hash (see stamp-assets.py). Netlify publishes
dist/ only, so repo files (README, LICENSE, tools, config) are never served."""
import pathlib, shutil, subprocess, sys

root = pathlib.Path(__file__).resolve().parent.parent
dist = root / 'dist'
PUBLIC = ['assets', 'robots.txt', 'sitemap.xml', 'site.webmanifest', '_headers']

if dist.exists():
    shutil.rmtree(dist)
dist.mkdir()
for page in root.glob('*.html'):
    shutil.copy2(page, dist / page.name)
for name in PUBLIC:
    src = root / name
    (shutil.copytree if src.is_dir() else shutil.copy2)(src, dist / name)
subprocess.run([sys.executable, str(root / 'tools' / 'stamp-assets.py'), str(dist)], check=True)
print('built', sorted(p.name for p in dist.iterdir()))
