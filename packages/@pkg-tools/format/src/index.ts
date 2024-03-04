import { globby } from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';
import prettier from 'prettier';
import chalk from 'chalk';
import { Config } from './config';

async function readFile(filePath: string) {
  return await fs.readFile(filePath, 'utf8');
}

async function writeFile(filePath: string, contents: string) {
  return await fs.writeFile(filePath, contents);
}

async function formatFile(
  inputFilePath: string,
  outputFilePath: string,
  config: Config
) {
  const fileContent = await readFile(inputFilePath);
  const start = Date.now();
  const formatted = await prettier.format(fileContent, {
    ...config,
    filepath: inputFilePath,
  });

  const writtenFilePath = await writeFile(outputFilePath, formatted);

  console.log(
    `${chalk.grey(path.relative(process.cwd(), inputFilePath))} ${
      Date.now() - start
    }ms`
  );

  return writtenFilePath;
}

async function getSourceFilePaths(cwd: string) {
  const filePaths = await globby(['**'], {
    cwd,
    ignore: ['**/node_modules/**', '**/dist/**', 'yarn.lock'],
    ignoreFiles: ['.*ignore'],
  });
  return filePaths.map((filePath) => path.join(process.cwd(), filePath));
}

export async function format(directory: string, config: Config) {
  try {
    const sourceFilePaths = await getSourceFilePaths(directory);
    await Promise.all(
      sourceFilePaths.map((filePath) => formatFile(filePath, filePath, config))
    );
  } catch (error) {
    console.log('Problem formatting file:\n', error);
    process.exit(1);
  }
}

export async function check(directory: string, config: Config) {
  try {
    const sourceFilePaths = await getSourceFilePaths(directory);
    await Promise.all(
      sourceFilePaths.map(async (filePath) => {
        const fileContent = await readFile(filePath);
        const isCompliant = prettier.check(fileContent, {
          ...config,
          filepath: filePath,
        });

        if (!isCompliant) {
          throw filePath;
        }
      })
    );
    console.log('Finished validating file formatting.');
  } catch (error) {
    console.log('Unformatted file found:\n', error);
    process.exit(1);
  }
}
