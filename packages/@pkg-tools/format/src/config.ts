import defu from 'defu';
import { resolvePkgToolsConfig } from '@pkg-tools/config';

import { Config as PrettierConfig } from 'prettier';

export interface Config extends PrettierConfig {}

export const defaults: Config = {
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  bracketSameLine: false,
  useTabs: false,
  endOfLine: 'lf',
};

export function getConfig(config: Partial<Config>): Config {
  return defu(config, resolvePkgToolsConfig()['format'], defaults);
}
