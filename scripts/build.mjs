import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {archetypes} from '../data.js';
const base='https://olesyalevytskaua-ops.github.io/midlife-crisis-quiz/';
await fs.rm('dist',{recursive:true,force:true});await fs.mkdir('dist',{recursive:true});
for(const f of ['index.html','app.js','data.js','style.css','.nojekyll'])await fs.copyFile(f,`dist/${f}`);
await fs.cp('assets','dist/assets',{recursive:true});
const revision=createHash('sha256').update((await Promise.all(['app.js','data.js','style.css'].map(f=>fs.readFile(f,'utf8')))).join('\n')).digest('hex').slice(0,12);
const template=(await fs.readFile('index.html','utf8')).replace('src="app.js"',`src="app.js?v=${revision}"`).replace('href="style.css"',`href="style.css?v=${revision}"`);
await fs.writeFile('dist/index.html',template);
await fs.writeFile('dist/app.js',(await fs.readFile('app.js','utf8')).replace("from './data.js'",`from './data.js?v=${revision}'`));
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const t of archetypes){
 const url=base+`results/${t.id}/`;
 let page=template.replaceAll('href="assets/','href="../../assets/').replace('href="style.css','href="../../style.css').replace('src="app.js','src="../../app.js').replace('href="./"','href="../../"');
 page=page.replace(/<title>.*?<\/title>/,`<title>${t.name} · Which Midlife Crisis Are You?</title>`)
 .replace(/(<meta name="description" content=")[^"]*/,`$1${esc(t.tagline+' '+t.description)}`)
 .replace(/(<link rel="canonical" href=")[^"]*/,`$1${url}`)
 .replace(/(<meta property="og:url" content=")[^"]*/,`$1${url}`)
 .replace(/(<meta property="og:title" content=")[^"]*/,`$1${t.name} · Which Midlife Crisis Are You?`)
 .replace(/(<meta property="og:description" content=")[^"]*/,`$1${esc(t.tagline)}`)
 .replaceAll('assets/social/cover.jpg',`assets/social/${t.id}.jpg`)
 .replace('<main id="main" tabindex="-1"></main>',`<main id="main" tabindex="-1"><section class="result"><span class="eyebrow">Meet this archetype</span><h1>${t.name}</h1><p>${esc(t.tagline)}</p><img src="../../${t.image}" alt="${t.name} character illustration" width="500" height="500" style="max-width:100%;height:auto"><p>${esc(t.description)}</p><h2>Your gentle reminder</h2><p>${esc(t.balance)}</p><h2>Try this next</h2><p>${esc(t.tryThis)}</p><h2>For friends and family</h2><p>${esc(t.friends)}</p><a class="btn" href="../../">Take the quiz</a></section></main>`);
 await fs.mkdir(`dist/results/${t.id}`,{recursive:true});await fs.writeFile(`dist/results/${t.id}/index.html`,page);
}
await fs.writeFile('dist/404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>A little detour</title><body style="font-family:Georgia;background:#fff9ee;color:#153c45;padding:10vw"><h1>A little detour.</h1><p>This page is not part of the plan. Your next chapter is still waiting.</p><a href="'+base+'">Return to the quiz →</a></body></html>');
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[base,...archetypes.map(t=>base+`results/${t.id}/`)].map(url=>`<url><loc>${url}</loc></url>`).join('')+'</urlset>');
console.log('Built landing page, 17 static result pages and 404 page.');
