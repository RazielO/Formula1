import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],
  darkMode: 'class',
  theme: {
    extend: {},
  },

  plugins: [
    typography,
    skeleton({
      themes: [themes.concord],
    }),
  ],
} satisfies Config;
