import { BuildConfig as UnbuildConfig } from 'unbuild';
import { Config as PrettierConfig } from 'prettier';
import { ESLintConfig } from 'eslint-define-config';

export interface BuildConfig extends UnbuildConfig {}
export interface CleanConfig {
  directory: string;
}
export interface FormatConfig extends PrettierConfig {}
export interface LintConfig extends ESLintConfig {}

export interface PkgToolsConfig {
  build?: BuildConfig | BuildConfig[];
  clean?: CleanConfig;
  format?: FormatConfig;
  lint?: LintConfig;
}

export function definePkgToolsConfig(config: PkgToolsConfig): PkgToolsConfig {
  return config;
}

import path from 'node:path';
import jiti from 'jiti';
import defu from 'defu';

export function getBuildConfig() {
  return resolvePkgToolsConfig()['build'];
}

export function getCleanConfig() {
  return defu(resolvePkgToolsConfig()['clean'], {
    directory: './dist',
  });
}

export function getFormatConfig() {
  return defu(resolvePkgToolsConfig()['format'], {
    singleQuote: true,
    semi: true,
    tabWidth: 2,
    bracketSpacing: true,
    trailingComma: 'es5',
    bracketSameLine: false,
    useTabs: false,
    endOfLine: 'lf',
    overrides: [
      {
        files: '*.md',
        options: {
          singleQuote: true,
          quoteProps: 'preserve',
        },
      },
    ],
  } as FormatConfig);
}

export function getLintConfig() {
  return defu(resolvePkgToolsConfig()['lint'], {
    overrideConfig: {
      overrides: [
        {
          files: ['*.ts', '*.tsx'],
          parser: '@typescript-eslint/parser',
          extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:react-hooks/recommended',
          ],
          plugins: ['@typescript-eslint', 'react-hooks'],
          rules: {
            '@typescript-eslint/ban-ts-comment': 1,
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
              'error',
              {
                args: 'all',
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
              },
            ],
          },
        },
        {
          files: ['*.js'],
          parser: '@babel/eslint-parser',
          parserOptions: {
            requireConfigFile: false,
          },
          env: {
            browser: true,
            jest: true,
            node: true,
          },
        },
      ],
    },
  });
}

function resolvePkgToolsConfig() {
  const rootDir = path.resolve(process.cwd(), '.');

  const pkgToolsConfig: PkgToolsConfig =
    tryRequire('./pkg-tools.config', rootDir) || {};

  return pkgToolsConfig;
}

function tryRequire(id: string, rootDir: string = process.cwd()) {
  const _require = jiti(rootDir, { interopDefault: true, esmResolve: true });
  try {
    return _require(id);
  } catch (error: unknown) {
    //@ts-ignore
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error trying import ${id} from ${rootDir}`, error);
    }
    return {};
  }
}
