import {questions,archetypes,rank,resultFromPath} from './data.js?v=c56fdc3bd58f';
const main=document.querySelector('main');
const base=new URL('.',import.meta.url);
const asset=p=>new URL(p,base).href;
const link=t=>new URL(`results/${t.id}/`,base).href;
let answers=[],step=0,lastRank=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function focus(){main.focus();window.scrollTo({top:0,behavior:'instant'});}
function navigate(view,index=0,type=null){
 const url=view==='quiz'?new URL(`?q=${index+1}`,base):view==='result'?link(type):base;
 history.pushState({view,step:index,answers:[...answers],personal:!!lastRank},'',url);
 step=index; render(view,type);focus();
}
function galleryCard(t){return `<a class="card" href="${link(t)}" data-type="${t.id}"><img src="${asset(t.image)}" alt="${esc(t.name)} illustration" loading="lazy" width="600" height="600"><h3>${t.name} <span aria-hidden="true">↗</span></h3><p>${esc(t.tagline)}</p></a>`;}
function render(view,type){
 if(view==='quiz') return renderQuestion();
 if(view==='result'&&type) return renderResult(type);
 document.title='Which Midlife Crisis Are You?';
 main.innerHTML=`<section class="hero"><div class="hero-copy"><span class="eyebrow">Your next chapter starts here</span><h1>Which midlife<br><em>crisis</em> are you?</h1><p class="intro">Same woman. Different hobbies. Bigger budget.<br>Find out what you might need next — and which wonderfully specific hobby comes with it.</p><div class="facts"><span>✦ 12 thoughtful questions</span><span>✦ 17 archetypes</span><span>✦ 2–3 minutes</span></div><button class="btn" id="start">Find my plot twist <span aria-hidden="true">→</span></button><p class="micro">No age limit. No wrong answers. No actual crisis required.</p></div><div class="hero-art"><img src="${asset('assets/characters/salsa-beginner.webp')}" alt="A joyful woman dancing in a flowing orange and red dress" width="1024" height="1024" fetchpriority="high"><span class="art-label">A new hobby?<br>In this economy?</span></div></section><div class="ticker">A little courage <span>✳</span> A little curiosity <span>✳</span> A whole new you</div>`;
 document.querySelector('#start').onclick=()=>{answers=[];lastRank=null;navigate('quiz');};
}
function renderQuestion(){
 const q=questions[step];document.title=`Question ${step+1} · Which Midlife Crisis Are You?`;
 main.innerHTML=`<section class="quiz"><div class="quiz-top"><span>Question ${step+1} of ${questions.length}</span><button class="link-button" id="quit">Start over</button></div><div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="12" aria-valuenow="${step}"><span style="width:${step/questions.length*100}%"></span></div><span class="eyebrow">A moment of honesty</span><h1 id="question-title">${esc(q.title)}</h1><p class="question-note">${esc(q.note||'Pick the answer closest to how you feel now.')}</p><fieldset aria-labelledby="question-title"><legend class="sr-only">Choose one answer</legend>${q.options.map((o,i)=>`<label class="option"><input type="radio" name="answer" value="${i}" ${answers[step]===i?'checked':''}><span>${esc(o.text)}</span></label>`).join('')}</fieldset><div class="quiz-nav"><button class="link-button" id="back">← ${step?'Back':'Home'}</button><button class="btn" id="next" ${answers[step]===undefined?'disabled':''}>${step===11?'Meet my archetype':'Next question'} <span aria-hidden="true">→</span></button></div><p class="micro">Your answers stay in this tab. Going back keeps your choices.</p></section>`;
 main.querySelectorAll('input').forEach(input=>input.onchange=()=>{answers[step]=Number(input.value);document.querySelector('#next').disabled=false;history.replaceState({view:'quiz',step,answers:[...answers]},'',location.href);});
 document.querySelector('#back').onclick=()=>step?navigate('quiz',step-1):navigate('home');
 document.querySelector('#quit').onclick=()=>{answers=[];lastRank=null;navigate('quiz',0);};
 document.querySelector('#next').onclick=()=>{if(answers[step]===undefined)return;if(step===11){lastRank=rank(answers);navigate('result',0,lastRank[0].type);}else navigate('quiz',step+1);};
}
function renderResult(t){
 const personal=lastRank?.[0].type.id===t.id;
 const canExplore=!!lastRank&&answers.length===questions.length;
 document.title=`${t.name} · Which Midlife Crisis Are You?`;
 main.innerHTML=`<section class="result"><div class="result-grid"><div class="result-art"><img src="${asset(t.image)}" alt="${esc(t.name)} character illustration" width="1024" height="1024" fetchpriority="high"></div><div><span class="eyebrow">${personal?'Your next chapter looks like…':'Meet this archetype'}</span><h1>${t.name}</h1><p class="tagline">${esc(t.tagline)}</p><p class="description">${esc(t.description)}</p><p class="joke">${esc(t.joke)}</p><div class="share-actions"><button class="btn" id="share">Share this archetype ↗</button><button class="btn secondary" id="copy">Copy link</button></div><div class="status" role="status" aria-live="polite" id="status"></div></div></div><div class="result-details"><article class="detail"><span class="eyebrow">A little balance</span><h2>Your gentle reminder</h2><p>${esc(t.balance)}</p></article><article class="detail"><span class="eyebrow">Start small</span><h2>Try this next</h2><p>${esc(t.tryThis)}</p></article><article class="detail"><span class="eyebrow">For your people</span><h2>How friends & family can help</h2><p>${esc(t.friends)}</p></article></div><p class="result-disclaimer">A playful reflection on what you might need, not a diagnosis or a recommendation to make a major life change. Shared links show only this archetype, never your answers.</p><div class="restart-wrap"><button class="btn secondary" id="restart">${personal?'Take the quiz again':'Find my own archetype'} →</button> <a class="link-button" href="${base}" id="home">Back to quiz home</a>${personal?' <button class="link-button" id="edit">Review my answers</button>':''}${canExplore?' <button class="link-button" id="explore" aria-expanded="false" aria-controls="other-archetypes">Explore other plot twists</button>':''}</div></section>${canExplore?'<section class="gallery" id="other-archetypes" aria-labelledby="other-title" hidden></section>':''}`;
 document.querySelector('#restart').onclick=()=>{answers=[];lastRank=null;navigate('quiz');};
 document.querySelector('#home').onclick=e=>{e.preventDefault();lastRank=null;navigate('home');};
 if(personal)document.querySelector('#edit').onclick=()=>navigate('quiz',11);
 if(canExplore)document.querySelector('#explore').onclick=()=>{
  const gallery=document.querySelector('#other-archetypes');
  const expanded=gallery.hidden;
  if(expanded&&!gallery.innerHTML){
   gallery.innerHTML=`<div class="section-top"><div><span class="eyebrow">Meet your possible plot twists</span><h2 id="other-title">There is more than one side to you.</h2></div><p>You have met your match. If you are curious, explore the other characters at your own pace.</p></div><div class="cards">${archetypes.filter(a=>a.id!==t.id).map(galleryCard).join('')}</div>`;
   gallery.querySelectorAll('[data-type]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate('result',0,archetypes.find(type=>type.id===a.dataset.type));}));
  }
  gallery.hidden=!expanded;document.querySelector('#explore').setAttribute('aria-expanded',String(expanded));
  if(expanded){gallery.tabIndex=-1;gallery.focus({preventScroll:true});gallery.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
 };
 document.querySelector('#copy').onclick=()=>copyLink(t);
 document.querySelector('#share').onclick=async()=>{if(navigator.share){try{await navigator.share({title:`${t.name} · Which Midlife Crisis Are You?`,text:t.tagline,url:link(t)});document.querySelector('#status').textContent='Shared.';}catch(e){if(e.name!=='AbortError')await copyLink(t);}}else await copyLink(t);};
}
async function copyLink(t){const status=document.querySelector('#status');try{await navigator.clipboard.writeText(link(t));status.textContent='Link copied. Send it to your favourite co-conspirator.';}catch{status.innerHTML=`<label>Copy this link:<input class="share-fallback" readonly value="${esc(link(t))}"></label>`;status.querySelector('input').select();}}
window.addEventListener('popstate',e=>{const t=resultFromPath(location.pathname);if(e.state?.answers)answers=[...e.state.answers];if(e.state?.view==='quiz'){answers=e.state.answers||[];step=Math.min(e.state.step||0,answers.length,11);render('quiz');}else if(t){lastRank=e.state?.personal&&answers.length===12?rank(answers):null;render('result',t);}else{lastRank=null;render('home');}focus();});
document.querySelector('.brand').href=base;
document.querySelector('.brand').onclick=e=>{e.preventDefault();lastRank=null;navigate('home');};
const dialog=document.querySelector('dialog');
document.querySelector('#method-link').onclick=e=>{e.preventDefault();dialog.showModal();};
dialog.querySelector('button').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const initialType=resultFromPath(location.pathname);if(!initialType&&location.search)history.replaceState(null,'',base);render(initialType?'result':'home',initialType);
