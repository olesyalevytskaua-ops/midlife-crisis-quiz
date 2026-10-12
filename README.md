# Which Midlife Crisis Are You?

A warm, illustrated, English-language quiz with 17 playful archetypes and 12 reflective questions. Reconstructed from the requested character set and visual style because the previous repository contained only an incomplete scaffold. The attached posters supply the visual direction and humour. This is an entertainment experience, not a validated personality test.

Live URL: https://olesyalevytskaua-ops.github.io/midlife-crisis-quiz/

## Develop and publish

No package installation is needed. Requires Node.js 20+; the local preview command uses Python 3.

```
npm test
npm run build
npm run dev
```

Open http://localhost:4173/. `dist/` is disposable build output. Publish its contents to the `gh-pages` branch, with GitHub Pages configured to serve that branch's root. Source and original uploads live on `main`; the public branch contains only optimised runtime assets and static pages. No workflow token is required.

## Content and scoring

`data.js` owns questions, answer contributions, archetype copy and images. The six themes are activation, novelty, sociability, nurturing, structure and autonomy. Every question contributes equally to an average six-dimensional vector. It is centred on the mean of all options and scaled by each theme's expected variation. The vector is normalised to unit length; distances are measured to equivalently normalised archetype reference profiles. This compares the pattern of needs and avoids automatically preferring profiles near the centre. A zero-length vector remains zero and uses the documented tie-break rules.

Archetype centroids use explicit, attainable 12-answer reference signatures. Each signature is an automated reachability fixture; these are hand-written design choices, not empirical psychological norms. No age, gender, clinical or demographic inference is performed.

Within a numerical distance tolerance of 1e-10, ties use total matching reference responses, then the question about the next chapter, then alphabetical archetype ID. Same inputs, same output. No randomness or result cycling. The quiz follows all 12 questions in order, with no skipped or dead branches; this preserves the same weighting for everyone.

Answers remain in this tab's memory/history state. Reloading does not retain quiz progress. Result URLs contain only the archetype identifier; answers are never included or sent to a server. Every result has a real static page, canonical URL, social metadata and a 1200 × 630 JPEG, so refreshes and social crawlers work on GitHub Pages without a redirect hack. Sharing uses Web Share when available, clipboard otherwise, and a selectable text field if clipboard access fails.

## Final illustrations

17 individual character assets are used. Nine supplied WebP filenames were located in the user's Downloads folder. Eight PNG character illustrations and two PNG promotional covers came directly from the referenced chat's attachment preview paths. No older placeholder/grid art is used as a character result.

Originals are preserved unchanged in `originals/`. PNG derivatives use WebP quality 88, method 6, at original dimensions. `moto-rabel.png` is retained as the supplied filename; the public archetype ID/name are `moto-rebel` / Moto Rebel. Generic PNG identities were visually verified: 10_40_56 is the square promotional cover, 10_46_48 is the landscape promotional poster. Neither is a separate character. Their ten-second claim is explicitly corrected in the optional poster section; the actual experience states two to three minutes.

`assets/manifest.json` records source filenames, source hashes, runtime hashes, roles, dimensions and sizes. Social derivatives contain the same final individual artwork, fitted without cropping. Fonts use Google Fonts with Georgia/Arial fallbacks; the quiz and assets work without the font service.

## QA

See `QA.md` for verified test coverage and limits. Reachability fixtures, deterministic random-path checks, input validation and all result-path mappings are in `tests/quiz.test.js`. The source is intentionally dependency-free to keep a small GitHub Pages project easy to inspect and maintain.
