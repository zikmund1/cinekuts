# YouTube Pipeline

## Background: Why the Relaunch Needs a New Approach
The legacy @cinekutss channel (~11.5K subs, 31M views, dormant 450+ days) was rejected from YPP because its old content was reposted clips with no commentary — a violation of YouTube's reused-content policy. The 17 old Shorts need to be deleted before reapplying.

## New Pipeline Philosophy
VO-driven commentary is the primary narrative layer. Muted film clips/stills are used only as illustration underneath the commentary — this directly addresses the reused-content rejection reason.

**Clip audio is muted by default** for two independent reasons:
1. It's required to avoid the reused-content policy issue
2. Movie clip audio also risks Content ID claims from music/score publishers, regardless of the content policy

## Review Workflow
1. Vojtech fills a structured review-input template (raw notes are fine)
2. Claude expands the notes into a polished review in Vojtech's voice, with grammar correction

## Script Templates (3 built)
| Template | Structure |
|---|---|
| Review input | Structured intake form for Vojtech's raw notes |
| Long-form | Hook → Setup → What Worked → What Didn't → Standout Moment → Verdict |
| Shorts | Hook → Payoff → Score Reveal → CTA |

The long-form template also flags the best Shorts candidate from within that piece.

## Content Produced So Far
Scripts exist for: **Silo** (Apple TV+), **Ted Lasso** (Apple TV+), **Apex** (Netflix)

## Voiceover Strategy
| Option | Notes |
|---|---|
| **OmniVoice** (preferred near-term) | Pay-as-you-go, zero-shot voice clone from 3–30 seconds of audio, Apache 2.0 commercial license. Better fit for an uneven, relaunch-phase publishing cadence. |
| ElevenLabs | Remains under evaluation |

Plan: test both on the same script before committing. Since Vojtech clones his own voice, **YouTube's AI-disclosure requirement does not apply**.

## YPP Reapplication Strategy
Shorts-heavy cadence, chasing the 10M-view path, timed ahead of the eligibility threshold doubling for new applicants on **February 1, 2027**.

## APIs & Tooling
- YouTube Data API v3, under the **"Cinekuts Hub"** GCP project, OAuth Desktop app credentials
- `claude-youtube` GitHub skill with slash commands (`/youtube seo`, `/youtube metadata`, etc.)
- Planned: `youtube-mcp` server on the iMac hub (built on mrchevyceleb's youtube-mcp + meta-mcp), reusing the existing Cinekuts Hub GCP credentials
- Planned: a competitor + own-channel analytics tracker script against the YouTube Data and Analytics APIs
