# @pkg-tools/sync

🚧 This package is in beta. 🚧

> A code mirroring tool with typed configuration.

[![@pkg-tools/sync::version][sync-version-src]][sync-version-href]
[![@pkg-tools/sync::downloads][sync-downloads-src]][sync-downloads-href]

A CLI for mirroring code from a package in a monorepo to another repository.

## Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/sync @pkg-tools/config

# w/ yarn
yarn add -D @pkg-tools/sync @pkg-tools/config

# w/ npm
npm install -D @pkg-tools/sync @pkg-tools/config

```

## Usage

In your `package.json`, you can use the exported cli `sync` in your sync script e.g.

```
"scripts": {
  "sync": "sync"
}
```

## Configure

Define a `pkg.config.ts` in the root of your package and add the following.

```ts
import { defineConfig } from "@pkg-tools/config";

export default defineConfig({
  sync: {
    //TBD
  },
});
```

## License

[MIT](./LICENSE)

[sync-version-src]: https://img.shields.io/npm/v/%40pkg-tools/sync?style=flat-square
[sync-version-href]: https://npmjs.com/package/%40pkg-tools/sync
[sync-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/sync?style=flat-square
[sync-downloads-href]: https://npmjs.com/package/%40pkg-tools/sync
