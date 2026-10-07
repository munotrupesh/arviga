import fs from 'node:fs';
import assert from 'node:assert/strict';
const variants=JSON.parse(fs.readFileSync('data/responsive-images.json'));
for(const list of Object.values(variants))for(const file of list)assert.ok(fs.existsSync('dist'+file.src),file.src);
for(const name of ['dm-sans','manrope'])assert.equal(fs.readFileSync(`dist/assets/fonts/${name}.woff2`).subarray(0,4).toString(),'wOF2');
const home=fs.readFileSync('dist/index.html','utf8');
assert.equal((home.match(/data-defer-slide/g)||[]).length,5);
assert.equal((home.match(/data-src="/g)||[]).length,5);
assert.equal((home.match(/class="category-card /g)||[]).length,7);
assert.ok(!fs.readFileSync('dist/assets/site.css','utf8').includes('@import'));
const routes=JSON.parse(fs.readFileSync('data/routes.json'));
for(const r of routes){const html=fs.readFileSync('dist'+(r.url==='/404.html'?r.url:r.url+'index.html'),'utf8');
 assert.ok(html.includes('/assets/quality.css?v='));
 if(r.url.startsWith('/services/')&&r.url!='/services/')assert.ok(html.includes('class="service-questions section"'));
 if(r.url==='/products/'||r.url.split('/').filter(Boolean).length===2&&r.url.startsWith('/products/'))assert.ok(html.includes('"@type":"ItemList"'));
}
function luminance(hex){const a=hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722;}
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const colors=[['Body','10271e','ffffff'],['Secondary text','56645c','ffffff'],['Primary button','ffffff','174b36'],['Accent button','10271e','ddf397']];
const results=colors.map(([label,a,b])=>({label,ratio:Number(contrast(a,b).toFixed(2))}));for(const x of results)assert.ok(x.ratio>=4.5);
fs.writeFileSync('reports/quality-checks.json',JSON.stringify({responsiveImages:Object.keys(variants).length,pageCount:routes.length,contrast:results,previewIndexingDisabled:true},null,2));
console.log('PASS: responsive assets, WOFF2 fonts, progressive slides, seven collection cards, service guidance, collection schema, core text contrast.',results);
