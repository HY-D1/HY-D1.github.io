# Portfolio progress

## 2026-10-09 20:52 PDT — Monochrome redesign, local review gate

- Status: PARTIAL. Local implementation and the checks below pass. Owner visual
  review is pending. Do not commit, push, or create a PR until the owner approves
  the local review. This instruction supersedes the earlier plan to update PR #2.
- Branch: `feat/monochrome-portfolio`, with uncommitted local changes.
- Current HEAD: `2d3e61203f069dd811b25dcf8582075119cd5968`.
- Remote main: `dd71280` (PR #2 merged); its file tree matches the current HEAD.
- Baseline: site returned HTTP 200 locally; `node --check script.js` and
  `git diff --check` passed. The three main assets totaled 25,008 bytes.
- Pre-existing limitation: the private repository cannot enable GitHub Pages on
  the owner's current plan, as confirmed by the owner-provided Settings message.
  No visibility or deployment settings were changed.

### Changes

- `index.html`: custom monochrome, content-led layout; concise education facts;
  explicit project placeholder; original navigation deep links retained; main
  content focus target and accessible new-tab link descriptions.
- `styles.css`: neutral tokens, system fonts, responsive dividers and education
  rows, visible keyboard focus, 44px minimum link targets, reduced-motion and
  print rules; removed ornamental graphics and motion styles.
- `404.html`: matching neutral metadata and direct error heading.
- `favicon.svg`: neutral colors, unchanged geometry.
- `AGENTS.md`: durable monochrome visual guidance; English requirement retained.
- `README.md`: design rationale and reproducible local verification steps.
- `tests/site.test.mjs`: four dependency-free Node structural tests for language,
  anchors/assets, education content, neutral palette, metadata, and fallback.
- `docs/progress.md`: this single shared checkpoint.

### Verification evidence

Commands run from the repository root:

```text
node --test tests/site.test.mjs
node --check script.js
git diff --check
wc -c index.html styles.css script.js
git diff --stat HEAD origin/main
git diff --numstat origin/main
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4173/
gh pr view 2 --repo HY-D1/HY-D1.github.io --json number,state,title,headRefName,url
```

Results: 4 tests passed, 0 failed; script syntax and whitespace checks passed;
main assets now total 10,142 bytes; HEAD and remote main have identical file
trees; HTTP 200; PR #2 is MERGED. No build step, dependency upgrade, or production
library was introduced.

Browser checks used the local Playwright CLI wrapper:
`/Users/harrydai/.codex/skills/playwright/scripts/playwright_cli.sh`.
Relevant commands included `goto http://127.0.0.1:4173/`, `resize 1280 900`,
`resize 390 844`, `resize 320 900`, `snapshot`, `press Tab`, `press Enter`,
`set-reduced-motion reduce`, `console error`, `requests --static`,
`goto http://127.0.0.1:4173/404.html`, and snapshot-reference `click` commands.
CLI evaluation checked document bounds, focus, hashes, computed transitions,
text size, and an isolated JavaScript-disabled browser context.

- Widths 320, 390, 768, 1280: document width equaled viewport width; no missing
  fragment targets; one h1; all visible links at least 44px wide and high.
- 200% root text size at all four widths: no horizontal overflow. Landscape
  844x390: no horizontal overflow. No overflow-hiding workaround is used.
- Tab first focused the visible skip link; Enter focused `main-content`.
- About, Background, Work, Contact, and Education clicks set the expected hashes
  and left the destination visible. Header is not sticky, so it cannot obscure
  targets at enlarged text sizes.
- Reduced motion: computed button transition duration 0s.
- JavaScript disabled at 390x844: identity and education rendered without overflow.
- Explicit `/404.html` return link navigated to the homepage. A real deployed
  missing-route HTTP status remains unverified (the local server is generic).
- Console: 0 errors, 0 warnings; observed asset requests were local and successful.
- Calculated text contrast on #fafafa: #171717 17.18:1; #606060 6.02:1. These
  checks do not constitute a full screen-reader or WCAG certification.
- Screenshots inspected: `/tmp/hy-d1-monochrome-desktop.png` (1280x1293) and
  `/tmp/hy-d1-monochrome-mobile.png` (390x1377).
- Browser-generated logs moved out of the repository to
  `/tmp/hy-d1-review-artifacts.GAKdfU/playwright-cli`; no user files were deleted.

### Handoff and next step

- Local preview remains at `http://127.0.0.1:4173/`, served from this worktree by
  `python3 -m http.server 4173 --bind 127.0.0.1`. It is not a public deployment.
- Next smallest step: owner reviews the local desktop/mobile layout and supplies
  any changes. Only after explicit local review approval, review the final diff,
  rerun affected checks, commit this branch, and open a new English PR against
  main. PR #2 was already merged and must not be reused.
- Do not make the repository public without separate owner authorization.
- Unverified: public deployment, real screen-reader behavior, field performance,
  project case studies, personal name, email, LinkedIn, and campus details.
- Compatibility: no changes to `script.js`, workflow, robots, sitemap, canonical
  URL, or asset paths; original fragment IDs remain valid. No data migration.
- Recovery: preserve the local diff. There is no remote design commit to revert.
  Future rollback should target only a confirmed design commit, never a broad
  reset of the worktree.
- Suggested commit after approval: `style: refine portfolio with a monochrome editorial layout`.

## 2026-10-09 21:15 PDT — Owner identity and compact personal photography

- Status: PARTIAL. Local implementation and verification PASS; owner visual
  review and public deployment are still pending. No commit, push, or new PR.
  The local review gate from the previous entry remains in force.
- Baseline: the previous four structural tests passed. Owner-identity and photo
  assertions first failed against the old content, then passed after the bounded
  implementation. Before the final caption correction, all nine tests passed.
- Owner-provided details: Hanyu (Harry) Dai; Vancouver, BC;
  `dai.hany@northeastern.edu`; the cleaned LinkedIn profile URL; photography,
  food, hiking (explicitly confirmed), and road trips. These do not establish
  any new professional experience or independent profile verification.
- Owner confirmed the lake is a salt lake, attachment 5 is winter in Banff,
  and attachment 2 shows meteors. Visible English titles now use Salt lake,
  Winter in Banff, and Meteors. No precise coordinates or shooting dates added.
- Owner confirmed that Moon and cloud now displays normally. Visual comparison
  of the supplied JPEG and its WebP copy found matching content and portrait
  orientation. No replacement, rotation, crop, or speculative fix was applied.

### Exact changed files and behavior

- `index.html`: supplied identity and contacts; Personal navigation and hobbies;
  nine accessible photo figures; title-only captions; More photographs without
  a visible count; corrected Banff and meteor labels and alt text.
- `styles.css`: short entrance and spring-like feedback, with reduced-motion
  disablement; compact three-column rows at every tested width; 3:2 thumbnail
  frames with contain fitting to preserve portrait and landscape compositions.
- `script.js`: Fisher–Yates selection on page load, placing three distinct
  figures in the main row and the remaining six in the disclosure. Existing
  current-year behavior retained; missing galleries are handled safely.
- `404.html`: owner name in title, retaining the earlier neutral fallback.
- `AGENTS.md`: owner-directed motion, photo privacy, and compact-row guidance.
- `README.md`: English maintenance, source mapping, privacy, random selection,
  and browser verification instructions consistent with the implementation.
- `tests/site.test.mjs`: nine dependency-free tests covering existing contracts,
  identity, photo markup, shuffle invariants and edge cases, and WebP metadata.
- `docs/progress.md`: this single checkpoint.
- New web assets under `assets/photos/`: `blossoms-and-moon.webp`,
  `desert-layers.webp`, `green-valley-small.webp`, `green-valley.webp`,
  `moon-and-cloud.webp`, `moon-sequence.webp`, `night-sky-small.webp`,
  `night-sky.webp`, `snowfield-small.webp`, `snowfield.webp`,
  `still-water-small.webp`, `still-water.webp`, `winter-reflection-small.webp`,
  and `winter-reflection.webp`. The earlier `favicon.svg` neutralization remains
  part of the uncommitted design diff; its geometry has not changed.

### Asset provenance and privacy

- Nine supplied JPEGs exported to fourteen WebP copies using bundled Sharp
  0.35.5: auto-orientation, maximum width 1280, no enlargement, quality 82,
  effort 5. Five images also have a 640px variant. Originals were read-only;
  before/after SHA-256 checks matched. EXIF, XMP, and IPTC were not retained.
- The one-time exporter remains outside the repo at
  `/tmp/harry-portfolio-review.AHMVNk/prepare-photos.cjs`; do not rerun it over
  existing outputs. Original Photos-library paths and metadata are not added
  to project files. Natural colors and existing watermarks are preserved.
- All fourteen image variants total 682,694 bytes. This is an asset-size
  observation, not a measured field-performance result.

### Commands and verification evidence

Commands run from this worktree, except the external asset helper:

```text
node /tmp/harry-portfolio-review.AHMVNk/prepare-photos.cjs
node --test tests/site.test.mjs
node --check script.js
git diff --check
git status --short --branch
git diff --numstat
wc -c index.html styles.css script.js assets/photos/*.webp
curl --fail --silent --show-error -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4173/assets/photos/moon-and-cloud.webp
```

- Final structural test result: 9 passed, 0 failed. Final caption assertions
  were first checked before changing the labels: 8 passed, 1 expected failure;
  correcting the labels restored 9/9. Syntax and whitespace checks passed.
- Browser checks used the local Playwright wrapper with `-s=harry-review`:
  `goto`, `reload`, `snapshot`, snapshot-reference `click`, `press Tab`,
  `press Enter`, `press Space`, `resize`, `set-reduced-motion reduce`,
  `console error`, `screenshot --full-page`, and focused `eval` / `run-code`.
- Six page-load samples retained 3 selected + 6 remaining, with all 9 distinct.
  Random choices may repeat across visits; no storage or cookies are used.
- Widths 320, 390, 768, 1280, both 100% and 200% text: document width equals
  viewport width with photos collapsed and expanded. Three columns remain.
- An earlier 320px/200% check exposed 326px overflow from a long caption.
  `min-width: 0` on figures and `overflow-wrap: anywhere` on captions fixed
  this; the final corresponding check returned 320px, including expanded rows.
- Skip link focuses main content. Personal and Get in touch navigate to their
  correct visible sections. Native photo disclosure opens/closes with mouse,
  Enter, and Space; photo links retain descriptive new-tab labels.
- Normal motion is bounded to one entrance and short interaction feedback;
  reduced motion computes no animation, zero-duration transitions, auto scroll.
- JavaScript-disabled 390px context retains the default 3 + 6 usable layout.
- During one preview reload, four image requests reported local connection
  reset/socket errors, including Moon and cloud. The asset returned HTTP 200;
  a fresh browser context loaded all nine images with positive natural widths
  and zero console errors. A subsequent main-page check also had zero errors.
  The transient connection cause remains unverified; no application workaround
  or dependency change was introduced.
- Final captures inspected: `/tmp/harry-portfolio-final-desktop.png`,
  `/tmp/harry-portfolio-final-gallery.png`, and
  `/tmp/harry-portfolio-final-mobile-gallery.png`. Browser logs remain outside
  the repo in `/tmp/harry-portfolio-review.AHMVNk/`.

### Compatibility and next step

- Existing anchor IDs, canonical URL, workflow, robots, sitemap, and image
  URLs are preserved. Existing current-year behavior remains. No data migration,
  new production dependency, visibility change, or deployment change.
- Local preview remains `http://127.0.0.1:4173/`; refresh to load the corrections.
  The user-facing in-app preview was refreshed and the final source verified.
- Next smallest step: owner reviews locally. After explicit review pass, inspect
  the final diff, rerun affected checks, commit the branch, and create a new
  English PR. Do not reuse merged PR #2 or make the repo public without consent.
- Unverified: public deployment, full screen-reader/WCAG audit, field performance,
  school-email longevity, LinkedIn profile contents, and campus details.
- Suggested commit after approval:
  `feat: refine monochrome portfolio with personal photography and contact details`.

## 2026-10-09 21:27 PDT — Evidence-based projects and reverse-chronological experience

- Status: PARTIAL. Local content implementation and verification PASS; owner
  local review is pending. No commit, push, PR, merge, or deployment was performed.
- Baseline: the prior nine structural tests passed. Initial content coverage
  produced three expected failures before implementation, then 12/12 passed.
  The owner's follow-up requested three more projects; updating the count/link
  assertions first produced one expected failure (4 versus 7), then 12/12 passed.
- Scope: seven selected projects without dates; four experiences, most recent
  first; concise English copy, neutral list styling, bounded interaction motion.
  Existing local changes from the redesign and photography work were preserved.

### Evidence and content boundaries

- Read the owner-supplied master resume and six role-specific resumes; no tracked
  revisions or comments were found. Inspected the four rendered master-resume
  pages. Read both supplied unofficial transcripts and inspected the relevant
  rendered education pages. Originals and temporary document renders remain
  outside the repository and served directory. No identifiers, grades, private
  phone numbers, or private email were copied to project files.
- UBC transcript supports Bachelor of Science, Major in Mathematics, awarded
  May 2024. NEU transcript supports Computer Science at Vancouver with study
  from Fall 2024. Exact starting months and expected May 2027 completion are
  owner-resume facts; the expected date remains explicitly qualified.
- Experience dates and duties are consistent across the supplied resumes:
  NEU Research Assistant (February 2026–present), KPMG China Tax Pool Intern
  (July–September 2025), Postal Savings Bank of China Credit Documentation
  Analyst Intern (May–June 2025), China Everbright Bank Banking Service Intern
  (July–August 2019). These are not independently verified employer records.
  No employment hours, paid status, leadership, or quantified impact asserted.
- Read-only GitHub connection inspected public repository metadata, file trees,
  and README files. The four initial README blob SHAs:
  - `adaptive-instructional-artifacts`: `003e8bd57672dc6664c48efcd2e47ac23cbefa44`
  - `studentbert`: `712fb0891a103671c57cb99e1add203f3db3f340`
  - `Superstore-Strategy-Analysis`: `045888231c911ad349b883dc3d6f35936d76738e`
  - `audio-transcription-cs6620`: `c7a266f72a477d42fff66f3c1d991c9fe014543f`
- AWS entry explicitly retains the CS6620 group qualifier and contribution
  language; the repository is a fork. Superstore uses sample retail data, not
  real client results. No benchmarks, production readiness, or sole authorship
  inferred from repository ownership.
- Three additional public, non-fork repositories also appear in the supplied
  master resume. Selection considered complementary scope and visible source:
  - `local-ai-helper`: README `feb6dffdb756e9ebc3a09cc74698837255b15c72`;
    chat router, base agent, vector store, and memory manager inspected for
    streaming/Ollama/retrieval/persistence. No secure multi-user claim added.
  - `tiny-detector`: README `f948d9d50522efb4202bf271bad6b601ed86f63b`;
    API, model helper, and training path inspected for inference, model status,
    and imbalance handling. Described as a prototype, not a safety guarantee.
  - `vad-distillation`: README `30206b016acb3e701fabdbdf41dad1a167f77413`;
    student architecture, loss, and LOSO training/label-policy code inspected.
    README explicitly records unmet accuracy targets and legacy proxy-label
    results. Portfolio describes the research method, not benchmark superiority.
- Also considered textbook/EPUB utilities; no extra entries or copied content
  were added for those. Project ordering is relevance-led, not date-derived.
- Read-only repository listing now reports the portfolio itself PUBLIC. This
  supersedes the earlier private-repository observation; this task did not
  change visibility. Public deployment was not checked or modified.

### Exact files changed in this content session

- `index.html`: Experience navigation and section; accurate education date/status
  markup; seven concise project entries with accessible source links; section
  labels renumbered. Existing anchor IDs and photo/contact markup preserved.
- `styles.css`: lightweight experience/project list rules, wrapping headings,
  readable date/technology metadata, minimum 44px project links, 240ms arrow
  feedback with existing reduced-motion disablement. No looping effects.
- `tests/site.test.mjs`: education dates, experience order, seven project URLs,
  group/sample/prototype qualifiers, no project dates, and privacy assertions.
- `README.md`: provenance and claim boundaries; seven-source table; manual
  verification instructions aligned with the rendered page.
- `docs/progress.md`: this single shared checkpoint.

### Commands and observed verification

```text
node --test tests/site.test.mjs
node --test --test-reporter=dot tests/site.test.mjs
node --check script.js
git diff --check
git status --short --branch
git diff --numstat
gh repo list HY-D1 --limit 100 --json name,url,description,isFork,isPrivate,primaryLanguage
gh repo view HY-D1/local-ai-helper --json isFork,visibility,url
gh repo view HY-D1/tiny-detector --json isFork,visibility,url
gh repo view HY-D1/vad-distillation --json isFork,visibility,url
```

- Final checks: 12 tests passed, zero failed; script syntax and whitespace pass.
  Static site has no build step or added runtime dependency. Repository code
  inspection does not establish successful training or service execution; those
  unrelated project workloads were not run.
- Private-source extraction used bundled Python ZIP/XML inspection, pdftotext,
  the documents skill renderer, and pdftoppm. Render artifacts are under
  `/tmp/hanyu-portfolio-content.pTQQpH/`, outside the served checkout.
- Browser QA used the Playwright wrapper with `-s=hanyu-content-review`: open,
  resize, reload, snapshot, click, press, set/clear-reduced-motion, screenshot,
  console, and scoped eval/run-code diagnostics.
- Seven-project page: widths 320, 390, 768, 1280 at 100% and 200% root text,
  photos collapsed and expanded (16 combinations): document width equals
  viewport; no experience/project element extends past the viewport.
- Experience/Projects navigation reached the preserved section IDs. Skip-link
  Tab/Enter showed a visible outline and focused `main-content`. Seven project
  links have correct public URLs, new-tab labels, and 44px minimum height.
- Normal motion: one entrance iteration; project arrow transition 0.24s with
  the existing spring curve. Reduced motion: no hero animation, zero-duration
  arrow transitions, auto scrolling. Console check: zero errors/warnings.
- JavaScript-disabled 390px context: seven projects and four experiences still
  render; photos retain the usable default 3 + 6 layout; no horizontal overflow.
- Inspected desktop/mobile seven-project screenshots and experience screenshot:
  `/tmp/hanyu-portfolio-seven-projects-desktop.png`,
  `/tmp/hanyu-portfolio-seven-projects-mobile.png`,
  `/tmp/hanyu-portfolio-experience-desktop.png`.
- One combined patch was rejected because its README context did not match;
  no partial file changes occurred. Re-read the actual line and applied the
  bounded patch successfully. No workaround or disabled test was introduced.

### Compatibility, risks, and next step

- Photos/shuffle, existing deep links, contacts, canonical URL, workflow, robots,
  sitemap, and fallback route remain unchanged in this session. No migration.
- Local preview remains `http://127.0.0.1:4173/#work`. Opening the in-app preview
  was queued by the desktop app; that response alone does not prove UI refresh.
- Next smallest step: owner reviews the local seven-project page and experience
  copy. Only after explicit local review pass, inspect the full accumulated
  design diff, rerun affected checks, commit, push, and create an English PR.
- Unverified: independent employment evidence, live project services, model
  benchmarks, public Pages deployment, full screen-reader/WCAG audit, and field
  performance. Do not publish private resumes or transcripts as proof.
- Suggested commit after approval:
  `feat: add evidence-based projects and chronological experience to portfolio`.

## 2026-10-09 21:29 PDT — Remove redundant hero eyebrow

- Status: PASS for this local copy edit; overall owner review remains pending.
- Owner requested removal of the hero's Personal portfolio / Vancouver line
  because the contact section already states Based in Vancouver, BC.
- Changed only `index.html` (removed one paragraph), `tests/site.test.mjs`
  (focused absence/preserved-contact regression), and `docs/progress.md`.
  Styles, motion, project entries, experience, metadata, and contacts unchanged.
- The added test first failed with the old paragraph present (12 pass, 1 expected
  fail). After the removal, `node --test tests/site.test.mjs` returned 13 passed,
  zero failed; `git diff --check` passed.
- Browser check with Playwright session `hanyu-hero-review` confirmed at 1280px
  and 390px that H1 is the first hero content element, the eyebrow is absent,
  contact location is preserved, and document width equals viewport width.
  Inspected `/tmp/hanyu-portfolio-clean-hero.png`; agent browser closed, preview
  server left running. Commands: open, resize, screenshot, scoped run-code, close.
- No commit, push, PR, or deployment. Refresh `http://127.0.0.1:4173/` to review.
- Suggested commit after approval: `refactor: remove redundant portfolio eyebrow`.

## 2026-10-09 21:30 PDT — Owner approved local review; prepare PR

- Status: PARTIAL for delivery; implementation and local review PASS. Owner
  explicitly approved the current preview and requested a PR. The earlier
  review gate is satisfied. Do not merge without a separate request.
- Fetched origin: `origin/main` remains `dd71280`; its tree matches the branch
  base `2d3e612`. No open PR exists for the repository at this check.
- Final verification: `node --test tests/site.test.mjs` reports 13 passed,
  zero failed; `node --check script.js` and `git diff --check` pass. Prior
  browser evidence remains applicable because tested UI files are unchanged.
- Reviewed accumulated changes to `index.html`, `styles.css`, `script.js`,
  `404.html`, `favicon.svg`, `AGENTS.md`, `README.md`, `tests/site.test.mjs`,
  `docs/progress.md`, and 14 WebP files under `assets/photos/`. No unrelated
  files are included. Deployment workflow, robots, and sitemap unchanged.
- Filename checks found no private document/env files; targeted text scan found
  no private-key blocks or credential-like strings. This is a bounded scan,
  not a comprehensive security certification. Image metadata tests pass.
- Next action: commit approved changes, push `feat/monochrome-portfolio`, open
  an English PR against `main`, and record the confirmed PR URL. Retain the
  worktree and local preview. Public deployment remains unverified.

## 2026-10-09 21:31 PDT — PR created after local review pass

- Status: PASS for the requested branch/PR delivery. Owner's approved UI is
  committed and pushed as `d514d25a6a39a49a33200eb1f1fc00671e5539e4` on
  `feat/monochrome-portfolio`. All 23 approved files are included.
- Confirmed PR: https://github.com/HY-D1/HY-D1.github.io/pull/3
  Title: Refine monochrome portfolio with projects, experience, and personal photography.
  Base: `main`; state: OPEN; draft: false. GitHub reports MERGEABLE / CLEAN.
  Attached the PR to this chat. No merge, deployment, or visibility change.
- Successful delivery commands: `git commit -m "feat: refine monochrome portfolio with verified content and photography"`,
  `git push -u origin feat/monochrome-portfolio`; GitHub connection created PR #3.
  `gh pr view 3 --repo HY-D1/HY-D1.github.io --json number,url,state,isDraft,mergeable,mergeStateStatus,headRefOid,baseRefName,headRefName,statusCheckRollup`
  confirmed the PR identity, branch, and clean mergeability. Working tree was
  clean before this documentation-only delivery checkpoint.
- Local verification remains 13/13 tests, script syntax, and whitespace PASS.
  No PR status checks are configured/running (`statusCheckRollup` empty); do not
  label this as a successful hosted CI run. Pages workflow runs on main only.
- Retained the worktree and local preview for review. Next step: owner reviews
  PR #3 and decides whether to merge. Deployment must be confirmed separately
  after a merge; project services/model benchmarks and full accessibility audit
  remain unverified as documented above.

## 2026-10-09 21:42 PDT — Local availability and randomized hero photo trial

- Status: PARTIAL pending owner visual approval; local automated checks PASS.
  No commit, push, PR update, merge, or deployment for this experiment.
- Baseline: clean worktree at `c5a84dd`; 13/13 existing tests passed. Added
  availability/backdrop regressions first failed (13 pass, 2 expected failures).
  Updating the requested opacity profile also failed before implementation
  (14 pass, 1 expected failure). Final `node --test tests/site.test.mjs`:
  15 passed, zero failed. `node --check script.js` and `git diff --check` pass.
- Changed files: `index.html`, `styles.css`, `script.js`, `tests/site.test.mjs`,
  `README.md`, and this checkpoint. Added plain English "Open to work" without
  inventing availability dates, job types, or work authorization. Each refresh
  shuffles the nine existing photos; the gallery retains three and the backdrop
  uses three from the remaining six. No new assets or dependencies.
- Owner explicitly requested stronger photography toward the right, overriding
  the default prohibition on gradient treatments only for a static transparency
  mask. Latest strength is 44% at the far right, approximately 8.8% in the left
  text area. Join edges fade; grayscale is CSS-only. Desktop intro width remains
  inside the quiet area; at widths up to 900px photos remain at 10% opacity.
  Mask-unsupported browsers have a low-opacity fallback. Print hides photos
  and retains the original unrestricted intro width.
- Browser verification using Playwright session `hanyu-backdrop-review` and
  `/Users/harrydai/.codex/skills/playwright/scripts/playwright_cli.sh`:
  `open http://127.0.0.1:4173/`, `resize`, scoped `run-code`, and `screenshot`.
  Six reload samples retained nine unique gallery photos, exactly three backdrop
  photos, no intersection with the selected trio, and subset-of-remaining true.
  All nine photo URLs returned HTTP 200. Tested 320, 390, 768, 1024, and 1280px
  with 100% and 200% root font sizing: no horizontal overflow. Enlarged desktop
  introduction stays left of 64% viewport width after the width guard.
- Reduced motion produces animation `none` and scrolling `auto`; print backdrop
  display is `none`. JavaScript-disabled check retains Open to work, gallery
  3 + 6, and a plain hero. Decorative background is aria-hidden and pointer inert.
  Conservative settled-text contrast calculation for #606060 over the darkest
  possible left background is 4.946:1 (8.8% black over #fafafa), or 4.809:1
  for the mobile 10% limit. This is not a complete WCAG or screen-reader audit.
- Inspected final desktop and mobile screenshots outside the repository:
  `/tmp/hanyu-portfolio-backdrop-desktop-final.png` and
  `/tmp/hanyu-portfolio-backdrop-mobile-final.png`. Waited for existing entrance
  animations to settle before the final capture. No private source documents
  or originals were copied into the served directory.
- Verification corrections: one earlier shell check mistakenly used the browser
  log directory, causing missing test/script and non-repository errors; reran
  all checks in the worktree successfully. An initial browser sampling selector
  used `#selected-photos`, which does not exist; corrected to `#personal-photos`
  and reran before claiming disjointness. Neither error changed project files.
- Remaining: owner local review, browser engines other than Chromium, field
  performance, and comprehensive assistive-technology checks. Random sets may
  repeat legitimately. Preview remains at `http://127.0.0.1:4173/`.
  Next smallest action: owner approves or requests another bounded visual tweak
  before any PR update. Suggested commit after approval:
  `feat: add availability and randomized monochrome hero photographs`.

## 2026-10-09 21:44 PDT — Approved hero treatment: prepare separate PR

- Status: PARTIAL for delivery; owner approved the latest local preview and
  explicitly requested a PR. The local review gate is satisfied.
- `git fetch origin` and `gh pr view 3 --repo HY-D1/HY-D1.github.io --json number,url,title,body,state,isDraft,mergeable,mergeStateStatus,headRefOid,headRefName,baseRefName,statusCheckRollup`
  confirmed PR #3 is MERGED. `origin/main` is `726a898`; its file tree matches
  the original local HEAD `c5a84dd` (`git diff --stat HEAD origin/main` empty).
  No open PR was found with `gh pr list --repo HY-D1/HY-D1.github.io --state open --json number,title,headRefName`.
- Created `feat/availability-photo-backdrop` from current `origin/main` using
  `git switch -c feat/availability-photo-backdrop origin/main`, retaining exactly
  the six locally reviewed modified files. Previous merged PR is unchanged.
- Fresh checks in the worktree: `node --test tests/site.test.mjs` reports
  15 passed, zero failed; `node --check script.js` and `git diff --check` PASS.
  Reviewed the six-file diff: no new images, dependencies, credentials, private
  documents, employment claims, unrelated content edits, or deployment changes.
  Prior browser evidence remains applicable because approved UI is unchanged.
- README now records owner approval instead of the superseded local-only gate.
  Expected delivery: commit these six files, push the new branch, open an
  English PR against main, attach it to this chat, and verify its remote head.
  No merge/deployment or worktree removal is authorized.

## 2026-10-09 21:45 PDT — Approved hero treatment PR delivered

- Status: PASS for branch/PR delivery. The approved six-file change is committed
  as `10b8ff812abea1bd4939117e004884efaeb533da` on
  `feat/availability-photo-backdrop`; `git push -u origin feat/availability-photo-backdrop`
  succeeded. `git ls-remote --heads origin feat/availability-photo-backdrop`
  confirmed the matching remote implementation commit.
- GitHub connection created PR #4:
  https://github.com/HY-D1/HY-D1.github.io/pull/4
  Title: Add availability and randomized monochrome hero photography.
  Attached it to this chat. Base is main at `726a898`; state OPEN, draft false.
  `gh pr view 4 --repo HY-D1/HY-D1.github.io --json number,url,state,isDraft,mergeable,mergeStateStatus,headRefOid,headRefName,baseRefName,statusCheckRollup,files`
  confirmed MERGEABLE / CLEAN and only the intended six files.
- Local checks remain 15/15 tests, script syntax, and whitespace PASS. UI is
  unchanged since owner approval. `statusCheckRollup` is empty: no hosted CI
  pass is claimed. No merge, deployment, visibility change, or worktree removal.
- This entry is a documentation-only delivery checkpoint, committed and pushed
  separately. Retain the local preview. Next action: owner reviews PR #4 and
  chooses whether to merge; confirm Pages deployment separately after merging.
  Other browser engines, full accessibility audit, and field performance remain
  unverified as recorded above.

## 2026-10-14 16:45 PDT — Local Harry Frames photography link

- Status: PARTIAL pending owner local review; implementation checks PASS.
  Owner requested local-only application of the external photography link.
  Baseline worktree was clean and `node --test tests/site.test.mjs` passed 15/15.
- Changed `index.html`: replaced the More photographs disclosure with a
  View photography portfolio link to https://harryframes.pages.dev/ opening
  a new tab with noopener/noreferrer and accessible new-tab text. Retained
  all six additional figures in hidden `#more-photos`; `script.js` unchanged.
- Changed `styles.css`: explicit `.photo-gallery[hidden] { display: none; }`
  prevents the existing grid rule from overriding hidden-pool behavior.
  Existing gallery, hero, content, and metadata remain unchanged.
- Changed `tests/site.test.mjs` to verify the requested external-link/hidden-pool
  contract instead of the explicitly superseded disclosure. This test failed
  against the old HTML before implementation. Final tests: 15 passed, zero
  failed; `node --check script.js` and `git diff --check` PASS. Updated README
  behavior and manual verification instructions; this is the only checkpoint.
- Browser skill checks with session `harryframes-link-review`: open local
  `/#photography`, snapshot, scoped run-code, click observed link ref, tab-list.
  Actual click opened https://harryframes.pages.dev/ in a separate tab titled
  Harry — Nature & People, leaving the portfolio tab open. Four reload samples
  each retained 3 visible figures, 6 hidden figures (display none), 3 hero
  backgrounds, and no overlap with the visible trio. No horizontal overflow at
  320, 390, 768, or 1280px. JavaScript-disabled check retained 3 thumbnails,
  the link, and a hidden pool. Inspected `/tmp/harryframes-local-link.png`.
- Preview was not running (HTTP 000), so restarted in this worktree using
  `python3 -m http.server 4173 --bind 127.0.0.1`; leave it running for owner.
  Only agent-owned browser session is closed. No commit, push, PR update,
  merge, deployment, dependency change, or photo asset changes.
- Next: owner reviews http://127.0.0.1:4173/#photography before authorizing
  PR delivery. Complete screen-reader testing and other engines unverified.
  Suggested commit after approval: `feat: link personal photography to Harry Frames`.

## 2026-10-14 — Owner-approved photography link: PR preparation

- Status: PARTIAL for delivery; owner approved the local preview and explicitly
  requested a PR. Prior local browser results remain applicable: UI unchanged.
- `git fetch origin`, `gh pr view 4 --repo HY-D1/HY-D1.github.io --json state,headRefName`,
  and `gh pr list --repo HY-D1/HY-D1.github.io --state open --json number,title,headRefName`
  confirmed PR #4 is MERGED and no open PR exists. The latest main tree matches
  the previous local HEAD (`git diff --stat HEAD origin/main` empty).
- Created `feat/harryframes-photography-link` from origin/main, preserving the
  five reviewed local changes. Reviewed diff contains only `index.html`,
  `styles.css`, `tests/site.test.mjs`, `README.md`, and this checkpoint.
  No new assets, runtime dependencies, source document exposure, deployment
  configuration changes, or random-selection script changes.
- Fresh `node --test tests/site.test.mjs`: 15 passed, zero failed;
  `node --check script.js` and `git diff --check` PASS. Next: commit, push,
  create an English PR, attach it, and confirm the remote head. Do not merge,
  deploy, remove the worktree, or stop the owner preview.

## 2026-10-14 16:47 PDT — Harry Frames link PR delivered

- Status: PASS for requested PR delivery. Implementation commit:
  `df2d8d5683bc3ebb190fa79ddd6c84445162e04b`, branch
  `feat/harryframes-photography-link`, base main `39aa8fa`.
  `git push -u origin feat/harryframes-photography-link` succeeded;
  `git ls-remote --heads origin feat/harryframes-photography-link` matched.
- GitHub connection created https://github.com/HY-D1/HY-D1.github.io/pull/5
  with English title "Link personal photography to Harry Frames"; attached
  it to this chat. PR is open and not draft; exactly five intended files.
- Local tests remain 15/15 PASS; script syntax and whitespace PASS. UI and
  script unchanged since owner-approved browser verification. No merge or
  deployment performed; preview/worktree retained. This documentation-only
  delivery entry is committed and pushed separately.
- Next: owner reviews PR #5 and decides whether to merge. Production deployment,
  other browser engines, and complete accessibility audit remain unverified.

## 2026-10-16 — Validated retail analytics project entry

- Owner requested actual Amazon Sales Analytics V2 development and a factual website update only after the first project passed its display gate. The analytics implementation now passes 37 tests locally and in a clean Ubuntu/Python 3.11 CI run, builds/reconciles its database and five BI tables, executes its notebook, and includes retained Python/SQL source, English results and actual browser screenshots. Source PR: https://github.com/HY-D1/amazon-sales-analytics/pull/1.
- Fresh website checkout at main `b9cd51e` was clean; baseline 15 structural tests passed. Created isolated `portfolio-v2`; no prior local changes existed in this checkout. Owner's current branch/PR request authorizes this bounded update; historical review gates above describe completed earlier changes.
- `index.html`: added Amazon Sales Analytics V2 first, retained the seven existing entries and other profile/experience/photo/contact sections. Copy describes the synthetic SQL/Python/SQLite/Streamlit demo and BI-ready model; explicitly says Power BI Desktop authoring is pending. Links target the actual `portfolio-v2` implementation, processing trace and verification record.
- `styles.css`: small neutral resource-link and responsive screenshot rules. `assets/projects/amazon-sales-v2.png` is an exact copy of the actual project capture, 1280×720, with no crop/resize/recolor. Source capture format was normalized by the retained analytics helper before copying.
- README records the evidence boundary and eight selected projects. Tests now distinguish the nine personal photographs from the extra project screenshot; new checks cover actual source/trace links, synthetic/Desktop qualifiers, PNG signature and intrinsic dimensions.
- Actual final checks: `node --test tests/site.test.mjs` **17/17 PASS**; `node --check script.js`, `node --check tests/site.test.mjs`, `git diff --check` PASS. A first image-format check caught JPEG bytes under a PNG extension; true PNG conversion fixed it. A later capture size change was caught and corrected in markup/tests.
- Browser at `http://127.0.0.1:4178/#work`: eight projects, image loaded at natural 1280×720; viewport 1280/document width 1265, no horizontal overflow. Actual local-preview screenshot saved to `/tmp/hy-d1-portfolio-v2-review.jpg`. Only this viewport was checked for the new entry; a full mobile/accessibility audit is not claimed.
- Owner directed all Git commits to use Hanyu Dai or HY-D1 and remove the incorrect inherited agent identity. Local Git author/committer use Hanyu Dai and the verified account-specific HY-D1 privacy email; both repositories and global defaults were corrected. See the source project's `docs/GIT_IDENTITY_AUDIT.md`.
- Delivery scope: push isolated branch and open PR. No merge, Pages deployment, profile-fact change, visibility change or deployment-setting change. Live site remains unchanged until normal PR review/merge.

### Branch and PR delivered

- Implementation commit `8d4f794` pushed to `portfolio-v2`; website PR https://github.com/HY-D1/HY-D1.github.io/pull/6 is open for review. All changed files belong to the bounded project entry and its evidence/verification updates.
- Git author/committer are Hanyu Dai with the verified HY-D1 privacy email. Analytics delivery and identity audit are retained in its PR #1 and `FINAL_SUMMARY.md`.
- Local checks remain 17/17 PASS. Existing Pages workflow runs on main, not this PR; no hosted website test/deployment success is claimed. Live https://hy-d1.github.io/ still shows the prior main version. No merge or public deployment performed.
