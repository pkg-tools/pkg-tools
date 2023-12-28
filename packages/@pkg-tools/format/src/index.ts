import { globby } from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';
import prettier from 'prettier';
import chalk from 'chalk';

async function readFile(filePath: string) {
  return await fs.readFile(filePath, 'utf8');
}

async function writeFile(filePath: string, contents: string) {
  return await fs.writeFile(filePath, contents);
}

async function formatFile(inputFilePath: string, outputFilePath: string) {
  const fileContent = await readFile(inputFilePath);
  const prettierConfig = await prettier.resolveConfig(inputFilePath);
  const start = Date.now();
  const formatted = prettier.format(fileContent, {
    ...prettierConfig,
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
        const prettierConfig = await prettier.resolveConfig(filePath);
        const isCompliant = prettier.check(fileContent, {
          ...prettierConfig,
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
