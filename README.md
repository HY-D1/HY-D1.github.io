# HY-D1.github.io

The source for Hanyu (Harry) Dai's personal portfolio website.

The site is intentionally a small, dependency-free static site. It presents a
Bachelor of Science with a Major in Mathematics from the University of British
Columbia, an in-progress Master of Science in Computer Science at Northeastern
University, selected projects, and a concise experience history. Content is
grounded in owner-supplied records and public project repositories; no projects,
employers, credentials, or contact details are invented.

The owner supplied the public name, Vancouver, BC location, school email,
LinkedIn profile, and interests in photography, food, hiking, and road trips.
These are owner-provided details, not independently verified profile claims.

## Local preview

From the repository root, run:

```text
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://localhost:4173` in a browser. Stop the server with `Ctrl+C`.

## Deployment

`.github/workflows/pages.yml` deploys the repository root to GitHub Pages after
changes land on `main`, and can also be started manually from the Actions tab.
The repository's Pages source should be set to **GitHub Actions** in
**Settings → Pages** once the repository has its first site commit.

If deployment fails at **Configure Pages** with **Not Found**, enable Pages and
select **GitHub Actions** as the source, then rerun the failed workflow from the
Actions tab. The expected published address is `https://hy-d1.github.io/`;
confirm the deployment succeeds before using it as a live portfolio link.

GitHub Free supports Pages for public repositories. A private repository requires
a plan that supports private-repository Pages. See the
[official publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Project language

All project artifacts use English. See `AGENTS.md` for the language and content
accuracy rules that apply to future updates.

## Visual direction

The site uses a custom, monochrome editorial layout rather than a downloaded
theme. System fonts, thin dividers, and short factual copy keep the focus on
education and project evidence. No remote fonts, UI libraries, or decorative
animations are required. Short entrance transitions and spring-like interaction
feedback are implemented in CSS and disabled for reduced-motion preferences.

The owner-reviewed hero adds a plain "Open to work" line near the contact
action; it makes no claim about role, start date, or work authorization. A static,
decorative hero backdrop uses three photographs from the six not selected for
the main gallery on that page load. The existing shuffle drives both selections,
so every refresh selects again without overlap between the gallery trio and
backdrop trio. Random choices can repeat. The backdrop uses CSS grayscale with
an owner-requested transparency mask: approximately 9% effective opacity in the
left text area, rising smoothly to 44% at the far right. Desktop introduction
copy stays inside this quiet area even with enlarged text. Photographs fade at their
joining edges instead of forming hard seams. At widths up to 900px the backdrop
stays at 10% opacity because text wraps across more of the available width.
Browsers without standard mask support use a low-opacity fallback.
This is a static opacity treatment, not a colored decorative gradient or an
animation. Original assets and gallery colors remain unchanged. It is hidden
from assistive technology, cannot intercept clicks, and is omitted in print.
Without JavaScript the hero keeps its plain surface and all content remains.
The owner approved this treatment in the local preview before PR submission.

## Project and experience content

Projects are selected by relevance, not chronology. Each entry has one short
description, a technology line, and a source link. Experience is listed most
recent first using semantic `time` elements. Dates and descriptions come from
the supplied master resume, cross-checked against the six role-specific versions.
Employment has not been independently verified with employers.

The supplied unofficial transcripts support the UBC B.Sc. in Mathematics,
awarded in May 2024, and the NEU Computer Science program at the Vancouver campus
with study from Fall 2024. Exact starting months and expected May 2027 graduation
come from the master resume; the expected date is not a completed credential.
Grades, student identifiers, birth details, phone numbers, and private document
downloads are not published. Keep the original records outside the repository.

The following public repositories and README files were checked on October 9,
2026. Repository inspection supports the project scope, not production readiness
or independently reproduced benchmark results.

| Project | Public source | Content boundary |
| --- | --- | --- |
| SQL-Adapt | [Repository](https://github.com/HY-D1/adaptive-instructional-artifacts) | Adaptive SQL feedback, learner progress, instructor dashboards; no claimed learning gains |
| StudentBERT | [Repository](https://github.com/HY-D1/studentbert) | Learning-sequence preprocessing, pretraining, evaluation; no claimed state-of-the-art result |
| Superstore Strategy Analysis | [Repository](https://github.com/HY-D1/Superstore-Strategy-Analysis) | Sample retail data, quality checks, backtests, segmentation, dashboards; not real client impact |
| AWS Audio Transcription | [Repository](https://github.com/HY-D1/audio-transcription-cs6620) | CS6620 group contribution; repository is a fork and does not establish sole authorship |
| Local AI Helper | [Repository](https://github.com/HY-D1/local-ai-helper) | Containerized local assistant, streaming, retrieval memory, persistence; no claim of secure multi-user deployment |
| TinyDetector | [Repository](https://github.com/HY-D1/tiny-detector) | Text-classification prototype, class-imbalance handling, inference API, model checks; no guaranteed safety or accuracy |
| Compact VAD Distillation | [Repository](https://github.com/HY-D1/vad-distillation) | Speech research prototype, distillation, speaker-independent evaluation, label provenance; no claimed superiority or reproduced performance numbers |

The homepage intentionally selects seven projects rather than copying the entire
resume. Additional projects, publication details, certificates, metrics, or live
demos require their own supporting evidence before inclusion. Do not treat a
repository creation date as a project's starting date or a planned feature as
implemented. Retain internship and group-project qualifiers when updating copy.

The three additional projects were selected after reviewing public source code
as well as their READMEs, and are also described in the owner-supplied resume.
Local AI Helper has implemented chat/memory services; TinyDetector has training
and inference code. The VAD README records unmet accuracy targets and identifies
legacy proxy-label results as unsuitable for final claims. The portfolio presents
its research workflow without turning those targets into accomplishments.

## Personal photographs and contact privacy

The homepage displays three randomly selected owner-provided photographs in
`#personal-photos` under "Beyond the screen". The "View photography portfolio"
link opens `https://harryframes.pages.dev/` in a new tab with an accessible
new-tab description. Six other figures remain in the hidden `#more-photos`
selection pool, not in the visible page or keyboard tab order. Only supplied photographs are used;
there are no stock or generated images. Sanitized web copies are stored under
`assets/photos/`. For additions, use the existing `figure` structure.
Use an `img` with accurate English alt text, actual intrinsic width and height,
`loading="lazy"`, and `decoding="async"`; add an optional factual `figcaption`.
All photographs use a compact three-column row, including on mobile. A 3:2
thumbnail frame uses `object-fit: contain` to preserve the entire composition;
portrait images are not cropped. Each photo links to its web-sized copy.

On every page load, `script.js` shuffles the nine existing figures with
Fisher–Yates, places three in the main row, and leaves the other six in the
hidden selection pool, also used for the randomized hero backdrop. There are no
duplicates or omitted images in the pool, and no cookies, storage,
or remote requests are needed for selection. A random selection may repeat
across visits. Without JavaScript, the original three thumbnails and external
photography link remain usable; the six-photo pool stays hidden.
No image viewer or shuffle dependency is required.
Photo captions show titles only, with no series numbers or visible count.

Keep originals outside this repository. Remove EXIF/GPS and other sensitive
metadata from web copies before committing them, and inspect faces, plates, and
addresses for unintended disclosure. Prefer broad place names in captions over
precise coordinates. Keep photos in natural color; the surrounding UI stays
neutral. The nine supplied JPEGs were exported as 14 WebP files (five include a
640px variant) with Sharp 0.35.5 from the local bundled runtime. Export settings:
auto-orientation, maximum width 1280px, no enlargement, WebP quality 82, effort 5.
Metadata was omitted and the original files' SHA-256 hashes remained unchanged.
The original Photos library and the export helper are not part of this repo.
Future asset exports should use equivalent settings and rerun the metadata test;
the site has no runtime Sharp dependency.

Source attachment mapping: 1 → Salt lake; 2 → Meteors; 3 → Desert layers;
4 → Blossoms and moon; 5 → Winter in Banff; 6 → Snowfield; 7 → Green valley;
8 → Moon and cloud; 9 → Moon sequence. Captions describe the images; no unverified
place names or shooting dates are asserted. "Salt lake" was confirmed by the
owner; the owner also identified attachment 2 as meteors and attachment 5 as
winter in Banff. Existing asset paths remain unchanged. Attachments 3, 4, 8, and
9 are small previews, so higher-resolution versions would improve larger-screen
viewing.

The owner-provided email uses a plain `mailto:` link; LinkedIn uses its clean
profile URL without the self-profile query. Public email can attract spam, and a
school mailbox's long-term availability should be confirmed separately. City
and province are sufficient; no street address, phone, embedded map, analytics,
or contact form is added. Photo-sharing metadata is explained in the
[Apple Photos sharing guide](https://support.apple.com/en-ca/guide/iphone/iphf28f17237/ios).

## Verification

Run the dependency-free structural checks with Node.js:

```text
node --test tests/site.test.mjs
node --check script.js
git diff --check
```

For browser verification, start the local preview above. At widths of 320, 390,
768, and 1280 pixels, confirm there is no horizontal scrolling and all text and
links remain readable. Repeat at 200% text size. Press Tab on a fresh page: the
first focus target must be "Skip to content"; Enter must move focus to the main
content. Test all six navigation links, the Get in touch action, and the return
link on `/404.html`. Activate View photography portfolio using both mouse and
keyboard; confirm it opens Harry Frames in a new tab. Reload several times
and check that three distinct images appear in the main row, with six distinct
others in the hidden pool, with three backgrounds drawn from that pool and no
overlap with the visible trio. The pool must remain hidden with JavaScript both
enabled and disabled. Repeated random selections are allowed. Check the
email and both social-link destinations without sending a message.
Check all seven project-source URLs; verify that experience runs from February
2026 back to summer 2019, projects have no dates, and private records remain
outside the served directory.
With reduced motion enabled, animations, link transitions,
and smooth scrolling must be off.
Stop the preview server when finished. Browser checks require no production
dependencies.

## Structure

- `index.html` — semantic page structure and SEO metadata
- `styles.css` — responsive visual system, layout, interaction states, and reduced-motion rules
- `script.js` — current year and random three-photo selection; usable without JavaScript
- `404.html` — a lightweight fallback for invalid routes
- `robots.txt` / `sitemap.xml` — crawl guidance for the canonical site URL
- `assets/photos/` — metadata-free, responsive WebP copies of owner photographs
- `tests/site.test.mjs` — structural, content, asset, and metadata checks
- `docs/progress.md` — the single shared implementation checkpoint
