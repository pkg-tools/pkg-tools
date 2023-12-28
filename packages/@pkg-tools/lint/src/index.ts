import consola from 'consola';
import { globby } from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ESLint } from 'eslint';

async function readFile(filePath: string) {
  return await fs.readFile(filePath, 'utf8');
}

async function getSourceFilePaths({
  directory,
  ignore = [],
}: {
  directory: string;
  ignore: string[];
}) {
  const filePaths = await globby(['**/*.ts', '**/*.tsx'], {
    cwd: directory,
    ignore: ['node_modules', ...ignore],
    ignoreFiles: ['.*ignore'],
  });

  return filePaths.map((filePath) => path.join(process.cwd(), filePath));
}

export async function lint({
  directory,
  ignore,
}: {
  directory: string;
  ignore: string[];
}) {
  const eslint = new ESLint({
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
  try {
    const sourceFilePaths = await getSourceFilePaths({ directory, ignore });
    await Promise.all(
      sourceFilePaths.map(async (filePath) => {
        const fileContent = await readFile(filePath);
        const log = console.log;
        //eslint-disable-next-line
        console.log = () => {};
        const results = await eslint.lintText(fileContent, {
          filePath,
        });
        console.log = log;

        const formatter = await eslint.loadFormatter('stylish');
        const resultText = await formatter.format(results);

        if (resultText.trim() !== '') {
          console.log(resultText);
        }
      })
    );
  } catch (error) {
    consola.log('Found issue when linting files:\n', error);
    process.exit(1);
  }
}
