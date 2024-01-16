import { definePkgToolsConfig } from '@pkg-tools/config';
import { hooks } from '@pkg-tools/build';

export default definePkgToolsConfig({
  build: {
    entries: ['src/index'],
    rollup: {
      emitCJS: true,
    },
    declaration: 'compatible',
    hooks: {
      'rollup:options': (ctx, opts) => {
        hooks.transformModernModuleExtensions(ctx, opts);
      },
    },
  },
});
