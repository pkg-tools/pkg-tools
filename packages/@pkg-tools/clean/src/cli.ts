#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { rm } from '.';

import consola from 'consola';
import { name, version, description } from '../package.json';
import { getCleanConfig } from '@pkg-tools/config';

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
    const cleanConfig = getCleanConfig();

    const directory = path.resolve(
      process.cwd(),
      args.directory || cleanConfig.directory
    );
    try {
      rm(directory);
    } catch (error) {
      consola.error(`Error removing ${directory}: ${error}`);
    }
  },
});

runMain(main);
