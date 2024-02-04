import defu from "defu";
import { resolvePkgToolsConfig } from "@pkg-tools/utilities";

import { transformModernModuleExtensions } from "./hooks";

import { type BuildConfig as UnbuildConfig } from "unbuild";

interface BuildConfig extends UnbuildConfig {
  /**
   * Determines the file extensions for the build output. The `compatible`
   * option is useful if building code that will bundled and run in the
   * browser, where older bundling tools may not understand modern
   * extensions.
   *
   * * `modern` - generated files will have either '.mjs' or '.cjs' extensions.
   * * `compatible` - generated files will have '.js' extensions.
   *
   * Defaults to `modern`.
   */
  extensions?: "modern" | "compatible";
}

export type Config = BuildConfig | BuildConfig[];

export const defaults: BuildConfig = {
  entries: ["src/index"],
  extensions: "modern",
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
  const _buildConfig = resolvePkgToolsConfig()["build"] as Config;

  const buildConfigs = Array.isArray(_buildConfig)
    ? _buildConfig
    : [_buildConfig];

  return buildConfigs.map((buildConfig) => {
    const options = defu(config, buildConfig, defaults);
    if (options.extensions === "modern") {
      return options;
    }
    return {
      ...options,
      hooks: {
        ...options.hooks,
        "rollup:options": (ctx, opts) => {
          transformModernModuleExtensions(ctx, opts);
          if (options?.hooks && options.hooks["rollup:options"]) {
            options.hooks["rollup:options"](ctx, opts);
          }
        },
      },
    };
  });
}
