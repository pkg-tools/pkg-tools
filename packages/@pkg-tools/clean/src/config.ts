import defu from 'defu';
import { resolvePkgToolsConfig } from '@pkg-tools/config';

export interface Config {
  directory: string;
}

export const defaults: Config = {
  directory: './dist',
};

export function getConfig(config: Partial<Config>): Config {
  return defu(config, resolvePkgToolsConfig()['clean'], defaults);
}
