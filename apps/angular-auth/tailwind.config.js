import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';
import * as sharedTailwindConfig from '../../libs/tailwind-preset/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
