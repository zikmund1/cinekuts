# CINEKUTS website development rules

## Product source of truth

Before planning or implementing product work, read [`docs/CINEKUTS_PRODUCT.md`](docs/CINEKUTS_PRODUCT.md). It defines the vision, MVP boundary, recommendation architecture, roadmap, current constraints, and open decisions.

When a change affects scope, UX, the content/data model, privacy, operating cost, or architecture, update the product specification or add a linked decision record in the same change. Historical documents under `docs/superpowers/` describe earlier work; treat them as context, not current instructions.

## Preserve the working baseline

- Inspect `git status` and relevant diffs before editing. Preserve user changes and avoid unrelated formatting.
- Keep the existing routes, content, Kuts Score, collections, public YouTube links, TMDB attribution, responsive dark design, and accessibility behavior unless an approved change replaces them.
- Preserve the `sample` visibility boundary: sample content may appear in development/explicit preview, never in the normal production build.
- Preserve the separate production, preview, and coming-soon build behavior. Do not deploy a preview or stale `dist/` accidentally.
- Do not remove or rename public URLs without a redirect and migration plan.
- This repository was imported before its first commit. Establish and verify the baseline before broad refactors.

## Architecture boundaries

- Prefer Astro for pages, content and static rendering. Add React islands only where persistent client state is useful, chiefly the recommendation chat.
- The static host cannot safely hold AI or database secrets. Use a separately deployed server-side endpoint for recommendations, rate limiting and privileged database access unless hosting is explicitly changed.
- Keep editorial content, catalog metadata, retrieval/ranking, AI-provider adapters, analytics, and UI as separate concerns.
- A title may exist in the recommendation catalog without having a CINEKUTS review. Never imply editorial coverage or a Kuts Score when none exists.
- Retrieve candidates from the database before calling AI. Models may select and explain only supplied internal IDs. Validate structured output and render all facts from trusted data.
- Keep AI providers behind a small interface. Vendor-specific types must not leak into components or domain logic.
- Provide deterministic recommendations when AI is unavailable, plus a configuration kill switch.
- Never expose Supabase service-role keys, AI credentials, owner YouTube Analytics, OAuth tokens, private reports, or internal analytics to the browser.

## Product and safety rules

- The homepage should lead with the recommendation experience while retaining clear paths to reviews, collections and YouTube.
- Editorial scores and opinions are human. AI assists discovery; it does not decide what is good or manufacture CINEKUTS judgments.
- Spoilers are off by default. Do not include spoiler text in prompts, metadata, summaries or UI until the user explicitly opts in for that interaction.
- Do not require registration for the MVP chat.
- Validate and bound every client-controlled value. Add rate limits, timeouts, spend controls, usage measurement and safe failure states before enabling public AI calls.
- Minimize chat data. Full conversations do not belong in ordinary analytics or logs.
- Keep accounts, synchronized watchlists, community features and monetization outside MVP unless the user explicitly changes scope.
- Maintain semantic HTML, keyboard access, visible focus, reduced-motion support, responsive behavior and measured performance.

## Content rules

- Do not publish sample or placeholder copy as real editorial content.
- Kuts Score is editorial data. Keep the aggregate consistent with its five-category breakdown and do not let AI generate or change it.
- Preserve source/provenance for imported metadata and the required attribution for images/providers.
- `coming-soon` is an explicit editorial commitment, not a generic catalog status.
- Public YouTube integration uses public video IDs/URLs only; private channel analytics stays in the separate analytics repository.

## Quality gates

- Use locked dependencies (`npm ci`) for reproducible setup.
- Run the narrowest relevant tests while iterating, then `npm test` and the appropriate Astro build before handoff when code, content schema, configuration or UI changes.
- For production readiness, test recommendation schema validation, catalog constraints, spoiler behavior, authorization, rate limiting, deterministic fallback and the homepage-to-title journey.
- Do not perform deployments, create paid services, authorize external accounts, or push to GitHub unless the user asks.

## Time-sensitive decisions

- Record provider pricing, model versions, quotas and external-service behavior with a source and verification date.
- Benchmark Ministral 8B, Gemini 2.5 Flash-Lite and GPT-6 Luna on the same Czech evaluation set before selecting a production default.
- Flag conflicts with current hosting or functional behavior before changing architecture.
