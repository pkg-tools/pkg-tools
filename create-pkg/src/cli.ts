#! /usr/bin/env node
import path from 'node:path';

import { defineCommand, runMain } from 'citty';

import { scaffold } from '.';

import consola from 'consola';
import { name, version, description } from '../package.json';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    path: {
      type: 'string',
      description: 'Where to create the project',
      required: false,
    },
    template: {
      type: 'string',
      description: 'The template/example to use as a starting point.',
      required: false,
    },
  },
  async run({ args }) {
    try {
      await scaffold({
        ...args,
      });
    } catch (error) {
      consola.error(`Error: ${error}`);
    }
  },
});

runMain(main);
