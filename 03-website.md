# Website

## Tech Stack
- **Framework:** Astro
- **CMS:** Decap CMS
- **CI/CD:** GitHub Actions
- **Hosting:** cesky-hosting VMS Optimal — managed LAMP environment, no root access, no Node.js at runtime
- **Deploy method:** GitHub Actions builds the site, then deploys via SFTP to the LAMP host

## Delivered So Far
- `src/content/config.ts` with the curated content schema
- Two-state page template (published / coming-soon)
- Editorial Grid homepage layout
- Dark theme with orange accent color `#EA5A2A`
- Typography: Anton (display) + Work Sans (body)
- `TrustStrip.astro` component

## Content Model
- Single `titles` content collection
- `type` field: `movie | tv`
- Curated-only — every entry has a real review (see `01-brand-and-positioning.md`)
- `coming-soon` reserved for explicitly committed upcoming titles

## Integrations
- **TMDB API** — planned/in progress for title metadata; also provides JustWatch streaming availability data (attribution required)
- Live TMDB API fetching is an active build item

## Deferred / Future
- Mood-based filtering and sorting → **Phase 4** (see `06-roadmap.md`)
- User accounts and watchlists → architecturally deferred, likely Supabase or Firebase if/when built
