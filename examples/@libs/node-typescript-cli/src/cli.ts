#! /usr/bin/env node

import { defineCommand, runMain } from "citty";

import { run } from ".";

import consola from "consola";
import { name, version } from "../package.json";

const main = defineCommand({
  meta: {
    name,
    version,
  },
  async run() {
    try {
      run();
    } catch (error) {
      consola.error(error);
    }
  },
});

runMain(main);
