import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const out=path.resolve('dist'),routes=JSON.parse(fs.readFileSync('data/routes.json','utf8'));
const cats=JSON.parse(fs.readFileSync('data/catalogue.json','utf8'));
const strict=process.argv.includes('--complete');
const failures=[],titles=new Set(),descriptions=new Set();let imageRefs=0;
for(const route of routes){const file=route.url==='/404.html'?path.join(out,'404.html'):path.join(out,route.url,'index.html');const html=fs.readFileSync(file,'utf8');const fail=s=>failures.push(`${route.url}: ${s}`);
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1],desc=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
 if(!title||titles.has(title))fail('Missing or duplicate title');titles.add(title);
 if(!desc||descriptions.has(desc))fail('Missing or duplicate description');descriptions.add(desc);
 if((html.match(/<h1[ >]/g)||[]).length!==1)fail('Expected one H1');
 if(!html.includes('rel="canonical"'))fail('Missing canonical URL');
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{JSON.parse(match[1]);}catch{fail('Invalid structured data');}}
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const u=match[1];const local=path.join(out,decodeURIComponent(u),u.endsWith('/')?'index.html':'');if(!fs.existsSync(local))fail('Missing link or asset '+u);if(/\.(webp|png)$/.test(u))imageRefs++;}
 if(strict&&html.includes('product-photo pending'))fail('Missing product imagery');
 if(html.includes('data-product=')){if((html.match(/data-view="[0-3]"/g)||[]).length!==4)fail('Expected four gallery views');if(!html.includes('EXAMPLE PRICE'))fail('Example price label missing');if(html.includes('"offers":'))fail('Concept price must not be in Offer structured data');}
}
assert.equal(cats.reduce((n,c)=>n+c.products.length,0),74);
assert.equal(routes.filter(r=>r.url.startsWith('/products/')&&r.url.split('/').filter(Boolean).length===3).length,74);
assert.equal(routes.filter(r=>r.url.startsWith('/services/')&&r.url.split('/').filter(Boolean).length===2).length,9);
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`PASS: ${routes.length} pages; 74 product pages; 9 service pages; unique metadata; structured data; local links; ${imageRefs} image references; four gallery controls per product.`);
if(!strict)console.log('Partial-image check. Run with --complete after all catalogue imagery is available.');
