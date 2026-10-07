import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('dist/assets/site.js','utf8').split('function closeMenu()')[0];
function node(dataset={}){return {dataset,events:{},attrs:{},classList:{toggle(){}},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,fn){this.events[k]=fn;},querySelector(){return this.image;},image:{dataset:{src:'/test.webp',srcset:'/test.webp 640w'},decode:()=>Promise.resolve()}};}
function scenario(reduced=false){
 const slides=Array.from({length:6},(_,i)=>node({label:`Slide ${i+1}`,title:`Title ${i+1}`,href:`/slide-${i+1}`}));
 const nodes=Object.fromEntries(['[data-slide-pause]','.showcase-story','[data-slide-label]','[data-slide-title]','.slide-count','[data-slide-next]','[data-slide-prev]'].map(x=>[x,node()]));
 const root=node();root.querySelector=x=>nodes[x];root.querySelectorAll=()=>slides;
 const document={hidden:false,events:{},querySelector:x=>x==='[data-carousel]'?root:null,addEventListener(k,fn){this.events[k]=fn;}};
 const timers=new Map();let id=0;
 vm.runInNewContext(source,{document,matchMedia:()=>({matches:reduced,addEventListener(){}}),window:{addEventListener(){}},setTimeout(){},setInterval(fn,ms){const n=++id;timers.set(n,{fn,ms});return n;},clearInterval(n){timers.delete(n);},Promise});
 return {slides,nodes,timers,document};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
const s=scenario();assert.equal(s.timers.size,1);assert.equal([...s.timers.values()][0].ms,3000);
[...s.timers.values()][0].fn();await flush();assert.equal(s.nodes['.slide-count'].textContent,'02 / 06');
s.nodes['[data-slide-pause]'].events.click();assert.equal(s.timers.size,0);
s.nodes['[data-slide-prev]'].events.click();await flush();assert.equal(s.nodes['.slide-count'].textContent,'01 / 06');
s.nodes['[data-slide-prev]'].events.click();await flush();assert.equal(s.nodes['.slide-count'].textContent,'06 / 06');
s.nodes['[data-slide-next]'].events.click();await flush();assert.equal(s.nodes['.slide-count'].textContent,'01 / 06');assert.equal(s.timers.size,0);
s.nodes['[data-slide-pause]'].events.click();assert.equal(s.timers.size,1);
s.document.hidden=true;s.document.events.visibilitychange();assert.equal(s.timers.size,0);
const reduced=scenario(true);assert.equal(reduced.timers.size,0);reduced.nodes['[data-slide-next]'].events.click();await flush();assert.equal(reduced.nodes['.slide-count'].textContent,'02 / 06');
console.log('PASS: 3000ms autoplay, pause/play, arrows, wraparound, hidden-tab suspension, reduced-motion manual navigation.');
