import consola from 'consola';
import { globby } from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ESLint } from 'eslint';
import { Config } from './config';

async function readFile(filePath: string) {
  return await fs.readFile(filePath, 'utf8');
}

async function getSourceFilePaths(
  directory: string,
  ignorePatterns: ESLint.ConfigData['ignorePatterns']
) {
  if (!ignorePatterns) {
    ignorePatterns = [];
  }

  if (!Array.isArray(ignorePatterns)) {
    ignorePatterns = [ignorePatterns];
  }

  const filePaths = await globby(['**/*.ts', '**/*.tsx'], {
    cwd: directory,
    ignore: ['node_modules', ...ignorePatterns],
    ignoreFiles: ['.*ignore'],
  });

  return filePaths.map((filePath) => path.join(process.cwd(), filePath));
}

export async function lint(directory: string, config: Config) {
  const eslint = new ESLint({
    baseConfig: config,
  });

  try {
    const sourceFilePaths = await getSourceFilePaths(
      directory,
      config.ignorePatterns
    );
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
