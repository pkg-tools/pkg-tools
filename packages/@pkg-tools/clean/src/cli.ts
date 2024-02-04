#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { rm } from '.';

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
    directory: {
      alias: 'd',
      type: 'string',
      description: 'The directory to clean',
      required: false,
    },
  },
  async run({ args }) {
    const { directory } = getConfig(args);
    try {
      rm(path.resolve(process.cwd(), directory));
    } catch (error) {
      consola.error(`Error removing ${directory}: ${error}`);
    }
  },
});

runMain(main);
