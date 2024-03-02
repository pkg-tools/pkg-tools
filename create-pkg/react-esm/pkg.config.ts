import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  build: {
    entries: ['src/index'],
    sourcemap: true,
    extensions: 'modern',
    rollup: {
      inlineDependencies: true,

      esbuild: {
        target: ['node16'],
        minify: true,
      },
    },
    declaration: 'compatible',
  },
  format: {
    semi: true,
    tabWidth: 2,
    singleQuote: true,
  },
});
