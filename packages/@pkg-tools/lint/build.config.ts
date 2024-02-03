import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    failOnWarn: false,
    entries: ['src/index'],
    rollup: {
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
    entries: ['src/config'],
    rollup: {
      emitCJS: true,
      esbuild: {
        target: 'node16',
        minify: true,
      },
    },
    declaration: 'node16',
  },
  {
    entries: ['src/cli'],
    rollup: {
      esbuild: {
        target: 'node16',
        minify: true,
      },
    },
  },
]);
