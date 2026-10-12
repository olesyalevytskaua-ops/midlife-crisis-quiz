import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {questions,archetypes,rank,vector,resultFromPath} from '../data.js';
test('exactly 17 unique archetypes, each with its own final illustration and complete copy',()=>{
 assert.equal(archetypes.length,17);assert.equal(new Set(archetypes.map(t=>t.id)).size,17);assert.equal(new Set(archetypes.map(t=>t.image)).size,17);
 for(const t of archetypes){assert.ok(fs.existsSync(t.image),t.id);for(const f of ['description','balance','tryThis','friends','joke'])assert.ok(t[f].length>20,`${t.id}:${f}`);}
});
test('12 psychological questions have valid equal-weight six-axis responses',()=>{assert.equal(questions.length,12);assert.equal(new Set(questions.map(q=>q.id)).size,12);for(const q of questions){assert.equal(q.options.length,4);for(const o of q.options){assert.equal(o.v.length,6);assert.ok(o.v.every(n=>Number.isFinite(n)&&n>=-2&&n<=2));}}});
test('every archetype is reachable by completing the quiz, not just by a direct URL',()=>{for(const t of archetypes){assert.equal(t.signature.length,12);assert.equal(rank(t.signature)[0].type.id,t.id,`unreachable: ${t.id}`);}});
test('scoring rejects incomplete, invalid or noninteger responses',()=>{for(const a of [[],Array(12).fill(4),Array(12).fill(-1),Array(12).fill(1.5)])assert.throws(()=>rank(a));});
test('rank is deterministic, finite and complete across 10,000 diverse answer paths',()=>{let seed=917;for(let i=0;i<10000;i++){const a=Array.from({length:12},()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed>>>30;});const r=rank(a);assert.equal(r.length,17);assert.ok(r.every(t=>Number.isFinite(t.distance)));assert.deepEqual(r,rank(a));assert.ok(vector(a).every(n=>n>=-2&&n<=2));}});
test('result URLs map only to known archetypes',()=>{for(const t of archetypes){assert.equal(resultFromPath(`/midlife-crisis-quiz/results/${t.id}/`).id,t.id);assert.equal(resultFromPath(`/results/${t.id}/index.html`).id,t.id);}assert.equal(resultFromPath('/results/unknown/'),undefined);assert.equal(resultFromPath('/?result=cat-queen'),undefined);});
