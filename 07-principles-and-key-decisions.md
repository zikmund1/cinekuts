# Principles & Key Decisions

## Non-Negotiable Brand Principles
- **AI for production, never taste.** The brand's credibility depends on this distinction being clear and publicly stated. Cinekuts does not claim "100% human, no AI" — that would misrepresent the actual pipeline. Instead, it draws an honest line: AI handles voiceover, drafting, and graphics; taste, curation, and scoring are Vojtech's alone.
- **Curated-only content.** Flooding the site with unreviewed catalog entries was explicitly rejected. Every published title has a real review; quality over quantity.

## Risk-Mitigation Decisions
- **Clip audio muted by default.** Two independent risks: (1) it's necessary to satisfy YouTube's reused-content policy, which caused the original YPP rejection, and (2) movie clip audio separately risks Content ID claims from music/score publishers.
- **Cash giveaways over streaming gift cards.** Gift cards have severe region-lock issues; PayPal/Wise cash avoids this.
- **No multi-source rating aggregation.** No public APIs exist for RT/Metacritic/Letterboxd, scraping carries ToS risk, and aggregating outside scores would undermine the Kuts Score's editorial distinctiveness — a core differentiator.
- **TikTok organic comment automation is not attempted.** TikTok's Comments API only covers paid campaigns; manual replies are the only viable path for organic content, so this isn't built as a feature.

## Working Style & Process
- **Planning mode first, execution second** — Vojtech prefers to map the full landscape and decide before building.
- **~1–2 hours/day** of working time, with flexibility to scale up — this is why automation, reusable templates, and efficient pipelines are prioritized over manual repetition.
- **Self-hosted, API-driven tooling preferred** over SaaS subscriptions where feasible, to avoid vendor lock-in and recurring costs.
- **Platform-differentiated content, never identical cross-posting** (see `05-social-and-automation.md`).
- **Content format rotates** across straight review, comparison, and underrated-vs-overrated.
- **Fixed 14-tag mood vocabulary** used consistently across the site (see `01-brand-and-positioning.md`).
- **Review workflow:** Vojtech provides structured notes per title → Claude expands into a polished review in his voice, with grammar correction.
