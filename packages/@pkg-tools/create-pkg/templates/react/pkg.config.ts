import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  build: {
    entries: ['src/index'],
    extensions: 'compatible',
    rollup: {
      emitCJS: true,
    },
    declaration: 'compatible',
  },
});
