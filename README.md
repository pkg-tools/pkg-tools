# pkg-tools

> An opinionated toolchain for your TS package's build-related tasks.

[![Github Actions][github-actions-src]][github-actions-href]

🚧 This project is in beta. 🚧

## 🚩 Problem

The toolchain necessary to build TypeScript packages is quite complicated.

I'm talking about the libraries, configuration, and package scripts necessary do the following.

- build
- dev
- lint
- format
- clean

The complexity is a function of the growing number of target runtimes, the sheer variety of what might be in those packages, and the voltaility of the JS/TS ecosystem.

## 🎯Goal

Create an opinionated toolchain for the most common TS package tasks. Each tool should do the following.

- Wrap the modern best-of-breed tool for the task
- Be usable as a CLI or programmatically
- Be configurable via a single typed configuration file (`pkg-tools.config.ts`)
- Usable individually or via a monolithic package

## 🛠️ Tools

Below is the family of tools the comprise pkg-tools.

| Package                                               |  CLI(s)  |                                                                   Library                                                                    | Status |                                                                  Version | Downloads                                                                      |
| ----------------------------------------------------- | :------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----: | -----------------------------------------------------------------------: | ------------------------------------------------------------------------------ |
| **[@pkg-tools/build](./packages/@pkg-tools/build)**   | `build`  |                                                  [unbuild](https://github.com/unjs/unbuild)                                                  |   🟢   |    [![@pkg-tools/build::version][build-version-src]][build-version-href] | [![@pkg-tools/build::downloads][build-downloads-src]][build-downloads-href]    |
| **[@pkg-tools/clean](./packages/@pkg-tools/clean)**   | `clean`  |                                                [shelljs](https://github.com/shelljs/shelljs)                                                 |   🟢   |    [![@pkg-tools/clean::version][clean-version-src]][clean-version-href] | [![@pkg-tools/clean::downloads][clean-downloads-src]][clean-downloads-href]    |
| **[@pkg-tools/format](./packages/@pkg-tools/format)** | `format` |                                                       [prettier](https://prettier.io/)                                                       |   🟢   | [![@pkg-tools/format::version][format-version-src]][format-version-href] | [![@pkg-tools/format::downloads][format-downloads-src]][format-downloads-href] |
| **[@pkg-tools/lint](./packages/@pkg-tools/lint)**     |  `lint`  |                                                        [eslint](https://eslint.org/)                                                         |   🟢   |       [![@pkg-tools/lint::version][lint-version-src]][lint-version-href] | [![@pkg-tools/lint::downloads][lint-downloads-src]][lint-downloads-href]       |
| **[@pkg-tools/sync](./packages/@pkg-tools/sync)**     |  `sync`  |                                                [oktokit](https://github.com/octokit/rest.js)                                                 |   🟡   |       [![@pkg-tools/sync::version][sync-version-src]][sync-version-href] | [![@pkg-tools/sync::downloads][sync-downloads-src]][sync-downloads-href]       |
| **[@pkg-tools/sort](./packages/@pkg-tools/sort)**     |  `sort`  | [oranize-imports](https://www.npmjs.com/package/organize-imports-cli) / [sort-pacakge-json](https://www.npmjs.com/package/sort-package-json) |   🔴   |       [![@pkg-tools/sync::version][sync-version-src]][sync-version-href] | [![@pkg-tools/sync::downloads][sync-downloads-src]][sync-downloads-href]       |

All of the tools and their CLIs are re-exported via a monolithic package called **[@pkg-tools/pkg-tools](./packages/@pkg-tools/pkg-tools)**.

## Usage

**Install:**

The monolithic package.

```sh
# pnpm
pnpm add -D @pkg-tools/pkg-tool

# yarn
yarn add -D @pkg-tools/pkg-tool

# npm
npm install -D @pkg-tools/pkg-tool --save-dev
```

or select individual packages e.g.

```sh
# pnpm
pnpm add -D @pkg-tools/build @pkg-tools/format @pkg-tools/config

# yarn
yarn add -D @pkg-tools/build @pkg-tools/format @pkg-tools/config

# npm
npm install -D @pkg-tools/build @pkg-tools/format @pkg-tools/config
```

**Import:**

Use the CLIs provided by the pacakge(s) in your package scripts.

```json
"scripts": {
  "build": "build",
  "clean": "clean",
  "dev": "build -s",
  "format": "format",
  "lint": "lint"
},
```

**Configuration:**

Define a `pkg-tools.config.ts` in the root of your package and add the following.

```ts
import { definePkgToolsConfig } from '@pkg-tools/config';

export default definePkgToolsConfig({
  build: {...},
  clean: {...},
  format: {...},
  lint: {...},
});

```

## Development

- Clone this repository
- Run `fnm` or `nvm` in the monorepo root
- Install dependencies using `pnpm install`
- Build the monorepo `pnpm run build`

## License

[MIT](./LICENSE)

[pkg-tools-version-src]: https://img.shields.io/npm/v/%40pkg-tools/pkg-tools?style=flat-square
[pkg-tools-version-href]: https://npmjs.com/package/%40pkg-tools/pkg-tools
[pkg-tools-downloads-src]: https://img.shields.io/npm/dm/%40pkg-tools/pkg-tools?style=flat-square
[pkg-tools-downloads-href]: https://npmjs.com/package/%40pkg-tools/pkg-tools
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
