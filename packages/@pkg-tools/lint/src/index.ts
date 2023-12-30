import consola from 'consola';
import { globby } from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ESLint } from 'eslint';
import { getLintConfig } from '@pkg-tools/config';

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
  const config = getLintConfig();
  //@ts-ignore
  const eslint = new ESLint(config);
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
