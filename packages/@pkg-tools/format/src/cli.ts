#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { format, check } from '.';

import { name, version, description } from '../package.json';

import { getConfig } from './config';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    check: {
      type: 'boolean',
      description: 'Whether to write the results',
      required: false,
    },
  },
  async run({ args }) {
    const packageRoot = path.resolve(process.cwd());

    const config = getConfig({});
    try {
      if (args.check) {
        await check(packageRoot, config);
      } else {
        await format(packageRoot, config);
      }
    } catch (error) {
      console.error(`Error formatting source in ${packageRoot}: ${error}`);
    }
  },
});

runMain(main);
