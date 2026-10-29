import { defineCollection, reference, z } from 'astro:content';

// Curated-only site: every entry in this collection is a title Cinekuts has
// chosen to cover. There is no general "flood the catalog with every TMDB
// title" state. Two statuses only:
//   - "published": a real review is live (score, mood tags, written take)
//   - "coming-soon": explicitly committed to reviewing, not published yet
//     (used sparingly — this is not a placeholder for unreviewed titles
//     in general, only ones you've publicly committed to)
const titles = defineCollection({
  type: 'content',
  schema: z.object({
    sample: z.boolean().default(false),
    // Core identity
    tmdbId: z.number(),
    type: z.enum(['movie', 'tv']),
    title: z.string(),
    year: z.number(),
    posterPath: z.string(), // TMDB poster path, e.g. /abc123.jpg
    backdropPath: z.string().optional(),
    synopsis: z.string(),
    genres: z.array(z.string()).default([]),

    status: z.enum(['published', 'coming-soon']).default('published'),

    // Kuts Score: average of 5 categories (Story/Writing, Performances,
    // Craft, Emotional Impact, Rewatch/Recommend Value), each rated 1-10.
    // Stored here as the final averaged decimal, e.g. 7.6.
    kutsScore: z.number().min(1).max(10).optional(),
    kutsScoreBreakdown: z.object({
      storyWriting: z.number().int().min(1).max(10),
      performances: z.number().int().min(1).max(10),
      craft: z.number().int().min(1).max(10),
      emotionalImpact: z.number().int().min(1).max(10),
      rewatchValue: z.number().int().min(1).max(10),
    }).optional(),
    moodTags: z.array(z.string()).default([]),
    verdict: z.string().optional(),
    intendedAudience: z.string().optional(),
    mainReservation: z.string().optional(),
    reviewer: z.string().optional(),
    reviewScope: z.string().optional(),
    reviewFormat: z.enum(['review', 'comparison', 'underrated-overrated']).optional(),
    youtubeUrl: z.string().url().optional(), // full review video (watch page)
    shortEmbedUrl: z.string().url().optional(), // YouTube Short embed, optional even when published
    publishDate: z.date().optional(),

    // Where-to-watch (Phase 4) — populated later via TMDB watch-providers
    // (data licensed from JustWatch, refresh every 6mo, attribution required)
    watchProviders: z.array(z.string()).default([]),
  }),
});

// YouTube list-video companions. Public URL is /collections; the Astro
// collection is named `lists` so it does not clash with this export.
// No coming-soon: a list page ships when the video is up.
const lists = defineCollection({
  type: 'content',
  schema: z.object({
    sample: z.boolean().default(false),
    title: z.string(),
    tagline: z.string().optional(),
    youtubeUrl: z.string().url().optional(),
    publishDate: z.date(),
    items: z.array(z.discriminatedUnion('kind', [
      z.object({
        kind: z.literal('title'),
        slug: reference('titles'),
        blurb: z.string(),
      }),
      z.object({
        kind: z.literal('mention'),
        tmdbId: z.number(),
        type: z.enum(['movie', 'tv']),
        title: z.string(),
        year: z.number(),
        posterPath: z.string(),
        blurb: z.string(),
      }),
    ])).min(1),
  }),
});

// One live drop at a time on the homepage. Flip status to "ended" when
// the week/month closes — the homepage band hides itself. Entry is always
// an external URL (YouTube, form, Gleam); this is a static site.
const giveaways = defineCollection({
  type: 'content',
  schema: z.object({
    sample: z.boolean().default(false),
    title: z.string(),
    headline: z.string(),
    echo: z.string().optional(),
    accentPhrase: z.string().optional(),
    subhead: z.string(),
    ctaLabel: z.string().default('Enter giveaway'),
    enterUrl: z.string().url(),
    videoUrl: z.string().url().optional(),
    note: z.string().default('Conditions are in the entry link.'),
    status: z.enum(['inactive', 'live', 'ended']).default('inactive'),
    endsAt: z.date().optional(),
  }),
});

export const collections = { titles, lists, giveaways };
