"""Compress supplied concept artwork for the web; preserve full images and aspect ratios."""
from pathlib import Path
from PIL import Image
import json
root = Path(__file__).resolve().parent
source = root.parent / 'outputs' / 'arviga_site_assets'
target = root / 'dist' / 'assets' / 'products'
target.mkdir(parents=True, exist_ok=True)
converted = 0
for p in source.glob('*__*.png'):
    dest = target / (p.stem + '.webp')
    if not dest.exists() or p.stat().st_mtime > dest.stat().st_mtime:
        with Image.open(p) as im:
            im.convert('RGB').save(dest, 'WEBP', quality=84, method=6)
        converted += 1
print(f'{converted} updated, {len(list(target.glob("*.webp")))} catalogue image sheets ready.')
service_source = root.parent / 'outputs' / 'arviga_service_assets'
service_target = root / 'dist' / 'assets' / 'services'
service_target.mkdir(parents=True, exist_ok=True)
for p in service_source.glob('*.png'):
    dest = service_target / (p.stem + '.webp')
    if not dest.exists() or p.stat().st_mtime > dest.stat().st_mtime:
        with Image.open(p) as im:
            im.thumbnail((1536, 1024))
            im.convert('RGB').save(dest, 'WEBP', quality=85, method=6)
print(f'{len(list(service_target.glob("*.webp")))} service illustrations ready.')
for name in ['hero', 'engineering']:
    p=source/(name+'.png')
    dest=root/'dist'/'assets'/(name+'.webp')
    if p.exists() and (not dest.exists() or p.stat().st_mtime>dest.stat().st_mtime):
        with Image.open(p) as im:
            im.convert('RGB').save(dest,'WEBP',quality=86,method=6)
logo=root/'dist'/'assets'/'arviga-logo.png'
if logo.exists():
    dest=logo.with_suffix('.webp')
    if not dest.exists():
        with Image.open(logo) as im:
            im.thumbnail((708,354))
            im.convert('RGB').save(dest,'WEBP',quality=90,method=6)
