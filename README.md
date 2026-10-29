# CINEKUTS website

Astro 4 static site. This task's working copy was imported from
`/Users/vojtechzikmund/Desktop/WEB-DEV/cinekuts_web` on 6 September 2026.
The original folder is unchanged. Use this working copy for subsequent edits.

## Setup and preview

Requires Node 22. Install locked dependencies with `npm ci`.

- `npm run dev` — local design preview, including clearly labelled sample content.
- `npm test` — content visibility, giveaway, filtering, video URL and coming-soon checks.
- `npm run build:preview` — sample-inclusive output for local design review; marked noindex.
- `npm run build` — full production site, excluding sample entries and collections referencing hidden titles.
- `npm run build:live` — existing coming-soon launch page; strips other HTML except the 404 page.
- `npm run preview` — serve the last build. Check which build you ran first.

Builds replace `dist/`. Only deploy the output of the intended production command.
No hosting configuration or deployment has been changed.

## Publish a review

Edit Markdown in `src/content/titles/`. Existing entries are unconfirmed samples
(`sample: true`), preserved for design work. A real review needs your own writing,
confirmed scores, appropriate `status`, publication date and video link.
Only remove `sample: true` when the entry is ready for public use.
`coming-soon` means a real commitment to review a title, not a general watchlist.

Optional frontmatter fields are rendered only when filled:

```yaml
reviewer: "Your byline"
reviewScope: "Season 1" # TV coverage, when applicable
verdict: "Your short verdict"
intendedAudience: "Your intended audience"
mainReservation: "Your main reservation"
```

The five-category scoring rubric is unchanged. Keep `kutsScore` consistent with
the arithmetic average of `kutsScoreBreakdown`; these are your editorial scores.
Remove development placeholder paragraphs and replace channel URLs with actual
review video links before publication.

## Publish a collection

Edit `src/content/lists/`. Set `sample: false` only after approving the article.
Use `kind: title` with a title `slug` when a review exists; this reuses its poster,
score and link. Use `kind: mention` for other films, with your original commentary.
Referenced titles must also be visible for the collection to appear in production.
`youtubeUrl` is optional: leave it absent until the matching video is available.
The newest visible collection is featured on the homepage.

## Giveaways

The supplied giveaway is inactive sample content. No recurring schedule is enabled.
A giveaway appears only with `sample: false`, `status: live` and a future `endsAt`.
Confirm the headline, prize, entry link, deadline and terms before activating it.
Use an explicit timestamp with timezone for `endsAt`.

This is a static site: expiry is evaluated at build time. Rebuild and deploy at
the closing deadline (or mark it ended and rebuild) to remove the public CTA.
Without a live giveaway, its navigation link is also hidden.

## Maintenance

Images use existing TMDB URLs; no live metadata integration, accounts, CMS or
new paid services were added. Review desktop and mobile layouts in the local
preview before launch. Real editorial content and the final scoring rubric
remain to be confirmed.
