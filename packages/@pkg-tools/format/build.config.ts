import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    failOnWarn: false,
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
  },
  {
    failOnWarn: false,
    entries: ['src/cli'],
    rollup: {
      inlineDependencies: true,
      esbuild: {
        target: 'node16',
        minify: true,
      },
    },
  },
]);
