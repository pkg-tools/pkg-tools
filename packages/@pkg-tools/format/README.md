# @pkg-tools/format

> A code formatting tool with typed configuration.

[![@pkg-tools/format::version][format-version-src]][format-version-href]
[![@pkg-tools/format::downloads][format-downloads-src]][format-downloads-href]

This CLI is a thin abstraction on top of [prettier](https://prettier.io/).

## Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/format @pkg-tools/config

# w/ yarn
yarn add -D @pkg-tools/format @pkg-tools/config

# w/ npm
npm install -D @pkg-tools/format @pkg-tools/config
```

## Usage

In your `package.json`, you can use the exported cli `format` in your format script e.g.

```
"scripts": {
  "format": "format"
  "format:check": "format -c"
}
```

## Configure

Define a `pkg.config.ts` in the root of your package and add the following.

```ts
import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  format: {
    semi: true,
    tabWidth: 2,
    singleQuote: true,
  },
});
```

## License

[MIT](./LICENSE)

[format-version-src]: https://img.shields.io/npm/v/%40pkg-tools/format?style=flat-square
[format-version-href]: https://npmjs.com/package/%40pkg-tools/format
[format-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/format?style=flat-square
[format-downloads-href]: https://npmjs.com/package/%40pkg-tools/format
