#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { sync } from '.';

import { name, version, description } from '../package.json';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  async run() {
    const directory = path.resolve(process.cwd());
    try {
      await sync();
    } catch (error) {
      console.error(
        `Error syncing package at ${directory} to its open source repository`,
        error
      );
    }
  },
});

runMain(main);
