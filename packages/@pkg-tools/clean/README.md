# @pkg-tools/clean

> A build artifact cleaning tool with typed configuration.

[![@pkg-tools/clean::version][clean-version-src]][clean-version-href]
[![@pkg-tools/clean::downloads][clean-downloads-src]][clean-downloads-href]

This CLI is a thin abstraction on top of [ShellJs](https://www.npmjs.com/package/shelljs). It centralizes our usage of ShellJS's `rm` command.

## Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/clean @pkg-tools/config

# w/ yarn
yarn add -D @pkg-tools/clean @pkg-tools/config

# w/ npm
npm install -D @pkg-tools/clean @pkg-tools/config
```

## Usage

In your `package.json`, you can use the exported cli `clean` in your clean script e.g.

```
"scripts": {
  "clean": "clean"
}
```

## Configure

Define a `pkg.config.ts` in the root of your package and add the following.

```ts
import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  clean: {
    directory: './dist',
  },
});
```

## License

[MIT](./LICENSE)

[clean-version-src]: https://img.shields.io/npm/v/%40pkg-tools/clean?style=flat-square
[clean-version-href]: https://npmjs.com/package/%40pkg-tools/clean
[clean-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/clean?style=flat-square
[clean-downloads-href]: https://npmjs.com/package/%40pkg-tools/clean
