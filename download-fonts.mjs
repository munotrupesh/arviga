import fs from 'node:fs';
fs.mkdirSync('dist/assets/fonts',{recursive:true});
for(const [family,slug] of [['DM Sans','dm-sans'],['Manrope','manrope']]){
 const url=`https://fonts.googleapis.com/css2?family=${family.replaceAll(' ','+')}:wght@400..800&display=swap`;
 const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}});
 if(!r.ok)throw Error(`Font stylesheet ${r.status}`);
 const css=await r.text();const latin=css.split('/* latin */').at(-1);const source=latin.match(/url\((https:[^)]+)\)/)?.[1];
 if(!source)throw Error('No Latin font found');
 const font=await fetch(source);if(!font.ok)throw Error('Font download failed');
 const data=Buffer.from(await font.arrayBuffer());if(data.subarray(0,4).toString()!=='wOF2')throw Error('Expected WOFF2 font');fs.writeFileSync(`dist/assets/fonts/${slug}.woff2`,data);
 const license=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${slug.replaceAll('-','')}/OFL.txt`);
 if(!license.ok)throw Error('Font license download failed');
 fs.writeFileSync(`dist/assets/fonts/${slug}-OFL.txt`,await license.text());
 console.log(`${family}: ${data.length} bytes, license saved`);
}
