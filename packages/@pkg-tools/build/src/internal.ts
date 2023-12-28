import { BuildConfig, defineBuildConfig } from 'unbuild';

export function node(options: BuildConfig) {
  return defineBuildConfig({
    entries: ['src/index'],
    clean: false,
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      ...options.rollup,
      esbuild: {
        target: 'ESNext',
        minify: true,
        ...options.rollup?.esbuild,
      },
    },
    declaration: true,
    ...options,
  });
}
