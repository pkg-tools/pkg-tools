import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/cli'],
  clean: true,
  rollup: {
    esbuild: {
      target: 'ESNext',
      minify: true,
    },
  },
  declaration: true,
});
