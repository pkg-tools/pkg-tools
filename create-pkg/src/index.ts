import consola from 'consola';

import fs from 'node:fs';
import path from 'node:path';
import childProcess from 'node:child_process';
import url from 'node:url';
import { packageManagerFromUserAgent } from './utils';

import sortPackageJson from 'sort-package-json';

import pkgConfigTemplate from './templates/pkg-config';
import { PackageJson } from 'pkg-types';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export interface ScaffoldArguments {
  targetPath?: string;
  template?: string;
  formats?: string;
  extensions?: 'modern' | 'compatible';
}

export async function scaffold({
  targetPath,
  formats = 'esm',
  extensions = 'modern',
  template = 'node-module-ts',
}: ScaffoldArguments) {
  const templatePath = path.resolve(__dirname, `../templates/${template}`);

  if (!targetPath) {
    targetPath = `./${template}`;
  }

  if (!fs.existsSync(templatePath)) {
    consola.error(`"${template}" template does not exist`);
  }

  consola.log(
    `\n🔨 Creating a project based on "${template}" template example project in ${targetPath}...`
  );

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  } else {
    consola.error(
      `\n The path ${targetPath} already exists on the filesystem.`
    );
    return;
  }

  fs.cpSync(templatePath, targetPath, {
    recursive: true,
  });

  fs.rmSync(path.join(targetPath, 'node_modules'), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.join(targetPath, 'dist'), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.join(targetPath, 'pkg.config.ts'));
  fs.rmSync(path.join(targetPath, 'CHANGELOG.md'));

  consola.log('\n🚧 Installing dependencies...');

  function runCommand(command: string) {
    childProcess.execSync(`${packageManagerFromUserAgent().name} ${command}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }

  runCommand('install');

  const parsedFormats = formats.trim().split(',');

  fs.writeFileSync(
    path.join(targetPath, 'pkg.config.ts'),
    pkgConfigTemplate({
      cjs: parsedFormats.includes('cjs'),
      sourcemap: true,
      minify: true,
      extensions,
    })
  );

  const packageJson: PackageJson = JSON.parse(
    fs.readFileSync(path.join(targetPath, 'package.json'), 'utf8')
  );

  packageJson.exports['.'] = {};
  if (parsedFormats.includes('esm')) {
    packageJson.exports['.']['import'] = {};
    if (extensions === 'modern') {
      packageJson.exports['.']['import']['types'] = './dist/index.d.mts';
      packageJson.exports['.']['import']['default'] = './dist/index.mjs';
      packageJson.module = './dist/index.mjs';
    } else {
      packageJson.exports['.']['import']['types'] = './dist/index.d.mts';
      packageJson.exports['.']['import']['default'] = './dist/index.esm.js';
      packageJson.module = './dist/index.esm.js';
    }
  }

  if (parsedFormats.includes('cjs')) {
    packageJson.exports['.']['require'] = {};
    if (extensions === 'modern') {
      packageJson.exports['.']['require']['types'] = './dist/index.d.cts';
      packageJson.exports['.']['require']['default'] = './dist/index.cjs';
      packageJson.main = './dist/index.cjs';
    } else {
      packageJson.exports['.']['require']['types'] = './dist/index.d.cts';
      packageJson.exports['.']['require']['default'] =
        './dist/cjs/index.cjs.js';
      packageJson.main = './dist/cjs/index.cjs.js';
    }
  }

  consola.log('\n🔀 Sorting the final package.json');

  fs.writeFileSync(
    path.join(targetPath, 'package.json'),
    sortPackageJson(JSON.stringify(packageJson))
  );

  consola.log('\n🔨 Building');
  runCommand('run build');

  consola.log('\n🚦 Linting');
  runCommand('run lint');

  consola.log('\n🪄 Formatting');
  runCommand('run format');

  consola.log('\n✅ All done run package scripts powered by `pkg-tools`!');
}
