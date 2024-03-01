import consola from 'consola';

import fs from 'node:fs';
import path from 'node:path';
import childProcess from 'node:child_process';
import url from 'node:url';
import { packageManagerFromUserAgent } from './utils';

import pkgConfigTemplate from './templates/pkg-config';

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
    filter: (source) => {
      return (
        !source.includes('node_modules') &&
        !source.includes('dist') &&
        !source.includes('pkg.config.ts')
      );
    },
  });

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

  if (parsedFormats.includes('esm')) {
    if (extensions === 'modern') {
      runCommand(
        'pkg set exports["."]["import"]["types"]="./dist/index.d.mts"'
      );
      runCommand(
        'pkg set exports["."]["import"]["default"]="./dist/index.mjs"'
      );
      runCommand('pkg set module="./dist/index.mjs"');
    } else {
      runCommand(
        'pkg set exports["."]["import"]["types"]="./dist/index.d.mts"'
      );
      runCommand(
        'pkg set exports["."]["import"]["default"]="./dist/index.esm.js"'
      );
      runCommand('pkg set module="./dist/index.esm.js"');
    }
  }

  if (parsedFormats.includes('cjs')) {
    if (extensions === 'modern') {
      runCommand(
        'pkg set exports["."]["require"]["types"]="./dist/index.d.cts"'
      );
      runCommand(
        'pkg set exports["."]["require"]["require"]="./dist/index.cjs"'
      );
      runCommand('pkg set main="./dist/index.cjs"');
    } else {
      runCommand(
        'pkg set exports["."]["require"]["types"]="./dist/index.d.cts"'
      );
      runCommand(
        'pkg set exports["."]["require"]["require"]="./dist/cjs/index.cjs.js"'
      );
      runCommand('pkg set main="./dist/cjs/index.cjs.js"');
    }
  }

  consola.log('\n✅ All done with the install!');

  consola.log('\n🔨 Building');
  runCommand('run build');

  consola.log('\n🚦 Linting');
  runCommand('run lint');

  consola.log('\n🪄 Formatting');
  runCommand('run format');

  consola.log('\n✅ All done run package scripts powered by `pkg-tools`!');
}
