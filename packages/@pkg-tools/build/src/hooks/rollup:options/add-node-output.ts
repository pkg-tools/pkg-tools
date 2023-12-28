import fs from 'node:fs';
import path from 'node:path';

import { BuildHooks } from 'unbuild';

type Props = Parameters<BuildHooks['rollup:options']>;

export function addNodeOutput(ctx: Props[0], options: Props[1]) {
  type RollupOptions = typeof options;

  if (!Array.isArray(options.output)) {
    return;
  }

  const rootDir = process.cwd();

  const dist = path.resolve(rootDir, './dist');

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }

  const node = path.resolve(dist, './node');

  if (!fs.existsSync(node)) {
    fs.mkdirSync(node);
  }

  const nodeOutput: RollupOptions['output'] = [
    {
      dir: node,
      entryFileNames: '[name].cjs',
      chunkFileNames: (chunk) => {
        if (chunk.isDynamicEntry) {
          return `chunks/[name].cjs`;
        }
        return `shared/${ctx.options.name}.[hash].cjs`;
      },
      format: 'cjs',
      exports: 'auto',
      interop: 'compat',
      generatedCode: { constBindings: true },
      externalLiveBindings: false,
      freeze: false,
      sourcemap: ctx.options.sourcemap,
      ...ctx.options.rollup.output,
    },
    {
      dir: node,
      entryFileNames: '[name].mjs',
      chunkFileNames: (chunk) => {
        if (chunk.isDynamicEntry) {
          return `chunks/[name].mjs`;
        }
        return `shared/${ctx.options.name}.[hash].mjs`;
      },
      format: 'esm',
      exports: 'auto',
      generatedCode: { constBindings: true },
      externalLiveBindings: false,
      freeze: false,
      sourcemap: ctx.options.sourcemap,
      ...ctx.options.rollup.output,
    },
  ];

  options.output = [...options.output, ...nodeOutput];
}
