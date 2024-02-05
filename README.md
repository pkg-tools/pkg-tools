# pkg-tools

> An opinionated TS package build toolchain w/ typed configuration.

[![Github Actions][github-actions-src]][github-actions-href]

## Usage

**Install:**

```sh
# pnpm
pnpm add -D @pkg-tools/build @pkg-tools/clean @pkg-tools/config @pkg-tools/format @pkg-tools/lint

# yarn
yarn add -D @pkg-tools/build @pkg-tools/clean @pkg-tools/config @pkg-tools/format @pkg-tools/lint

# npm
npm install -D @pkg-tools/build @pkg-tools/clean @pkg-tools/config @pkg-tools/format @pkg-tools/lint
```

**Import:**

Use the CLIs provided by the pacakges in your package scripts.

```json
"scripts": {
  "build": "build",
  "clean": "clean",
  "dev": "build -w",
  "format": "format",
  "lint": "lint"
},
```

**Configuration:**

Define a `pkg.config.ts` in the root of your package and configure your pkg-tools.

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
  clean: {
    directory: "./dist",
  },
  format: {
    semi: true,
    tabWidth: 2,
    singleQuote: true,
  },
  lint: {
    rules: {
      "no-unused-vars": 0,
    },
  },
});
```

## 👀 Examples

Check out the [examples](./examples) to see pkg-tools usage.

- [node-module-ts](./examples/node-module-ts)
- [node-module-cli-ts](./examples/node-module-cli-ts)
- [react-app-vite-ts](./examples/react-app-vite-ts)
- [react-component-ts](./examples/react-component-ts)

## 🔬 Background

### 🚩 Problem

The build toolchain necessary to ship TS packages is complicated i.e., the dependencies, configuration, and package scripts necessary do the following.

- build
- dev (build w/ watch)
- lint
- format
- clean

The complexity arises from the growing number of runtimes targeted, the variety of what might be in your package, and the voltaility of the JS/TS ecosystem.

### 🎯Goal

Create an opinionated TS package build toolchain to help accomplish the most common tasks. Each tool should do the following.

- Wrap the modern best-of-breed tool for the task
- Be usable as a CLI or programmatically
- Be configurable via a single typed configuration file (`pkg.config.ts`)

### 🛠️ Tools

Below is the family of tools the comprise pkg-tools.

| Package                                               |  CLI(s)  |                                                                   Library                                                                    | Status |                                                                  Version | Downloads                                                                      |
| ----------------------------------------------------- | :------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----: | -----------------------------------------------------------------------: | ------------------------------------------------------------------------------ |
| **[@pkg-tools/build](./packages/@pkg-tools/build)**   | `build`  |                                                  [unbuild](https://github.com/unjs/unbuild)                                                  |   🟢   |    [![@pkg-tools/build::version][build-version-src]][build-version-href] | [![@pkg-tools/build::downloads][build-downloads-src]][build-downloads-href]    |
| **[@pkg-tools/clean](./packages/@pkg-tools/clean)**   | `clean`  |                                                [shelljs](https://github.com/shelljs/shelljs)                                                 |   🟢   |    [![@pkg-tools/clean::version][clean-version-src]][clean-version-href] | [![@pkg-tools/clean::downloads][clean-downloads-src]][clean-downloads-href]    |
| **[@pkg-tools/format](./packages/@pkg-tools/format)** | `format` |                                                       [prettier](https://prettier.io/)                                                       |   🟢   | [![@pkg-tools/format::version][format-version-src]][format-version-href] | [![@pkg-tools/format::downloads][format-downloads-src]][format-downloads-href] |
| **[@pkg-tools/lint](./packages/@pkg-tools/lint)**     |  `lint`  |                                                        [eslint](https://eslint.org/)                                                         |   🟢   |       [![@pkg-tools/lint::version][lint-version-src]][lint-version-href] | [![@pkg-tools/lint::downloads][lint-downloads-src]][lint-downloads-href]       |
| **[@pkg-tools/sync](./packages/@pkg-tools/sync)**     |  `sync`  |                                                [oktokit](https://github.com/octokit/rest.js)                                                 |   🟡   |       [![@pkg-tools/sync::version][sync-version-src]][sync-version-href] | [![@pkg-tools/sync::downloads][sync-downloads-src]][sync-downloads-href]       |
| **[@pkg-tools/sort](./packages/@pkg-tools/sort)**     |  `sort`  | [oranize-imports](https://www.npmjs.com/package/organize-imports-cli) / [sort-pacakge-json](https://www.npmjs.com/package/sort-package-json) |   🔴   |       [![@pkg-tools/sync::version][sync-version-src]][sync-version-href] | [![@pkg-tools/sync::downloads][sync-downloads-src]][sync-downloads-href]       |

## Development

- Clone this repository
- Run `fnm` or `nvm` in the monorepo root
- Install dependencies using `pnpm install`
- Build the monorepo `pnpm run build`

## License

[MIT](./LICENSE)

[build-version-src]: https://img.shields.io/npm/v/%40pkg-tools/build?style=flat-square
[build-version-href]: https://npmjs.com/package/%40pkg-tools/build
[build-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/build?style=flat-square
[build-downloads-href]: https://npmjs.com/package/%40pkg-tools/build
[clean-version-src]: https://img.shields.io/npm/v/%40pkg-tools/clean?style=flat-square
[clean-version-href]: https://npmjs.com/package/%40pkg-tools/clean
[clean-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/clean?style=flat-square
[clean-downloads-href]: https://npmjs.com/package/%40pkg-tools/clean
[format-version-src]: https://img.shields.io/npm/v/%40pkg-tools/format?style=flat-square
[format-version-href]: https://npmjs.com/package/%40pkg-tools/format
[format-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/format?style=flat-square
[format-downloads-href]: https://npmjs.com/package/%40pkg-tools/format
[lint-version-src]: https://img.shields.io/npm/v/%40pkg-tools/lint?style=flat-square
[lint-version-href]: https://npmjs.com/package/%40pkg-tools/lint
[lint-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/lint?style=flat-square
[lint-downloads-href]: https://npmjs.com/package/%40pkg-tools/lint
[sync-version-src]: https://img.shields.io/npm/v/%40pkg-tools/sync?style=flat-square
[sync-version-href]: https://npmjs.com/package/%40pkg-tools/sync
[sync-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/sync?style=flat-square
[sync-downloads-href]: https://npmjs.com/package/%40pkg-tools/sync
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/pkg-tools/pkg-tools/ci.yml?style=flat-square
[github-actions-href]: https://github.com/pkg-tools/pkg-tools/actions/workflows/ci.yml
