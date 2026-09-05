# Kuts Score System

## Overview
The Kuts Score is Cinekuts' proprietary rating system — a 1.0–10.0 decimal score, hand-scored by Vojtech only. Nothing about it is algorithmic or pulled from external ratings sources (no RT/Metacritic/Letterboxd aggregation).

## The Five Categories
Each scored as an integer from 1–10:

| Category |
|---|
| Story/Writing |
| Performances |
| Craft |
| Emotional Impact |
| Rewatch/Recommend |

## Calculation
`kutsScore` = average of the five category integers, expressed as a decimal (e.g. 9.4).

## Data Storage (title markdown frontmatter)
- `kutsScoreBreakdown` — the five integer category scores
- `kutsScore` — the averaged decimal, derived from the breakdown

## Display Rules
| Context | What's shown |
|---|---|
| Cards, media walls, review rails | Orange pill with `kutsScore` only (e.g. "9.4") |
| Title detail page | Full 5-category breakdown with bars, plus the pill |
| Coming-soon titles | No score at all |

## "We Just Loved" Ranking
The homepage's top-5 "We just loved" module sorts strictly by `kutsScore`.

## What It's Explicitly Not
- Not algorithmic
- Not pulled from or blended with external rating sources
- Not shown as a breakdown anywhere except the title detail page

## Why External Rating Aggregation Was Rejected
- No public APIs exist for Rotten Tomatoes, Metacritic, or Letterboxd
- Scraping those sites carries ToS risk
- More fundamentally: the Kuts Score's editorial distinctiveness is a core brand differentiator — blending in outside scores would undermine the whole point of a hand-scored system
