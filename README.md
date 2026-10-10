# HY-D1.github.io

The source for HY-D1's personal portfolio website.

The site is intentionally a small, dependency-free static site. Its content only
uses currently verified background information: a Mathematics bachelor's degree
from the University of British Columbia and an in-progress Master of Science in
Computer Science at Northeastern University, expected in 2027. Project case
studies will be added when they are ready to share; the site does not invent
projects, employers, credentials, or contact details.

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

## Structure

- `index.html` — semantic page structure and SEO metadata
- `styles.css` — responsive visual system, layout, interaction states, and reduced-motion rules
- `script.js` — the current year only; the page remains usable without JavaScript
- `404.html` — a lightweight fallback for invalid routes
- `robots.txt` / `sitemap.xml` — crawl guidance for the canonical site URL
