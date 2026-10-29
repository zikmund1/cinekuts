import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { isComingSoon } from './src/lib/siteMode.ts';
import { pruneComingSoonDist } from './src/lib/comingSoonPrune.ts';

export default defineConfig({
  site: 'https://cinekuts.com',
  output: 'static',
  integrations: [
    {
      name: 'coming-soon-gate',
      hooks: {
        'astro:build:done': ({ dir }) => {
          if (!isComingSoon()) return;
          pruneComingSoonDist(fileURLToPath(dir));
        },
      },
    },
  ],
});
