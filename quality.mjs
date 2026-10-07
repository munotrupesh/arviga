import fs from 'node:fs';
const responsive=JSON.parse(fs.readFileSync(new URL('./data/responsive-images.json',import.meta.url),'utf8'));
const guidance=JSON.parse(fs.readFileSync(new URL('./data/service-guidance.json',import.meta.url),'utf8'));
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function responsiveImages(html){
 return html.replace(/<img\b[^>]*>/g,tag=>{
  const src=tag.match(/\bsrc="([^"]+)"/)?.[1],variants=responsive[src];
  if(!variants||tag.includes('srcset='))return tag;
  const product=src.includes('/products/'),hero=src==='/assets/hero.webp';
  const sizes=tag.includes('data-defer-slide')?(product?'200vw':'100vw'):product?(tag.includes('fetchpriority="high"')?'(max-width: 900px) 200vw, 110vw':'(max-width: 650px) 100vw, (max-width: 1100px) 90vw, 60vw'):hero?'100vw':'(max-width: 900px) 100vw, 50vw';
  let result=tag.replace('>',' srcset="'+variants.map(v=>`${v.src} ${v.width}w`).join(', ')+'" sizes="'+sizes+'">');
  if(result.includes('data-defer-slide'))result=result.replace(' src="',' data-src="').replace(' srcset="',' data-srcset="').replace('<img ','<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" ');
  return result;
 });
}
export function improveContent(url,body){
 const slug=url.split('/').filter(Boolean).at(-1),info=guidance[slug];
 if(info){
  const section=`<section class="service-planning section"><div class="planning-intro"><span class="eyebrow">PLAN YOUR REQUIREMENT</span><h2>A useful brief.<br><em>A clearer next step.</em></h2><p>${escape(info.applications)}</p></div><div class="planning-details"><article><h3>Decisions to make early</h3><p>${escape(info.decision)}</p></article><article><h3>What to agree before work begins</h3><p>${escape(info.outputs)}</p></article></div></section><section class="service-questions section"><div><span class="eyebrow">BEFORE YOU ENQUIRE</span><h2>Questions,<br><em>answered.</em></h2></div><div>${info.questions.map(([q,a])=>`<details><summary>${escape(q)}<span aria-hidden="true">+</span></summary><p>${escape(a)}</p></details>`).join('')}</div></section>`;
  body=body.replace('<section class="service-next section">',section+'<section class="service-next section">');
 }
 if(url.startsWith('/products/')&&url.split('/').filter(Boolean).length===3){
  const name=body.match(/<h1>(.*?)<\/h1>/)?.[1]||'this product';
  body=body.replace('Designed around<br><em>everyday purpose.</em>',`About<br><em>${name.toLowerCase()}.</em>`);
  body=body.replace('<span class="eyebrow blue">THE PRODUCT</span>','<span class="eyebrow blue">FUNCTION, FIT & FINISH</span>');
 }
 return body;
}
export function collectionSchema(url,cats,origin){
 const c=cats.find(x=>url===`/products/${x.slug}/`);
 const entries=url==='/products/'?cats.map(x=>({name:x.name,url:`/products/${x.slug}/`})):(c?c.products.map(p=>({name:p.name,url:`/products/${c.slug}/${p.slug}/`})):[]);
 return entries.length?[{'@context':'https://schema.org','@type':'ItemList',name:c?`${c.name} furniture`:'ARVIGA furniture collections',itemListElement:entries.map((x,i)=>({'@type':'ListItem',position:i+1,name:x.name,url:new URL(x.url,origin).href}))}]:[];
}
