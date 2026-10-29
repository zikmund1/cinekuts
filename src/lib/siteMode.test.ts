import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isComingSoon } from './siteMode.ts';

describe('isComingSoon', () => {
  it('is false when SITE_MODE is unset', () => {
    assert.equal(isComingSoon({}), false);
  });

  it('is true only when SITE_MODE is coming-soon', () => {
    assert.equal(isComingSoon({ SITE_MODE: 'coming-soon' }), true);
  });

  it('is false for any other SITE_MODE value', () => {
    assert.equal(isComingSoon({ SITE_MODE: 'live' }), false);
    assert.equal(isComingSoon({ SITE_MODE: '' }), false);
  });
});
