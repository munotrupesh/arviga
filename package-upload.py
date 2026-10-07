"""Package public static files without modifying the Cloudflare preview build."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import re, sys
from urllib.parse import urlparse

root = Path(__file__).resolve().parent
origin = 'https://arviga-preview.eventcart.workers.dev'
domain = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else ''
if domain:
    parsed = urlparse(domain)
    assert parsed.scheme == 'https' and parsed.netloc and parsed.path == '', 'Supply an HTTPS domain without a path'
output = root.parent / 'outputs' / 'ARVIGA-Live-Website.zip'
output.parent.mkdir(parents=True, exist_ok=True)
instructions = '''ARVIGA WEBSITE - SERVER UPLOAD

1. Upload this ZIP using your hosting file manager, then extract its CONTENTS
   into the domain web root (usually public_html, www, or htdocs).
   index.html and the assets folder must sit directly inside that web root.
   Use the domain root, not a subfolder. Back up an existing site before replacing it.
2. No Node.js, database, npm install or build command is needed on the server.
3. Enable HTTPS through your hosting provider.
4. Open the home page, /about/, /services/ and a product page to check the upload.
5. Apache: the included .htaccess sets index.html and the custom 404 page.
   Nginx/other servers: set index.html as the directory index, serve existing
   directories, and configure /404.html as the error page with HTTP status 404.
   _headers contains optional static-host security/cache headers; most ordinary
   servers ignore it and need equivalent settings in their hosting configuration.

CURRENT CONTENT
- Example prices remain clearly labelled; they are not confirmed selling prices.
- Product and service imagery remains illustrative, pending your replacement photos.
- Contact details are pending. The enquiry form DOWNLOADS a brief; it does not
  send email or save an enquiry to a server. No payment or checkout is connected.
- This archive contains website assets only, never hosting credentials or source tools.
- Delete this instruction file and the uploaded ZIP from the web root after setup.

SEARCH SETTINGS
'''
instructions += (f'Prepared for {domain}. Canonical URLs and sitemap use this domain.\n'
                 if domain else 'Final domain was not supplied. Preview-domain canonical and social URL tags\n'
                 'have been removed, and the preview-domain sitemap has been omitted.\n'
                 'The site can be uploaded now. Supply the final domain to generate its\n'
                 'canonical URLs and sitemap before completing SEO setup.\n')
instructions += 'Public pages allow indexing; the 404 page stays noindex. Indexing is not guaranteed.\n'
count = 0
with ZipFile(output, 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for file in sorted((root / 'dist').rglob('*')):
        if not file.is_file(): continue
        name = file.relative_to(root / 'dist').as_posix()
        if name == 'sitemap.xml' and not domain: continue
        data = file.read_bytes()
        if file.suffix == '.html':
            content = data.decode('utf-8')
            if name != '404.html':
                content = content.replace('content="noindex,nofollow"', 'content="index,follow,max-image-preview:large"')
            if not domain:
                content = re.sub(r'<link rel="canonical"[^>]*>', '', content)
                content = re.sub(r'<meta property="og:url"[^>]*>', '', content)
            content = content.replace(origin, domain)
            assert origin not in content
            data = content.encode('utf-8')
        elif name == 'robots.txt':
            data = ('User-agent: *\nAllow: /\n' + (f'Sitemap: {domain}/sitemap.xml\n' if domain else '')).encode()
        elif name == 'sitemap.xml':
            data = data.replace(origin.encode(), domain.encode())
        archive.writestr(name, data)
        count += 1
    archive.writestr('UPLOAD-INSTRUCTIONS.txt', instructions)
    archive.writestr('.htaccess', 'DirectoryIndex index.html\nErrorDocument 404 /404.html\n')
with ZipFile(output) as archive:
    assert archive.testzip() is None
    assert 'index.html' in archive.namelist()
    assert len([n for n in archive.namelist() if n.endswith('.html')]) == 96
    assert 'index,follow' in archive.read('index.html').decode()
    assert 'noindex,nofollow' in archive.read('404.html').decode()
print(f'Created: {output}\nWebsite files: {count}\nSize: {output.stat().st_size / 1024 / 1024:.1f} MB\nDomain: {domain or "portable; domain SEO setup pending"}\nZIP integrity: PASS')
