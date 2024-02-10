import consola from 'consola';

import fs from 'node:fs';
import path from 'node:path';
import childProcess from 'node:child_process';
import { packageManagerFromUserAgent } from './utils';

interface ScaffoldArguments {
  targetPath?: string;
  template?: string;
}

export async function scaffold({
  targetPath,
  template = 'node-module-ts',
}: ScaffoldArguments) {
  const templatePath = path.resolve(__dirname, `../templates/${template}`);

  if (!targetPath) {
    targetPath = `./${template}`;
  }

  if (!fs.existsSync(templatePath)) {
    consola.error(`"${template}" template does not exist`);
  }

  consola.info(
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

  fs.cpSync(templatePath, targetPath, { recursive: true });

  consola.log('\n🚧 Installing dependencies...');

  childProcess.execSync(`${packageManagerFromUserAgent()} install`, {
    cwd: targetPath,
    stdio: 'inherit',
  });

  consola.log('\n✅ All done!');
}
