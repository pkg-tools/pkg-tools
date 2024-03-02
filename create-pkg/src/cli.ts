#! /usr/bin/env node

import { defineCommand, runMain } from 'citty';

import { scaffold, ScaffoldArguments } from '.';

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
    formats: {
      type: 'string',
      description:
        'Comma-separated list of output formats. Supported values are "esm" or "esm,cjs". Defaults to esm.',
      default: 'esm',
      required: false,
    },
    extensions: {
      type: 'string',
      description: ` Determines the file extensions for the build output. The \`compatible\` option is useful if building code that will bundled and run in the browser, where older bundling tools may not understand modern extensions. The \`modern\` generates files with either '.mjs' or '.cjs' extensions, whereas the \`compatible\` option generates files with '.js' extensions.`,
      default: 'modern',
      required: false,
    },
  },
  async run({ args }) {
    try {
      await scaffold({
        formats: args.formats,
        template: args.template,
        targetPath: args.path,
        extensions: args.extensions as ScaffoldArguments['extensions'],
      });
    } catch (error) {
      consola.error(`Error: ${error}`);
    }
  },
});

runMain(main);
