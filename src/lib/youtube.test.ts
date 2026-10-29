import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { youtubeWatchToEmbed } from './youtube.ts';

describe('youtubeWatchToEmbed', () => {
  it('converts a watch URL to an embed URL', () => {
    assert.equal(
      youtubeWatchToEmbed('https://www.youtube.com/watch?v=jNQXAC9IVRw'),
      'https://www.youtube.com/embed/jNQXAC9IVRw',
    );
  });

  it('keeps extra query params from stealing the video id', () => {
    assert.equal(
      youtubeWatchToEmbed('https://www.youtube.com/watch?v=jNQXAC9IVRw&t=30s&list=PLtest'),
      'https://www.youtube.com/embed/jNQXAC9IVRw',
    );
  });

  it('converts a youtu.be short URL', () => {
    assert.equal(
      youtubeWatchToEmbed('https://youtu.be/jNQXAC9IVRw'),
      'https://www.youtube.com/embed/jNQXAC9IVRw',
    );
  });

  it('passes through an existing embed URL', () => {
    assert.equal(
      youtubeWatchToEmbed('https://www.youtube.com/embed/jNQXAC9IVRw'),
      'https://www.youtube.com/embed/jNQXAC9IVRw',
    );
  });

  it('throws when the URL has no video id', () => {
    assert.throws(
      () => youtubeWatchToEmbed('https://www.youtube.com/@cinekutss'),
      /Cannot parse YouTube video id/,
    );
  });
});
