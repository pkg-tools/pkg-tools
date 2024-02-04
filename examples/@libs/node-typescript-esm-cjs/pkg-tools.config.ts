import { defineConfig } from '@pkg-tools/config';
import { hooks } from '@pkg-tools/build'

export default defineConfig({
  build: {
    entries: ['src/index'],
    sourcemap: true,
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      esbuild: {
        target: ['node16'],
        minify: true,
      },
    },
    declaration: 'compatible',
    hooks: {
      'rollup:options': (ctx, opts) => {
        hooks.transformModernModuleExtensions(ctx, opts);
      },
    },
  },
  format: {
    semi: true,
    tabWidth: 2,
    singleQuote: true,
  },
});
