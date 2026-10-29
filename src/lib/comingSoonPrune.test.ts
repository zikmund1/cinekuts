import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { pruneComingSoonDist, shouldKeepHtml } from './comingSoonPrune.ts';

describe('shouldKeepHtml', () => {
  it('keeps only root index.html and 404.html', () => {
    assert.equal(shouldKeepHtml('index.html'), true);
    assert.equal(shouldKeepHtml('404.html'), true);
    assert.equal(shouldKeepHtml('reviews/index.html'), false);
    assert.equal(shouldKeepHtml('construction/index.html'), false);
    assert.equal(shouldKeepHtml('title/x/index.html'), false);
  });
});

describe('pruneComingSoonDist', () => {
  it('deletes extra HTML and empty dirs, leaves assets', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ck-prune-'));
    const write = (rel: string, body = 'x') => {
      const abs = path.join(root, rel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, body);
    };

    write('index.html');
    write('404.html');
    write('reviews/index.html');
    write('title/x/index.html');
    write('construction/index.html');
    write('styles/global.css', 'body{}');
    write('images/logo.svg', '<svg />');

    pruneComingSoonDist(root);

    assert.equal(fs.existsSync(path.join(root, 'index.html')), true);
    assert.equal(fs.existsSync(path.join(root, '404.html')), true);
    assert.equal(fs.existsSync(path.join(root, 'styles/global.css')), true);
    assert.equal(fs.existsSync(path.join(root, 'images/logo.svg')), true);
    assert.equal(fs.existsSync(path.join(root, 'reviews/index.html')), false);
    assert.equal(fs.existsSync(path.join(root, 'reviews')), false);
    assert.equal(fs.existsSync(path.join(root, 'title')), false);
    assert.equal(fs.existsSync(path.join(root, 'construction')), false);

    fs.rmSync(root, { recursive: true, force: true });
  });
});
