#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { lint } from '.';

import consola from 'consola';
import { name, version, description } from '../package.json';
import { getConfig } from './config';

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

    const ignorePatterns = (args.ignore || '')
      .trim()
      .split(',')
      .filter((i) => i);

    const config = getConfig({
      ignorePatterns,
    });

    try {
      lint(packageRoot, config);
    } catch (error) {
      consola.error(`Error linting source in ${packageRoot}: ${error}`);
    }
  },
});

runMain(main);
