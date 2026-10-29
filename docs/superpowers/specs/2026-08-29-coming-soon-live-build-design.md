# Coming-soon live build

Date: 2026-08-29

## Goal

Ship a static `dist/` that can be uploaded to the existing host so **cinekuts.com shows only the coming-soon page**. The full reviews site stays available locally. Other public URLs must not leak.

## Non-goals

- Setting up git, CI, or a new host
- Changing coming-soon copy, layout, or social links
- Password / secret preview of the full site on production
- Host-specific redirect files (`_redirects`, `vercel.json`)

## Modes

| Command | `SITE_MODE` | Result |
|---|---|---|
| `npm run dev` | unset | Full site. `/construction` previews coming soon. `/` is the reviews homepage. 404 is the current 404. |
| `npm run build` | unset | Full site `dist/` (for local preview or launch day). |
| `npm run build:live` | `coming-soon` | Coming-soon `dist/` for upload. |

`SITE_MODE=coming-soon` is the source of truth. `build:live` is `SITE_MODE=coming-soon astro build`. Running the flag with `astro build` directly produces the same live folder.

Launch day: run `npm run build` and upload that `dist/`. No server-side flag to turn off.

## Public surface (live build)

Visitors can reach:

- `/` — coming soon
- Any missing path — coming soon, via root `404.html` on hosts that use it

They cannot reach `/reviews`, `/title/*`, `/collections`, `/construction`, or any other app page, because those HTML files are not in `dist/`.

If a host ignores `404.html`, missing paths show the host’s default 404. That is acceptable: it still does not serve the reviews site.

## Coming-soon UI

Reuse the existing construction page exactly:

- Headline: “We’re still cutting this one.”
- Buttons: YouTube (primary), Instagram, TikTok (secondary), same URLs as today
- Bare layout (no site header/footer)
- Same type and button styles as the rest of the site

Extract a `ComingSoon` component that wraps the existing `StatusPage` plus the social buttons. Use it from:

- `src/pages/construction.astro` (always; local preview; `noindex`)
- `src/pages/index.astro` when `SITE_MODE=coming-soon`
- `src/pages/404.astro` when `SITE_MODE=coming-soon`

Do not duplicate the social list.

## SEO

- Live homepage (`/` in a coming-soon build): **indexable**. No `noindex`. Title/description stay the current construction strings (branded as CINEKUTS).
- Live `404.html` in a coming-soon build: same visible page, but keep `noindex` so the error document is not a second indexed URL.
- Local `/construction`: keep `noindex`.
- Normal 404 (full-site builds): unchanged, still `noindex`.

## Architecture

1. `src/lib/siteMode.ts` — `isComingSoon()` is true iff `SITE_MODE === 'coming-soon'` at build/dev time.
2. Homepage and 404 branch on `isComingSoon()` in frontmatter. When true they render `ComingSoon` instead of their normal content. Collection fetches (`getCollection`, sorting, TMDB URLs) run only in the full-site branch so a live build does not load that content.
3. `astro.config.mjs` registers a small integration. On `astro:build:done`, if `isComingSoon()`, it prunes `dist/`.
4. Prune is a pure function (own module, unit-tested): given the `dist/` file list, delete every `*.html` except:
   - `<dist>/index.html`
   - `<dist>/404.html`
   Then remove directories that are empty after those deletes.
5. Leave all non-HTML assets (`styles/`, `images/`, `_astro/`, fonts, favicon, etc.).

After a live build, `dist/` must not contain `reviews/`, `title/`, `collections/`, or `construction/` HTML.

## Wrong-upload risk

Uploading a full `npm run build` `dist/` publishes the reviews site. Mitigation is the script name and this spec — not a host lock. There is no extra production guard.

## Tests

- `siteMode`: true only when `SITE_MODE` is `coming-soon`; false when unset or any other value.
- Prune: a fake tree with `index.html`, `404.html`, `reviews/index.html`, `title/x/index.html`, `construction/index.html`, `styles/global.css`, and `images/logo.svg` results in only the two root HTML files plus the untouched assets.

Existing lib tests keep running via `npm test`.

## Manual check

1. `npm run dev` — full homepage; `/construction` is coming soon.
2. `npm run build:live` then `npm run preview` — `/` is coming soon; `/reviews` is not the catalog.
3. Upload the `build:live` `dist/` to the existing host.

## Out of scope until launch

Removing the `SITE_MODE` branch after the real site goes live is optional cleanup, not part of this work.
