import fs from 'node:fs';
import path from 'node:path';

import { BuildHooks } from 'unbuild';

type Props = Parameters<BuildHooks['rollup:options']>;

export function transformModernModuleExtensions(
  ctx: Props[0],
  options: Props[1]
) {
  if (!Array.isArray(options.output)) {
    return;
  }

  const rootDir = process.cwd();

  const dist = path.resolve(rootDir, './dist');

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }

  const cjs = path.resolve(dist, './cjs');

  if (!fs.existsSync(cjs)) {
    fs.mkdirSync(cjs);
  }

  fs.writeFileSync(path.resolve(cjs, './package.json'), '{"type":"commonjs"}');

  for (const output of options.output) {
    if (output.format === 'cjs') {
      output.dir = cjs;
      output.exports = 'named';
      output.entryFileNames = '[name].cjs.js';
      output.chunkFileNames = (chunk) => {
        if (chunk.isDynamicEntry) {
          return `chunks/[name].cjs.js`;
        }
        return `shared/${ctx.options.name}.[hash].cjs.js`;
      };
    } else if (output.format === 'esm') {
      output.exports = 'named';
      output.entryFileNames = '[name].esm.js';
      output.chunkFileNames = (chunk) => {
        if (chunk.isDynamicEntry) {
          return `chunks/[name].esm.js`;
        }
        return `shared/${ctx.options.name}.[hash].esm.js`;
      };
    }
  }
}
