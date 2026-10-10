import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createContext, runInContext } from "node:vm";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const html = read("index.html");
const css = read("styles.css");

test("English document retains navigation, landmarks, and local assets", () => {
  assert.match(html, /<html lang="en">/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<main id="main-content" tabindex="-1">/);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(match[1]), "Missing anchor: " + match[1]);
  }
  for (const id of ["top", "about", "background", "work", "contact"]) {
    assert.ok(ids.has(id), "Existing deep link must remain: " + id);
  }
  for (const file of ["styles.css", "script.js", "favicon.svg"]) {
    assert.ok(read(file).length > 0);
    assert.ok(html.includes('"/' + file + '"'));
  }
});

test("Education retains completed and expected degree status with sourced dates", () => {
  for (const text of [
    "Northeastern University",
    "Master of Science in Computer Science",
    "University of British Columbia",
    "Bachelor of Science, Major in Mathematics",
    'datetime="2024-09"',
    'datetime="2027-05"',
    'datetime="2020-09"',
    'datetime="2024-05"',
  ]) assert.ok(html.includes(text), "Missing content: " + text);
  assert.match(html, /Expected <time datetime="2027-05">May 2027<\/time>/);
  assert.match(html, /<span>Completed<\/span>/);
  assert.match(html, /href="https:\/\/github.com\/HY-D1"/);
});

test("Experience follows the supplied reverse chronology without invented outcomes", () => {
  const section = html.match(/<section[^>]*id="experience"[\s\S]*?<\/section>/)?.[0] || "";
  assert.match(section, /<ol class="experience-list" aria-label="Experience, most recent first">/);
  const titles = [...section.matchAll(/<h3>(.*?)<\/h3>/g)].map((match) => match[1]);
  assert.deepEqual(titles, ["Research Assistant", "Tax Pool Intern", "Credit Documentation Analyst Intern", "Banking Service Intern"]);
  const dates = [...section.matchAll(/datetime="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(dates, ["2026-02", "2025-07", "2025-09", "2025-05", "2025-06", "2019-07", "2019-08"]);
  for (const organization of ["Northeastern University", "KPMG China", "Postal Savings Bank of China", "China Everbright Bank"]) {
    assert.ok(section.includes(organization));
  }
  assert.match(section, /offline replay/);
  assert.doesNotMatch(section, /\d+%|promoted|led a team|full-time/i);
});

test("Selected projects have real source links, no dates, and qualified contributions", () => {
  const section = html.match(/<section[^>]*id="work"[\s\S]*?<\/section>/)?.[0] || "";
  assert.match(section, /<ul class="project-list" aria-label="Selected projects">/);
  assert.equal((section.match(/<li>/g) || []).length, 7);
  for (const repo of ["adaptive-instructional-artifacts", "studentbert", "Superstore-Strategy-Analysis", "audio-transcription-cs6620", "local-ai-helper", "tiny-detector", "vad-distillation"]) {
    assert.ok(section.includes('href="https://github.com/HY-D1/' + repo + '"'));
  }
  assert.match(section, /CS6620 group project/);
  assert.match(section, /Contributed to/);
  assert.match(section, /sample retail data/);
  assert.match(section, /leakage checks/);
  assert.match(section, /retrieval-based memory/);
  assert.match(section, /text-classification prototype/);
  assert.match(section, /research prototype/);
  assert.match(section, /label-provenance checks/);
  assert.equal((section.match(/class="project-link"/g) || []).length, 7);
  assert.doesNotMatch(section, /outperform|guaranteed|473 KB|0\.262|multimodal|multi-user/i);
  assert.doesNotMatch(section, /<time|datetime=|\d+%|production-grade|state-of-the-art|Project case studies will be added/);
});

test("Private resume and transcript material is not exposed by the website", () => {
  assert.doesNotMatch(html, /\.docx|\.pdf|\/Users\/|student number|date of birth|tel:|gmail\.com/i);
  assert.match(html, /href="mailto:dai.hany@northeastern.edu"/);
});

test("Palette remains monochrome without gradients or looping effects", () => {
  for (const source of [html, css, read("favicon.svg"), read("404.html")]) {
    for (const match of source.matchAll(/#([0-9a-f]{6})\b/gi)) {
      const hex = match[1];
      assert.equal(hex.slice(0, 2), hex.slice(2, 4), "Non-neutral color: " + hex);
      assert.equal(hex.slice(2, 4), hex.slice(4, 6), "Non-neutral color: " + hex);
    }
  }
  assert.doesNotMatch(css, /gradient\(|\binfinite\b|scroll-timeline/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation:\s*none !important/);
  assert.match(css, /:focus-visible/);
});

test("Canonical metadata and fallback route remain consistent", () => {
  assert.match(html, /rel="canonical" href="https:\/\/hy-d1.github.io\/"/);
  assert.match(read("sitemap.xml"), /https:\/\/hy-d1.github.io\//);
  assert.match(read("robots.txt"), /https:\/\/hy-d1.github.io\/sitemap.xml/);
  assert.match(read("404.html"), /href="\/"/);
});

test("Owner identity and public contact links use supplied values", () => {
  assert.match(html, /Hanyu <span class="preferred-name">\(Harry\)<\/span> Dai/);
  assert.match(html, /Vancouver, BC/);
  assert.match(html, /href="mailto:dai.hany@northeastern.edu"/);
  assert.match(html, /href="https:\/\/www.linkedin.com\/in\/hanyu-dai\/"/);
  assert.doesNotMatch(html, /isSelfProfile/);
  assert.match(html, /<title>Hanyu \(Harry\) Dai/);
});

test("Hero omits the redundant portfolio and location line while contact retains location", () => {
  const hero = html.match(/<section[^>]*class="hero"[\s\S]*?<\/section>/)?.[0] || "";
  assert.doesNotMatch(hero, /Personal portfolio|Vancouver, BC|class="eyebrow"/);
  assert.match(hero, /<h1 id="hero-title">/);
  assert.match(html, /<p class="contact-location">Based in Vancouver, BC\.<\/p>/);
});

test("Personal photography uses all nine supplied assets accessibly", () => {
  assert.match(html, /id="photography"/);
  assert.match(html, /id="personal-photos"/);
  assert.match(html, /Photography, food, hiking, and road trips/);
  const images = [...html.matchAll(/<img\b[^>]*>/g)];
  assert.equal(images.length, 9);
  for (const [tag] of images) {
    assert.match(tag, /alt="[^"]+"/);
    assert.match(tag, /width="\d+" height="\d+"/);
    assert.match(tag, /loading="lazy" decoding="async"/);
    const source = tag.match(/src="\/([^"]+)"/)[1];
    assert.ok(read(source).length > 0, "Missing photo: " + source);
  }
  assert.match(html, /<details class="more-photos">/);
  assert.match(html, /id="more-photos"/);
  assert.match(html, /<figcaption>Salt lake<\/figcaption>/);
  assert.match(html, /<figcaption>Winter in Banff<\/figcaption>/);
  assert.match(html, /<figcaption>Meteors<\/figcaption>/);
  assert.match(html, /alt="Meteors crossing a star-filled sky above a wooded hillside and rooftops\."/);
  assert.doesNotMatch(html, /<figcaption>(Winter reflection|Night sky)<\/figcaption>/);
  assert.match(html, /<summary>More photographs<\/summary>/);
  for (const caption of html.matchAll(/<figcaption>(.*?)<\/figcaption>/g)) {
    assert.doesNotMatch(caption[1], /<span>|\d/);
  }
  assert.match(css, /grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /object-fit:\s*contain/);
});

const runPhotoScript = (random, withGallery = true) => {
  const photographs = Array.from({ length: 9 }, (_, index) => ({ id: index }));
  const gallery = (items) => ({
    items,
    querySelectorAll: () => items,
    replaceChildren(...children) { this.items = children; },
  });
  const selected = gallery(photographs.slice(0, 3));
  const more = gallery(photographs.slice(3));
  const context = createContext({
    Math: Object.assign(Object.create(Math), { random }),
    document: {
      querySelector(selector) {
        if (!withGallery) return null;
        return selector === "#personal-photos" ? selected
          : selector === "#more-photos" ? more : null;
      },
    },
  });
  runInContext(read("script.js"), context);
  return { context, selected, more };
};

test("Random selection retains exactly three unique photos and all six others", () => {
  for (const value of [0, 0.5, 0.999999]) {
    const { selected, more } = runPhotoScript(() => value);
    assert.equal(selected.items.length, 3);
    assert.equal(more.items.length, 6);
    const all = [...selected.items, ...more.items].map((photo) => photo.id);
    assert.equal(new Set(all).size, 9);
    assert.deepEqual(all.sort((a, b) => a - b), Array.from({ length: 9 }, (_, i) => i));
  }
  const first = runPhotoScript(() => 0).selected.items.map((photo) => photo.id);
  const second = runPhotoScript(() => 0.999999).selected.items.map((photo) => photo.id);
  assert.notDeepEqual(first, second);
});

test("Shuffle handles empty and single lists without mutating inputs", () => {
  const { context } = runPhotoScript(() => 0, false);
  for (const input of [[], [1], [1, 2, 3]]) {
    const before = [...input];
    const output = context.shufflePhotos(input, () => 0);
    assert.deepEqual(input, before);
    assert.deepEqual([...output].sort(), [...input].sort());
  }
});

test("Every WebP variant is present and has no EXIF or XMP chunks", () => {
  const files = new Set([...html.matchAll(/\/assets\/photos\/([a-z-]+\.webp)/g)].map((match) => match[1]));
  assert.equal(files.size, 14);
  for (const file of files) {
    const buffer = readFileSync(new URL("../assets/photos/" + file, import.meta.url));
    assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
    assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
    for (let offset = 12; offset + 8 <= buffer.length;) {
      const chunk = buffer.toString("ascii", offset, offset + 4);
      assert.ok(!["EXIF", "XMP "].includes(chunk), "Sensitive metadata in " + file);
      const size = buffer.readUInt32LE(offset + 4);
      assert.ok(offset + 8 + size <= buffer.length, "Invalid chunk in " + file);
      offset += 8 + size + (size % 2);
    }
  }
});
