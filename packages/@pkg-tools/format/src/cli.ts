#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { format, check } from '.';

import { name, version, description } from '../package.json';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    check: {
      alias: 'c',
      type: 'boolean',
      description: 'Whether to write the results',
      required: false,
    },
  },
  async run({ args }) {
    const packageRoot = path.resolve(process.cwd());
    try {
      if (args.c || args.check) {
        await check(packageRoot);
      } else {
        await format(packageRoot);
      }
    } catch (error) {
      console.error(`Error formatting source in ${packageRoot}: ${error}`);
    }
  },
});

runMain(main);
