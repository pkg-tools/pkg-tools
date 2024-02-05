# @pkg-tools/config

> A package used to configure your pkg-tools usage

[![@pkg-tools/config::version][config-version-src]][config-version-href]
[![@pkg-tools/config::downloads][config-downloads-src]][config-downloads-href]

This package is meant to be used in tandem with other pkg-tools packages. It provides a function `defineConfig` for defining your pkg-tools configuration.

## Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/config

# w/ yarn
yarn add -D  @pkg-tools/config

# w/ npm
npm install -D @pkg-tools/config
```

## Usage

Define a `pkg.config.ts` in the root of your package and add the following.

```ts
import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  config: {
    directory: './dist',
  },
});
```

## License

[MIT](./LICENSE)

[config-version-src]: https://img.shields.io/npm/v/%40pkg-tools/config?style=flat-square
[config-version-href]: https://npmjs.com/package/%40pkg-tools/config
[config-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/config?style=flat-square
[config-downloads-href]: https://npmjs.com/package/%40pkg-tools/config
