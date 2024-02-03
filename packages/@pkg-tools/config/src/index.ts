import { type Config as BuildConfig } from '@pkg-tools/build/config';
import { type Config as CleanConfig } from '@pkg-tools/clean/config';
import { type Config as FormatConfig } from '@pkg-tools/format/config';
import { type Config as LintConfig } from '@pkg-tools/lint/config';

export interface PkgToolsConfig {
  build?: BuildConfig;
  clean?: CleanConfig;
  format?: FormatConfig;
  lint?: LintConfig;
}

export function definePkgToolsConfig(config: PkgToolsConfig): PkgToolsConfig {
  return config;
}
