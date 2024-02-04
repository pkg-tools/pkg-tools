import defu from 'defu';
import { resolvePkgToolsConfig } from '@pkg-tools/utilities';

import { Config as PrettierConfig } from 'prettier';

export interface Config extends PrettierConfig {}

export const defaults: Config = {
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
};

export function getConfig(config: Partial<Config>): Config {
  return defu(config, resolvePkgToolsConfig()['format'], defaults);
}
