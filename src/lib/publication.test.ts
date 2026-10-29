import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentVisible, giveawayActive } from './publication.ts';

test('sample content is opt-in; real content stays visible', () => {
  assert.equal(contentVisible({ sample: true }), false);
  assert.equal(contentVisible({ sample: true }, true), true);
  assert.equal(contentVisible({}), true);
});

test('only a live giveaway with a future deadline is active', () => {
  const now = new Date('2026-09-06T12:00:00Z');
  assert.equal(giveawayActive({ status: 'live', endsAt: new Date('2026-09-07') }, now), true);
  for (const status of ['inactive', 'ended']) {
    assert.equal(giveawayActive({ status, endsAt: new Date('2026-09-07') }, now), false);
  }
  assert.equal(giveawayActive({ status: 'live' }, now), false);
  assert.equal(giveawayActive({ status: 'live', endsAt: now }, now), false);
  assert.equal(giveawayActive({ status: 'live', endsAt: new Date('2026-08-31') }, now), false);
});
