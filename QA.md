# QA — 12 October 2026

## Verified implementation

- Exactly 17 unique archetypes, each mapped to its own visually inspected final character illustration. Eight PNG character uploads and two PNG covers converted to WebP; nine matching final-named WebP files recovered from Downloads. All 19 original assets preserved, with hashes and dimensions recorded.
- Generic PNG identities: 10_40_56 is a square cover, 10_46_48 is a landscape poster. They are preserved as assets and are not displayed in the quiz.
- Twelve psychological reflection questions about comfort, struggle, anger, failure, energy, control, reward, attention, risk, boundaries, next chapter and permission. No answer directly selects a hobby. All twelve questions are presented to everyone; no incomplete branch contributes a differently weighted profile.
- Every archetype has description, humorous line, balance reminder, low-commitment next step, and specific guidance for friends/family. Animal adoption is not treated as an impulsive purchase; wine results explicitly allow alcohol-free rituals. Activity recommendations encourage manageable beginner steps.
- Six automated tests pass: content/asset completeness; question vectors; all 17 reachable quiz outcomes; input rejection; 10,000 deterministic valid paths; all result URL mappings.
- An additional 50,000 random-path scoring audit produced every archetype. The initial unnormalised scoring over-selected a moderate profile; centring/scaling and comparing normalised profiles removed that bias. Uniform random paths are a software stress test, not a psychological sample or validation study.
- Static build generates 17 independent result pages, root page, custom 404 and sitemap. Every result has its own title, description, canonical URL, Open Graph URL/image and Twitter image. All 18 social images decoded successfully at 1200 × 630.

## Browser checks

Tested the app at localhost under `/midlife-crisis-quiz/`, matching the production project subdirectory, rather than only the server root.

- Completed all 12 questions and obtained the expected Cat Queen result from its reference signature.
- Next is disabled until selection. Back preserves selections. Review returns to the final question with its chosen answer. Browser Back returns to the result. Restart clears answers and disables Next.
- Clipboard sharing succeeded and copied an archetype-only link. Unknown/absent Clipboard API has a selectable input fallback by implementation; that fallback and the platform's native share sheet were not forced in this browser.
- Loaded all 17 static result routes in the browser; all result artwork loaded, all canonical/social image URLs pointed to the appropriate production route, no horizontal overflow at 320 px, no console errors.
- Landing tested at 320 and 390 px; question screen tested at 390 px. Answer targets measured 64–81 px high. Desktop layout visually reviewed and an image aspect-ratio defect fixed before publication.
- Keyboard Tab/arrow navigation selects radio answers and enables Next. Main receives focus after navigation; fieldsets have question labels. The scoring dialog opens and closes with Escape. Native radio inputs, skip link, visible focus styling, meaningful image alternatives, live copy status and reduced-motion styling are included.
- Main text colours and primary button colours checked for readable contrast against their backgrounds. This was a focused accessibility check, not a formal WCAG certification or screen-reader audit.

## Limits

English copy follows the supplied English title/posters; no translated quiz was available in the referenced chat. The scoring is hand-authored and unvalidated, clearly labelled as playful reflection. Progress is intentionally not persisted across reloads. Native share-sheet behaviour and third-party social preview caches depend on the platform and were not separately verified. Google Fonts has local font fallbacks.

Original repository source was missing. This is a complete reconstruction, not a claim that the former unseen questions or scoring were preserved. No portfolio repository files are involved.

## Quiz-first flow update

The landing page now contains no character gallery, result browsing links or promotional posters. Generated result-page fallback HTML also omits links to other archetypes, and the root no-JavaScript message no longer offers a result shortcut. A shared result page displays the shared character and invites the visitor to take the quiz.

Browser verification: the landing page rendered zero character cards and zero poster images. After all twelve questions, the Cat Queen result offered an optional, initially collapsed “Explore other plot twists” control with no gallery cards loaded. Activating it revealed sixteen other character cards, with no posters. Browsing another character retained access to optional exploration within the completed session; a newly loaded shared result offered no exploration shortcut. Scoring and the original artwork remain unchanged. The previous complete source archive and original local prototype are retained separately for portfolio use.
