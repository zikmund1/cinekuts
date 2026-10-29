import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { compareReviews, parseReviewFilter, reviewMatches, type ReviewIndexItem } from './reviews.ts';

const blade: ReviewIndexItem = {
  title: 'Blade Runner 2049',
  type: 'movie',
  status: 'published',
  score: 9.4,
  date: 2,
};

const andor: ReviewIndexItem = {
  title: 'Andor',
  type: 'tv',
  status: 'coming-soon',
  score: null,
  date: 1,
};

describe('reviewMatches', () => {
  it('filters by search text', () => {
    const filter = { q: 'blade', type: 'all', status: 'all', sort: 'newest' } as const;
    assert.equal(reviewMatches(blade, filter), true);
    assert.equal(reviewMatches(andor, filter), false);
  });

  it('filters by type and status', () => {
    assert.equal(reviewMatches(andor, { q: '', type: 'tv', status: 'all', sort: 'newest' }), true);
    assert.equal(reviewMatches(andor, { q: '', type: 'movie', status: 'all', sort: 'newest' }), false);
    assert.equal(reviewMatches(andor, { q: '', type: 'all', status: 'published', sort: 'newest' }), false);
  });
});

describe('compareReviews', () => {
  it('puts published titles first when sorting newest', () => {
    assert.ok(compareReviews(blade, andor, 'newest') < 0);
  });

  it('sorts by score descending', () => {
    assert.ok(compareReviews(blade, { ...andor, score: 8 }, 'score') < 0);
  });
});

describe('parseReviewFilter', () => {
  it('reads known query params and ignores junk', () => {
    const filter = parseReviewFilter(new URLSearchParams('q=dune&type=movie&status=coming-soon&sort=score&x=1'));
    assert.deepEqual(filter, {
      q: 'dune',
      type: 'movie',
      status: 'coming-soon',
      sort: 'score',
    });
  });
});
