import defu from "defu";
import { resolvePkgToolsConfig } from "@pkg-tools/utilities";

import { type BuildConfig } from "unbuild";

export interface Config extends BuildConfig {}

export const defaults: Config = {
  entries: ["src/index"],
  rollup: {
    emitCJS: true,
    esbuild: {
      target: "node16",
      minify: true,
    },
  },
  declaration: "node16",
};

export function getConfig(config: Partial<Config>): Config[] {
  const pkgToolsConfig = resolvePkgToolsConfig()["build"];

  /*
   * If you provide multiple build configurations we
   * won't merge in any defaults.
   */
  if (Array.isArray(pkgToolsConfig)) {
    return pkgToolsConfig;
  }

  return [defu(config, pkgToolsConfig, defaults)];
}
