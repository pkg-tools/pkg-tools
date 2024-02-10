#! /usr/bin/env node

import consola from 'consola';
import fs from 'node:fs';
import path from 'node:path';

if (!fs.existsSync(path.resolve(process.env.INIT_CWD, './.prettierrc.cjs'))) {
  fs.writeFileSync(
    path.resolve(process.env.INIT_CWD, './.prettierrc.cjs'),
    `const { getConfig } = require("@pkg-tools/format/config");
module.exports = {
  ...getConfig(),
};
`
  );
} else {
  consola.info(
    `Looks like you already have a .eslintrc.cjs. Not overwriting it.`
  );
  consola.info(
    `For @pkg-tools/lint to work you'll need to create this file manually`
  );
  consola.info('It should like like this');
  console.log(`const { getConfig } = require("@pkg-tools/format/config");
module.exports = {
  ...getConfig(),
};
`);
}
