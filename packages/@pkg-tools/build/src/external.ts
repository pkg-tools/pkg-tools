import { isProd } from '@dopt/env';
import { BuildConfig, defineBuildConfig } from 'unbuild';

import { transformModernModuleExtensions, addNodeOutput } from './hooks';

export function node(options: BuildConfig) {
  return defineBuildConfig({
    entries: ['src/index'],
    clean: isProd(),
    sourcemap: true,
    declaration: true,
    ...options,
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      ...options.rollup,
      esbuild: {
        target: ['es2016', 'node16'],
        minify: isProd(),
        ...options.rollup?.esbuild,
      },
    },
    hooks: {
      ...options.hooks,
      'rollup:options': (ctx, opts) => {
        transformModernModuleExtensions(ctx, opts);

        if (options?.hooks && options.hooks['rollup:options']) {
          options.hooks['rollup:options'](ctx, opts);
        }
      },
    },
  });
}

export function isomorphic(options: BuildConfig) {
  return defineBuildConfig({
    entries: ['src/index'],
    clean: isProd(),
    sourcemap: true,
    declaration: true,
    ...options,
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      ...options.rollup,
      esbuild: {
        target: ['es2016', 'node16'],
        minify: isProd(),
        ...options.rollup?.esbuild,
      },
    },
    hooks: {
      ...options.hooks,
      'rollup:options': (ctx, opts) => {
        transformModernModuleExtensions(ctx, opts);
        addNodeOutput(ctx, opts);

        if (options?.hooks && options.hooks['rollup:options']) {
          options.hooks['rollup:options'](ctx, opts);
        }
      },
    },
  });
}

export function browser(options: BuildConfig) {
  return defineBuildConfig({
    entries: ['src/index'],
    clean: isProd(),
    sourcemap: true,
    declaration: true,
    ...options,
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      ...options.rollup,
      esbuild: {
        target: 'es2016',
        minify: isProd(),
        ...options.rollup?.esbuild,
      },
    },
    hooks: {
      ...options.hooks,
      'rollup:options': (ctx, opts) => {
        transformModernModuleExtensions(ctx, opts);
        if (options?.hooks && options.hooks['rollup:options']) {
          options.hooks['rollup:options'](ctx, opts);
        }
      },
    },
  });
}

export function react(options: BuildConfig) {
  return defineBuildConfig({
    entries: ['src/index'],
    clean: isProd(),
    sourcemap: true,
    declaration: true,
    ...options,
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      ...options.rollup,
      esbuild: {
        target: 'es2016',
        jsx: 'transform',
        minify: isProd(),
        ...options.rollup?.esbuild,
      },
    },
    hooks: {
      ...options.hooks,
      'rollup:options': (ctx, opts) => {
        transformModernModuleExtensions(ctx, opts);
        if (options?.hooks && options.hooks['rollup:options']) {
          options.hooks['rollup:options'](ctx, opts);
        }
      },
    },
  });
}
