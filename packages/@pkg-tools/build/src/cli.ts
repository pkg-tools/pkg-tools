#! /usr/bin/env node

import { defineCommand, runMain } from "citty";

import path from "node:path";

import nodemon from "nodemon";

import consola from "consola";
import { name, version, description } from "../package.json";

import { build } from "unbuild";
import { getBuildConfig } from "@pkg-tools/config";

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    stub: {
      alias: "s",
      type: "boolean",
      description: "Stub the package for JIT compilation",
      required: false,
    },
    watch: {
      alias: "w",
      type: "boolean",
      description: "Rebuild the package changes to the src dir",
      required: false,
    },
  },
  async run({ args }) {
    const rootDir = process.cwd();

    if (args.w || args.watch) {
      await new Promise<void>((resolve) => {
        nodemon({
          watch: [path.relative(process.cwd(), path.resolve(rootDir, "./src"))],
          ext: "*",
          exec: "pnpm run build",
        }).on("quit", function () {
          resolve();
          process.exit();
        });
      });
    } else {
      const buildConfig = getBuildConfig();
      const buildConfigs = (
        Array.isArray(buildConfig) ? buildConfig : [buildConfig]
      ).filter(Boolean);

      for (const buildConfig of buildConfigs) {
        await build(rootDir, args.stub, buildConfig).catch((error) => {
          consola.error(`Error building ${rootDir}: ${error}`);
          throw error;
        });
      }
    }
  },
});

runMain(main);
