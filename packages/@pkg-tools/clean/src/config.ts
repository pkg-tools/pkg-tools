import defu from 'defu';
import { resolvePkgToolsConfig } from '@pkg-tools/utilities';

export interface Config {
  directory: string;
}

export const defaults: Config = {
  directory: './dist',
};

export function getConfig(config: Config): Config {
  return defu(config, resolvePkgToolsConfig()['clean'], defaults);
}
