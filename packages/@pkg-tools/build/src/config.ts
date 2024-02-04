import defu from "defu";
import { resolvePkgToolsConfig } from "@pkg-tools/utilities";

import { type BuildConfig } from "unbuild";

export type Config = BuildConfig | BuildConfig[];

export const defaults: BuildConfig = {
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

export function getConfig(config: Partial<Config>): BuildConfig[] {
  const pkgToolsConfig = resolvePkgToolsConfig()["build"] as Config;

  /*
   * If you provide multiple build configurations we
   * won't merge in any defaults.
   */
  if (Array.isArray(pkgToolsConfig)) {
    return pkgToolsConfig;
  }

  return [defu(config, pkgToolsConfig, defaults)];
}
