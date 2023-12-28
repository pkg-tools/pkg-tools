import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/cli'],
  clean: false,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      target: 'ESNext',
      jsx: 'automatic',
      minify: true,
    },
  },
  declaration: true,
});
