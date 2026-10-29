# Coming-soon Live Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an uploadable `dist/` that contains only the existing coming-soon page (plus assets), while local `dev`/`build` still serve the full reviews site.

**Architecture:** `SITE_MODE=coming-soon` is a build-time flag. Homepage and 404 render a shared `ComingSoon` component when the flag is on. After a coming-soon Astro build, a prune step deletes every HTML file except root `index.html` and `404.html`, then removes empty directories. `npm run build:live` is `SITE_MODE=coming-soon astro build`.

**Tech Stack:** Astro 4 static output, Node built-in test runner (`src/lib/*.test.ts`), existing `StatusPage` + `Base` (`bare`).

## Global Constraints

- Coming-soon headline is exactly `We’re still cutting this one.` (curly apostrophe).
- Social buttons stay YouTube `https://www.youtube.com/@cinekutss` (primary), Instagram `https://www.instagram.com/cinekuts/`, TikTok `https://www.tiktok.com/@cinekuts` (secondary).
- Do not duplicate the social list; it lives only in `ComingSoon.astro`.
- Live homepage is indexable (no `robots` meta). Live 404 and `/construction` stay `noindex`.
- Collection fetches (`getCollection`) must not run in the coming-soon homepage branch.
- Prune keeps only `<dist>/index.html` and `<dist>/404.html` as HTML; leave `styles/`, `images/`, `_astro/`, fonts, favicon.
- No git, CI, host config, `_redirects`, or `vercel.json`.
- This folder may not be a git repo. Skip every Commit step if `git rev-parse --is-inside-work-tree` fails.
- Tests run with: `node --experimental-strip-types --test src/lib/*.test.ts`

## File map

| File | Responsibility |
|---|---|
| `src/lib/siteMode.ts` | `isComingSoon(env?)` — true iff `SITE_MODE === 'coming-soon'` |
| `src/lib/siteMode.test.ts` | Mode tests |
| `src/lib/comingSoonPrune.ts` | `shouldKeepHtml`, `pruneComingSoonDist` |
| `src/lib/comingSoonPrune.test.ts` | Prune tests against a temp tree |
| `src/components/ComingSoon.astro` | Status heading + social buttons |
| `src/pages/construction.astro` | Local preview wrapper (`noindex`, `bare`) |
| `src/pages/index.astro` | Full homepage, or ComingSoon when gated |
| `src/pages/404.astro` | Current 404, or ComingSoon + `noindex` when gated |
| `astro.config.mjs` | `coming-soon-gate` integration, prune on `astro:build:done` |
| `package.json` | `build:live` script |

---

### Task 1: siteMode helper

**Files:**
- Create: `src/lib/siteMode.ts`
- Test: `src/lib/siteMode.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `isComingSoon(env?: Record<string, string | undefined>): boolean`

- [ ] **Step 1: Write the failing test**

Create `src/lib/siteMode.test.ts`:

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isComingSoon } from './siteMode.ts';

describe('isComingSoon', () => {
  it('is false when SITE_MODE is unset', () => {
    assert.equal(isComingSoon({}), false);
  });

  it('is true only when SITE_MODE is coming-soon', () => {
    assert.equal(isComingSoon({ SITE_MODE: 'coming-soon' }), true);
  });

  it('is false for any other SITE_MODE value', () => {
    assert.equal(isComingSoon({ SITE_MODE: 'live' }), false);
    assert.equal(isComingSoon({ SITE_MODE: '' }), false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --experimental-strip-types --test src/lib/siteMode.test.ts`

Expected: FAIL with `Cannot find module` / `siteMode.ts` not found.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/siteMode.ts`:

```ts
export function isComingSoon(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return env.SITE_MODE === 'coming-soon';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --experimental-strip-types --test src/lib/siteMode.test.ts`

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/siteMode.ts src/lib/siteMode.test.ts
git commit -m "$(cat <<'EOF'
Add SITE_MODE helper for the coming-soon live build.

EOF
)"
```

Skip if this folder is not a git repo.

---

### Task 2: Coming-soon dist prune

**Files:**
- Create: `src/lib/comingSoonPrune.ts`
- Test: `src/lib/comingSoonPrune.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `shouldKeepHtml(relativePosixPath: string): boolean`
  - `pruneComingSoonDist(distRoot: string): void`

- [ ] **Step 1: Write the failing test**

Create `src/lib/comingSoonPrune.test.ts`:

```ts
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { pruneComingSoonDist, shouldKeepHtml } from './comingSoonPrune.ts';

describe('shouldKeepHtml', () => {
  it('keeps only root index.html and 404.html', () => {
    assert.equal(shouldKeepHtml('index.html'), true);
    assert.equal(shouldKeepHtml('404.html'), true);
    assert.equal(shouldKeepHtml('reviews/index.html'), false);
    assert.equal(shouldKeepHtml('construction/index.html'), false);
    assert.equal(shouldKeepHtml('title/x/index.html'), false);
  });
});

describe('pruneComingSoonDist', () => {
  it('deletes extra HTML and empty dirs, leaves assets', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ck-prune-'));
    const write = (rel: string, body = 'x') => {
      const abs = path.join(root, rel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, body);
    };

    write('index.html');
    write('404.html');
    write('reviews/index.html');
    write('title/x/index.html');
    write('construction/index.html');
    write('styles/global.css', 'body{}');
    write('images/logo.svg', '<svg />');

    pruneComingSoonDist(root);

    assert.equal(fs.existsSync(path.join(root, 'index.html')), true);
    assert.equal(fs.existsSync(path.join(root, '404.html')), true);
    assert.equal(fs.existsSync(path.join(root, 'styles/global.css')), true);
    assert.equal(fs.existsSync(path.join(root, 'images/logo.svg')), true);
    assert.equal(fs.existsSync(path.join(root, 'reviews/index.html')), false);
    assert.equal(fs.existsSync(path.join(root, 'reviews')), false);
    assert.equal(fs.existsSync(path.join(root, 'title')), false);
    assert.equal(fs.existsSync(path.join(root, 'construction')), false);

    fs.rmSync(root, { recursive: true, force: true });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --experimental-strip-types --test src/lib/comingSoonPrune.test.ts`

Expected: FAIL with `Cannot find module` / `comingSoonPrune.ts` not found.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/comingSoonPrune.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';

export function shouldKeepHtml(relativePosixPath: string): boolean {
  return relativePosixPath === 'index.html' || relativePosixPath === '404.html';
}

function toPosix(relativePath: string): string {
  return relativePath.split(path.sep).join('/');
}

function walkFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) out.push(...walkFiles(abs));
    else out.push(abs);
  }
  return out;
}

function removeEmptyDirs(root: string): void {
  const walk = (dir: string) => {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return;
    for (const name of fs.readdirSync(dir)) walk(path.join(dir, name));
    if (dir === root) return;
    if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
  };
  walk(root);
}

export function pruneComingSoonDist(distRoot: string): void {
  for (const abs of walkFiles(distRoot)) {
    if (path.extname(abs).toLowerCase() !== '.html') continue;
    const rel = toPosix(path.relative(distRoot, abs));
    if (!shouldKeepHtml(rel)) fs.unlinkSync(abs);
  }
  removeEmptyDirs(distRoot);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --experimental-strip-types --test src/lib/comingSoonPrune.test.ts`

Expected: PASS (2 describes / 2 tests).

Then: `node --experimental-strip-types --test src/lib/*.test.ts`

Expected: PASS (existing review/youtube tests plus new ones).

- [ ] **Step 5: Commit**

```bash
git add src/lib/comingSoonPrune.ts src/lib/comingSoonPrune.test.ts
git commit -m "$(cat <<'EOF'
Add coming-soon dist prune that drops every HTML file except index and 404.

EOF
)"
```

Skip if this folder is not a git repo.

---

### Task 3: ComingSoon component and construction page

**Files:**
- Create: `src/components/ComingSoon.astro`
- Modify: `src/pages/construction.astro`

**Interfaces:**
- Consumes: `StatusPage` (`heading: string`, default slot for actions)
- Produces: `<ComingSoon />` with no props — heading and socials are fixed

- [ ] **Step 1: Create ComingSoon.astro**

Create `src/components/ComingSoon.astro`:

```astro
---
import StatusPage from './StatusPage.astro';

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@cinekutss" },
  { label: "Instagram", href: "https://www.instagram.com/cinekuts/" },
  { label: "TikTok", href: "https://www.tiktok.com/@cinekuts" },
];
---
<StatusPage heading="We’re still cutting this one.">
  {socials.map((social, i) => (
    <a
      class:list={["btn", i === 0 ? "btn-primary" : "btn-secondary"]}
      href={social.href}
      target="_blank"
      rel="noreferrer"
    >
      {social.label}
    </a>
  ))}
</StatusPage>
```

- [ ] **Step 2: Point construction.astro at ComingSoon**

Replace `src/pages/construction.astro` with:

```astro
---
import Base from '../layouts/Base.astro';
import ComingSoon from '../components/ComingSoon.astro';
---
<Base
  title="Under construction"
  description="We’re still cutting this one. Follow along on YouTube, Instagram, and TikTok."
  robots="noindex"
  bare
>
  <ComingSoon />
</Base>
```

- [ ] **Step 3: Verify construction still builds**

Run: `npx astro build`

Expected: build succeeds. `dist/construction/index.html` contains `We’re still cutting this one.` and the three social hrefs, and includes `<meta name="robots" content="noindex" />`.

Check with:

```bash
node --experimental-strip-types --test src/lib/*.test.ts
rg -F "We’re still cutting this one." dist/construction/index.html
rg -F "youtube.com/@cinekutss" dist/construction/index.html
rg -F "instagram.com/cinekuts" dist/construction/index.html
rg -F "tiktok.com/@cinekuts" dist/construction/index.html
rg -F 'name="robots"' dist/construction/index.html
```

Expected: tests pass; all `rg` commands match.

- [ ] **Step 4: Commit**

```bash
git add src/components/ComingSoon.astro src/pages/construction.astro
git commit -m "$(cat <<'EOF'
Extract ComingSoon so construction and the live gate share one page.

EOF
)"
```

Skip if this folder is not a git repo.

---

### Task 4: Gate homepage and 404

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: `isComingSoon()` from `src/lib/siteMode.ts`; `<ComingSoon />`
- Produces: when `SITE_MODE=coming-soon`, `/` and `404.html` render ComingSoon; otherwise existing pages

- [ ] **Step 1: Branch index.astro**

Replace `src/pages/index.astro` with:

```astro
---
import Base from '../layouts/Base.astro';
import ComingSoon from '../components/ComingSoon.astro';
import TrustStrip from '../components/TrustStrip.astro';
import MediaWall from '../components/MediaWall.astro';
import GiveawayCta from '../components/GiveawayCta.astro';
import ReviewRail from '../components/ReviewRail.astro';
import LovedFan from '../components/LovedFan.astro';
import { getCollection } from 'astro:content';
import { isComingSoon } from '../lib/siteMode';

const comingSoon = isComingSoon();

const comingSoonTitle = "Under construction";
const comingSoonDescription = "We’re still cutting this one. Follow along on YouTube, Instagram, and TikTok.";

let latest: { slug: string; data: { title: string } } | undefined;
let wallTiles: { href: string; title: string; image: string; score?: string }[] = [];
let railItems: { href: string; title: string; poster: string; meta: string; score?: string }[] = [];
let liveGiveaway:
  | {
      data: {
        headline: string;
        echo?: string;
        accentPhrase?: string;
        subhead: string;
        ctaLabel: string;
        enterUrl: string;
        note?: string;
      };
    }
  | undefined;
let lovedItems: { href: string; title: string; poster: string }[] = [];

if (!comingSoon) {
  const titles = await getCollection('titles');
  const sorted = titles.sort((a, b) => {
    // Published reviews first (newest first). "coming-soon" entries should be
    // rare (explicit commitments only, not a general backlog) so they sort last.
    if (a.data.status === 'published' && b.data.status !== 'published') return -1;
    if (a.data.status !== 'published' && b.data.status === 'published') return 1;
    return (b.data.publishDate?.getTime() ?? 0) - (a.data.publishDate?.getTime() ?? 0);
  });

  latest = sorted.find((t) => t.data.status === 'published');

  const TMDB_STILL = 'https://image.tmdb.org/t/p/w1280';
  const TMDB_POSTER = 'https://image.tmdb.org/t/p/w500';

  wallTiles = sorted.map((t) => ({
    href: `/title/${t.slug}`,
    title: t.data.title,
    image: `${TMDB_STILL}${t.data.backdropPath || t.data.posterPath}`,
    score: t.data.status === 'published' && t.data.kutsScore != null
      ? t.data.kutsScore.toFixed(1)
      : undefined,
  }));

  liveGiveaway = (await getCollection('giveaways'))
    .filter((g) => g.data.status === 'live')
    .sort((a, b) => (b.data.endsAt?.getTime() ?? 0) - (a.data.endsAt?.getTime() ?? 0))[0];

  railItems = sorted.map((t) => ({
    href: `/title/${t.slug}`,
    title: t.data.title,
    poster: `${TMDB_POSTER}${t.data.posterPath}`,
    meta: `${t.data.type === 'tv' ? 'TV' : 'Movie'} · ${t.data.year}`,
    score: t.data.status === 'published' && t.data.kutsScore != null
      ? t.data.kutsScore.toFixed(1)
      : undefined,
  }));

  lovedItems = titles
    .filter((t) => t.data.status === 'published' && t.data.kutsScore != null)
    .sort((a, b) => (b.data.kutsScore ?? 0) - (a.data.kutsScore ?? 0))
    .slice(0, 5)
    .map((t) => ({
      href: `/title/${t.slug}`,
      title: t.data.title,
      poster: `${TMDB_POSTER}${t.data.posterPath}`,
    }));
}

// Homepage collections strip — enable when 2–3 lists are live.
// 1. import CollectionCard from '../components/CollectionCard.astro';
// 2. const lists = (await getCollection('lists')).sort(
//      (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
// 3. Uncomment the #collections section in the template and resolve posters
//    the same way as src/pages/collections/index.astro.
---
{comingSoon ? (
  <Base title={comingSoonTitle} description={comingSoonDescription} bare>
    <ComingSoon />
  </Base>
) : (
  <Base title="Reviews">
    <TrustStrip latest={latest} />

    <MediaWall tiles={wallTiles} />

    <p class="quote">“Every score is a real opinion. No algorithms decide what’s good.”</p>

    <ReviewRail items={railItems} />

    {liveGiveaway && (
      <GiveawayCta
        headline={liveGiveaway.data.headline}
        echo={liveGiveaway.data.echo}
        accentPhrase={liveGiveaway.data.accentPhrase}
        subhead={liveGiveaway.data.subhead}
        ctaLabel={liveGiveaway.data.ctaLabel}
        enterUrl={liveGiveaway.data.enterUrl}
        note={liveGiveaway.data.note}
      />
    )}

    {lovedItems.length > 0 && <LovedFan items={lovedItems} />}

    {/* Homepage collections strip (v1 stub). Uncomment when 2-3 lists are live. See the frontmatter note for the CollectionCard wiring. */}
  </Base>
)}
```

Do not pass `robots` on the coming-soon homepage.

- [ ] **Step 2: Branch 404.astro**

Replace `src/pages/404.astro` with:

```astro
---
import Base from '../layouts/Base.astro';
import ComingSoon from '../components/ComingSoon.astro';
import StatusPage from '../components/StatusPage.astro';
import { isComingSoon } from '../lib/siteMode';

const comingSoon = isComingSoon();
---
{comingSoon ? (
  <Base
    title="Under construction"
    description="We’re still cutting this one. Follow along on YouTube, Instagram, and TikTok."
    robots="noindex"
    bare
  >
    <ComingSoon />
  </Base>
) : (
  <Base
    title="Page not found"
    description="The page you’re looking for can’t be found."
    robots="noindex"
    bare
  >
    <StatusPage heading="The page you’re looking for can’t be found.">
      <a class="btn btn-primary" href="/">Go back to home</a>
    </StatusPage>
  </Base>
)}
```

The full-site 404 gains `robots="noindex"` (spec: 404 stays noindex). Visible copy and CTA stay the same.

- [ ] **Step 3: Verify default build is still the full site**

Run: `npx astro build`

Expected: success.

```bash
rg -F "Every score is a real opinion" dist/index.html
rg -F "The page you’re looking for can’t be found." dist/404.html
rg -F "We’re still cutting this one." dist/index.html; echo "index_coming_soon_exit:$?"
```

Expected: first two match. Third `rg` does **not** match `dist/index.html` (exit 1). `dist/reviews/index.html` still exists.

- [ ] **Step 4: Verify coming-soon pages without prune**

Run: `SITE_MODE=coming-soon npx astro build`

Expected: success. (Extra HTML still exists until Task 5.)

```bash
rg -F "We’re still cutting this one." dist/index.html
rg -F "We’re still cutting this one." dist/404.html
rg -F 'name="robots"' dist/index.html; echo "index_robots_exit:$?"
rg -F 'name="robots" content="noindex"' dist/404.html
```

Expected: coming-soon copy in both HTML files; homepage has **no** robots meta (exit 1); 404 has `noindex`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/404.astro
git commit -m "$(cat <<'EOF'
Render ComingSoon on the homepage and 404 when SITE_MODE is coming-soon.

EOF
)"
```

Skip if this folder is not a git repo.

---

### Task 5: Live build script and prune integration

**Files:**
- Modify: `astro.config.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `isComingSoon()` from `src/lib/siteMode.ts`; `pruneComingSoonDist(distRoot: string)` from `src/lib/comingSoonPrune.ts`
- Produces: `npm run build:live` → pruned `dist/`

- [ ] **Step 1: Register the integration**

Replace `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { isComingSoon } from './src/lib/siteMode.ts';
import { pruneComingSoonDist } from './src/lib/comingSoonPrune.ts';

export default defineConfig({
  site: 'https://cinekuts.com',
  output: 'static',
  integrations: [
    {
      name: 'coming-soon-gate',
      hooks: {
        'astro:build:done': ({ dir }) => {
          if (!isComingSoon()) return;
          pruneComingSoonDist(fileURLToPath(dir));
        },
      },
    },
  ],
});
```

If Astro refuses the `.ts` imports from `astro.config.mjs`, rename the config to `astro.config.ts` with the same contents (Astro 4 loads TS config). Do not duplicate prune logic.

- [ ] **Step 2: Add the live script**

In `package.json`, add `"build:live": "SITE_MODE=coming-soon astro build"` next to `"build"`:

```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "test": "node --experimental-strip-types --test src/lib/*.test.ts",
  "build": "astro build",
  "build:live": "SITE_MODE=coming-soon astro build",
  "preview": "astro preview",
  "astro": "astro"
}
```

- [ ] **Step 3: Verify full build does not prune**

Run: `npm run build`

Expected: `dist/reviews/index.html` exists; `dist/index.html` contains `Every score is a real opinion`.

- [ ] **Step 4: Verify live build prunes**

Run: `npm test && npm run build:live`

Expected: tests pass; build succeeds.

Then run:

```bash
test -f dist/index.html && test -f dist/404.html && echo "kept_html_ok"
test ! -e dist/reviews && test ! -e dist/construction && test ! -e dist/title && test ! -e dist/collections && echo "extra_pages_gone"
rg -F "We’re still cutting this one." dist/index.html
rg -F "We’re still cutting this one." dist/404.html
rg -F "styles/global.css" dist/index.html
test -f dist/styles/global.css && test -f dist/images/CK-2026-logo-white.svg && echo "assets_ok"
```

Expected: all echoes print; both HTML files are coming soon; CSS and logo remain.

- [ ] **Step 5: Manual preview check**

Run: `npm run preview`

- Open `/` — coming soon, YouTube / Instagram / TikTok, no site header.
- Open `/reviews` — not the catalog (coming soon via 404, or host-style 404).
- Stop preview. Run `npm run build` then `npm run preview` — `/` is the full homepage again.

- [ ] **Step 6: Commit**

```bash
git add astro.config.mjs astro.config.ts package.json
git commit -m "$(cat <<'EOF'
Add build:live so the uploaded dist is coming-soon only.

EOF
)"
```

Skip if this folder is not a git repo. Only add `astro.config.ts` if that file was created; if `astro.config.mjs` still exists, add that instead.

---

## Spec coverage

| Spec item | Task |
|---|---|
| `isComingSoon()` / `SITE_MODE=coming-soon` | 1 |
| Prune HTML except root index + 404; drop empty dirs; keep assets | 2, 5 |
| `ComingSoon` + construction preview `noindex` | 3 |
| Homepage coming-soon, indexable, no collection fetch | 4 |
| Live 404 same page + `noindex` | 4 |
| `build` full site / `build:live` gated | 5 |
| Manual `/` vs `/reviews` check | 5 |
| No git/host/redirect work | Global constraints |
