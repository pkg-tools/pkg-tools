import { BuildHooks } from 'unbuild';

import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

type Props = Parameters<BuildHooks['rollup:options']>;

export function transformVanillaExtractExtensions(
  _: Props[0],
  options: Props[1]
) {
  if (Array.isArray(options.plugins)) {
    //@ts-ignore
    options.plugins = [...options.plugins, vanillaExtractPlugin()];
  }

  if (Array.isArray(options.output)) {
    for (const outputOptions of options.output) {
      outputOptions.assetFileNames = ({ name }) => {
        const fileName = name
          ?.replace(/^src.*\//, '')
          .replace(/\.css\.ts\.vanilla.css$/, '.css');
        return fileName || '';
      };
    }
  }
}
