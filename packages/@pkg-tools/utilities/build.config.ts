import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    esbuild: {
      target: 'node16',
      minify: true,
    },
  },
  declaration: 'node16',
});
