import { config, build } from '@pkg-tools/pkg-tools';

export default config.definePkgToolsConfig({
  build: build.config.node({
    entries: ['src/index', 'src/cli'],
  }),
  format: {
    semi: true,
  },
});
