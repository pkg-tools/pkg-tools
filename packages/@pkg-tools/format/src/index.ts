import { globby } from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';
import prettier from 'prettier';
import chalk from 'chalk';
import { getFormatConfig } from '@pkg-tools/config';

async function readFile(filePath: string) {
  return await fs.readFile(filePath, 'utf8');
}

async function writeFile(filePath: string, contents: string) {
  return await fs.writeFile(filePath, contents);
}

async function formatFile(inputFilePath: string, outputFilePath: string) {
  const fileContent = await readFile(inputFilePath);
  const formatConfig = getFormatConfig();
  const start = Date.now();
  const formatted = await prettier.format(fileContent, {
    ...formatConfig,
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
    ignore: ['**/node_modules/**', '**/dist/**'],
    ignoreFiles: ['.*ignore'],
  });
  return filePaths.map((filePath) => path.join(process.cwd(), filePath));
}

export async function format(directory: string) {
  try {
    const sourceFilePaths = await getSourceFilePaths(directory);
    await Promise.all(
      sourceFilePaths.map((filePath) => formatFile(filePath, filePath))
    );
  } catch (error) {
    console.log('Problem formatting file:\n', error);
    process.exit(1);
  }
}

export async function check(directory: string) {
  try {
    const sourceFilePaths = await getSourceFilePaths(directory);
    await Promise.all(
      sourceFilePaths.map(async (filePath) => {
        const fileContent = await readFile(filePath);
        const formatConfig = getFormatConfig();
        const isCompliant = prettier.check(fileContent, {
          ...formatConfig,
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
