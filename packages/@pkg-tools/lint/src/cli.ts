#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { lint } from '.';

import consola from 'consola';
import { name, version, description } from '../package.json';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    ignore: {
      alias: 'i',
      type: 'string',
      description: 'Comma-separated list of glob patterns to ignore',
      required: false,
    },
  },
  async run({ args }) {
    const packageRoot = path.resolve(process.cwd());

    const ignore = (args.ignore || '')
      .trim()
      .split(',')
      .filter((i) => i);

    try {
      lint({ directory: packageRoot, ignore });
    } catch (error) {
      consola.error(`Error linting source in ${packageRoot}: ${error}`);
    }
  },
});

runMain(main);
