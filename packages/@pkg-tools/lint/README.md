# @pkg-tools/lint

> A code linting tool with typed configuration.

[![@pkg-tools/lint::version][lint-version-src]][lint-version-href]
[![@pkg-tools/lint::downloads][lint-downloads-src]][lint-downloads-href]

This CLI is a thin abstraction on top of [eslint](https://eslint.org/).

## Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/lint @pkg-tools/config

# w/ yarn
yarn add -D @pkg-tools/lint @pkg-tools/config

# w/ npm
npm install -D @pkg-tools/lint @pkg-tools/config

```

## Usage

In your `package.json`, you can use the exported cli `lint` in your lint script e.g.

```
"scripts": {
  "lint": "lint"
}
```

## Configure

Define a `pkg.config.ts` in the root of your package and add the following.

```ts
import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  lint: {
    rules: {
      'no-unused-vars': 0,
    },
  },
});
```

## License

[MIT](./LICENSE)

[lint-version-src]: https://img.shields.io/npm/v/%40pkg-tools/lint?style=flat-square
[lint-version-href]: https://npmjs.com/package/%40pkg-tools/lint
[lint-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/lint?style=flat-square
[lint-downloads-href]: https://npmjs.com/package/%40pkg-tools/lint
