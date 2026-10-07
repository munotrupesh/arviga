"""Create smaller responsive copies without changing image content or geometry."""
from pathlib import Path
from PIL import Image
import json
root=Path(__file__).parent
assets=root/'dist'/'assets'
dest=assets/'responsive'
dest.mkdir(exist_ok=True)
sources=[assets/'hero.webp',assets/'engineering.webp',*list((assets/'products').glob('*.webp')),*list((assets/'services').glob('*.webp'))]
manifest={}
for source in sources:
    variants=[]
    with Image.open(source) as image:
        for width in (640,960):
            if width>=image.width:continue
            name=source.relative_to(assets).as_posix().replace('/','--').replace('.webp',f'-{width}.webp')
            target=dest/name
            resized=image.copy()
            resized.thumbnail((width,10000))
            resized.convert('RGB').save(target,'WEBP',quality=80,method=6)
            variants.append({'src':'/assets/responsive/'+name,'width':resized.width,'bytes':target.stat().st_size})
        variants.append({'src':'/assets/'+source.relative_to(assets).as_posix(),'width':image.width,'bytes':source.stat().st_size})
    manifest['/assets/'+source.relative_to(assets).as_posix()]=variants
(root/'data'/'responsive-images.json').write_text(json.dumps(manifest,indent=2))
products=[v for k,v in manifest.items() if '/products/' in k]
report={'images':len(manifest),'original_catalogue_bytes':sum(v[-1]['bytes'] for v in products),'640_catalogue_bytes':sum(v[0]['bytes'] for v in products)}
(root/'reports').mkdir(exist_ok=True)
(root/'reports'/'image-savings.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
