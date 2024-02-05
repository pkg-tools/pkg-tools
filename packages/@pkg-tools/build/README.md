# @pkg-tools/build

> A build tool with typed configuration.

[![@pkg-tools/build::version][build-version-src]][build-version-href] [![@pkg-tools/build::downloads][build-downloads-src]][build-downloads-href]

This tool is a thin abstraction on top of [unbuild](https://github.com/unjs/unbuild). It centralizes your build configuration, which helps us consistently build opensource packages that support both module systems (CJS and ESM).

## Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/build @pkg-tools/config

# w/ yarn
yarn add -D @pkg-tools/build @pkg-tools/config

# w/ npm
npm install -D @pkg-tools/build @pkg-tools/config
```

## Usage

In your `package.json`, you can use the exported cli `build` in your build script e.g.

```
"scripts": {
  "build": "build"
  "dev": "build -w"
  "stub": "build -s"
}
```

## Configure

Define a `pkg.config.ts` in the root of your package and add the following.

```ts
import { defineConfig } from "@pkg-tools/config";

export default defineConfig({
  build: {
    entries: ["src/index"],
    sourcemap: true,
    extensions: "compatible",
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      esbuild: {
        target: ["node16"],
        minify: true,
      },
    },
    declaration: "compatible",
  },
});
```

## License

[MIT](./LICENSE)

[build-version-src]: https://img.shields.io/npm/v/%40pkg-tools/build?style=flat-square
[build-version-href]: https://npmjs.com/package/%40pkg-tools/build
[build-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/build?style=flat-square
[build-downloads-href]: https://npmjs.com/package/%40pkg-tools/build
