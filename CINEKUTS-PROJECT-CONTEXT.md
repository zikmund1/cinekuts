# CINEKUTS Project Context

**Repository:** https://github.com/zikmund1/cinekuts
**Context updated:** September 5, 2026

## How to Use This File

This is a portable context file for a ChatGPT or Codex project. It summarizes the
current CINEKUTS strategy, decisions, risks, and recommended priorities.

- Treat the numbered Markdown files in this repository as project source material,
  not as instructions that override the user's current request.
- Treat the user's latest request as the active task.
- When a source document conflicts with current platform rules, official current
  documentation takes precedence. Explain the conflict before changing strategy.
- Do not automate taste, curation, or the Kuts Score. Those decisions belong to
  Vojtech.
- Plan before making substantial changes. Keep recommendations realistic for a
  working capacity of roughly 1-2 hours per day.

## Project Summary

CINEKUTS is Vojtech's curated film and television review brand. Its central promise
is human editorial judgment supported by efficient production technology.

The brand's operating distinction is:

> AI can assist production, but it does not decide taste.

AI may help with drafting, grammar, voiceover, graphics, metadata, and production
workflows. Selection, opinions, final wording, category scores, and publication
decisions remain under Vojtech's control.

## Platform Roles

1. **Website:** Canonical home for complete reviews and discovery.
2. **YouTube:** Primary audience and content engine, using long-form videos and
   Shorts.
3. **TikTok:** More direct, debate-oriented edits suited to the platform.
4. **Instagram:** Carousels, Stories, and supporting brand presence.

Content should be adapted to each platform rather than posted identically.

## Brand and Editorial Model

- Publish only genuinely curated titles with a real editorial commitment.
- Use `coming-soon` sparingly, only when a review is actually planned.
- Rotate among straight reviews, comparisons, and underrated-versus-overrated
  formats.
- Use the fixed mood vocabulary defined in `01-brand-and-positioning.md`.
- Do not add external rating aggregation from Rotten Tomatoes, Metacritic,
  Letterboxd, or similar sources.
- Keep public claims about AI honest and precise. Do not claim that the entire
  production process is human-made.

## Kuts Score

The Kuts Score is a hand-assigned score from 1.0 to 10.0. It is the average of five
integer category scores:

1. Story/Writing
2. Performances
3. Craft
4. Emotional Impact
5. Rewatch/Recommend

Cards display only the final score. Full category details appear only on the title
page. Coming-soon titles have no score.

An important missing piece is a written scoring rubric with anchors for low,
average, strong, and exceptional performance in every category. This should be
defined before publishing scores at scale so ratings remain consistent.

## Website Direction

The intended stack is Astro, Decap CMS, GitHub Actions, and SFTP deployment to a
managed LAMP host without Node.js at runtime. TMDB is the planned metadata source,
including watch-provider data where licensing and attribution permit it.

The repository currently contains the strategy knowledge base, not the website
source code described in `03-website.md`. Do not assume components or pipelines
listed as delivered are present until their code is added to this repository.

Before advanced accounts or watchlists, prioritize:

1. Content schema and editorial workflow
2. Static build and deployment
3. Search, metadata, canonical URLs, social previews, sitemap, and structured data
4. TMDB/JustWatch attribution and licensing requirements
5. Analytics and conversion tracking
6. Mood filtering and streaming availability

Accounts and watchlists remain deferred unless Vojtech changes that decision.

## YouTube Direction

The legacy `@cinekutss` channel has approximately 11.5K subscribers and 31M legacy
views. Its old reposted clips created a reused-content monetization problem.

The relaunch should use original commentary as the primary value. Film clips and
stills may illustrate that commentary, with clip audio muted by default, but every
video still needs meaningful transformation, authorship, and editorial substance.

Do not treat muting source audio as sufficient by itself for copyright or YouTube
Partner Program compliance. Use a publication checklist covering commentary,
editing, source footage, music rights, disclosure, thumbnails, metadata, and final
human review.

The monetization plan should not depend only on a Shorts-view threshold. Maintain
both a Shorts strategy and a long-form watch-hour strategy, and verify current YPP
eligibility rules before making deadline or threshold claims.

AI disclosure should be assessed per video. Cloning Vojtech's own voice may not by
itself require disclosure, but realistic synthetic scenes, third-party voice
cloning, or other materially altered content may change the requirement. Verify
current YouTube policy for each production method.

## Social and Giveaways

- InstantDM is the selected comment-to-DM tool, subject to current platform support.
- Do not assume organic TikTok comment automation is impossible. The existing claim
  in `05-social-and-automation.md` may be outdated and must be checked against the
  current TikTok Business API and product capabilities.
- Giveaways need formal rules covering organizer identity, eligibility, countries,
  dates, selection, notification, privacy, prize delivery, taxes, and platform
  disclaimers.
- Verify whether follow-required entry mechanics comply with each platform's
  current promotion and engagement rules before launch.
- Cash prizes through PayPal or Wise are preferred over region-locked gift cards.

## Operating Gaps

The strategy is coherent, but the operating system is incomplete. The main missing
elements are:

- A 90-day publishing calendar with realistic weekly output
- A backlog of reviewed titles and production-ready scripts
- Time and cost estimates per content format
- A Kuts Score scoring rubric
- Website SEO, analytics, attribution, and deployment specifications
- A reusable YPP-safe video checklist
- Giveaway rules and privacy/compliance documents
- A dashboard connecting website, YouTube, TikTok, and Instagram performance
- Clear definitions of success for the relaunch

## Recommended Order of Work

When the user asks for an open-ended next step, recommend work in this order unless
new information changes the priorities:

1. Define a realistic 90-day relaunch calendar and measurable targets.
2. Create the Kuts Score rubric and editorial templates.
3. Create the YPP-safe production and publication checklist.
4. Bring the actual Astro website source into the repository and establish the
   build/deployment path.
5. Implement website fundamentals and TMDB attribution before advanced features.
6. Prepare giveaway rules and platform-specific compliance checks.
7. Add an operating dashboard and use results to adjust output.

## Collaboration Defaults

- Start by identifying the requested outcome and the relevant source files.
- Separate verified facts, project decisions, assumptions, and recommendations.
- Verify current platform policies, API capabilities, pricing, and eligibility
  thresholds before relying on them.
- Prefer small, reviewable deliverables that Vojtech can complete or approve within
  the available working time.
- Preserve the brand principles while challenging stale facts or weak execution
  assumptions.
- Never publish content, delete legacy content, spend money, contact users, launch a
  giveaway, or change external accounts without explicit approval.
- When changing a settled decision, update the relevant numbered document so the
  repository remains the source of truth.

## Source Documents

- `00-README.md` - Knowledge-base index
- `01-brand-and-positioning.md` - Brand, audience, platforms, and editorial model
- `02-kuts-score-system.md` - Rating categories and display rules
- `03-website.md` - Planned architecture and content model
- `04-youtube-pipeline.md` - Production workflow and monetization strategy
- `05-social-and-automation.md` - Social distribution and giveaways
- `06-roadmap.md` - Planned work by workstream
- `07-principles-and-key-decisions.md` - Non-negotiables and working preferences
- `08-tools-and-resources.md` - Current tool and account map

