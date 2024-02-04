import defu from 'defu';
import { resolvePkgToolsConfig } from '@pkg-tools/utilities';

import { type ESLint } from 'eslint';

export interface Config extends ESLint.ConfigData {}

export const defaults: Config = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  root: true,
};

export function getConfig(config: Partial<Config>): Config {
  return defu(config, resolvePkgToolsConfig()['clean'], defaults);
}
