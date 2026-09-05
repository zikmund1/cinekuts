# Roadmap — On the Horizon

Organized by workstream, not strict priority order. Cross-reference the relevant domain file for background on each item.

## YouTube / YPP
- Reapply for YPP using a Shorts-heavy cadence to chase the 10M-view eligibility path before the threshold doubles for new applicants (deadline: **February 1, 2027**)
- Delete the 17 legacy Shorts before reapplying
- Build a competitor + own-channel analytics tracker script against the YouTube Data and Analytics APIs
- Build the `youtube-mcp` server on the iMac hub (mrchevyceleb's youtube-mcp + meta-mcp), reusing existing Cinekuts Hub GCP credentials

## Website
- Finish Decap CMS setup and the GitHub Actions deploy pipeline
- Live TMDB API fetching
- **Phase 4:** mood-based filtering and sorting, using the fixed 14-tag vocabulary
- User accounts and watchlists — architecturally deferred, possible future build on Supabase or Firebase
- Flickmetrix-style feature parity: filter/sort/mood/streaming-availability layer is near-term; multi-source rating aggregation is explicitly and permanently skipped; accounts/watchlists remain a separate future decision

## Brand / Visual Identity
- "Guard character" visual concept in development: featureless mask, chrome desk, deep amber-orange backlight, dark void background — for channel intro/outro and Kuts Score reveal moments

## Audio / Music Licensing
Hybrid approach:
- Subscription library (e.g. Epidemic Sound) for variable, everyday music beds
- Perpetual/one-time licenses reserved for core brand-identity moments: the intro sting and the Kuts Score reveal stinger
