# pkg-tools

> A simpler way to build and ship TypeScript packages.

[![Github Actions][github-actions-src]][github-actions-href]

🚧 This project is in beta. 🚧

## 💭 What if...

The non-source bits of your TypeScript packages were dead simple.

I'm talking about **building**, **deving**, **linting**, **formatting**, **cleaning**, **publishing**, etc.

The work required to make the underlying source code useful.

There are tons of libraries out there that can help you do this, but choosing the right one can be dauting. Once you've made your choice, you need to configure the tool (typically via dotfiles and the like) and define your usage in package scripts.

This can be onerous.

But what if you could install one tool to do the job, a tool with a **single configuration file**, written in **TypeScript** so that all your configuration options were typed.

And what if that meant that the relevant bits of your `package.json` could look like below.

```json
"scripts": {
  "build": "build",
  "clean": "clean",
  "dev": "build -s",
  "format": "format",
  "lint": "lint"
},
"devDependencies": {
  "@pkg-tools/pkg-tools": "1.0.0",
}
```

With a single `pkg.config.ts` file at the root of your package that looks like this.

```ts
import { definePkgToolsConfig } from '@pkg-tools/config';

export default definePkgToolsConfig({
  build: {...},
  format: {...},
  clean: {...},
  lint: {...},
});
```

### 💡Goal

Create a tool per-typical/common TypesScript package task. Each tool should do the following.

- Wrap the best-of-breed tool for the task
- Expose a CLI for usage in package scripts and a function for programmatic usage
- Be configurable in the `pkg.config.ts`
- Be accessible via an individual package (e.g. `@pkg-tools/build` or via a monolitic package `import { build } from '@pkg-tools/pkg-tools'`

### 🛠️ Tools

Below is the family of tools the comprise pkg-tools.

| Package                                                                      | Status |                                                                           Version | Downloads                                                                               |
| ---------------------------------------------------------------------------- | :----: | --------------------------------------------------------------------------------: | --------------------------------------------------------------------------------------- |
| **[@pkg-tools/pkg-tools](https://npmjs.com/package/%40pkg-tools/pkg-tools)** |   🟢   | [![@pkg-tools/pkg-tools::version][pkg-tools-version-src]][pkg-tools-version-href] | [![@pkg-tools/pkg-tools::downloads][pkg-tools-downloads-src]][pkg-tools-downloads-href] |
| **[@pkg-tools/build](https://npmjs.com/package/%40pkg-tools/build)**         |   🟢   |             [![@pkg-tools/build::version][build-version-src]][build-version-href] | [![@pkg-tools/build::downloads][build-downloads-src]][build-downloads-href]             |
| **[@pkg-tools/clean](https://npmjs.com/package/%40pkg-tools/clean)**         |   🟢   |             [![@pkg-tools/clean::version][clean-version-src]][clean-version-href] | [![@pkg-tools/clean::downloads][clean-downloads-src]][clean-downloads-href]             |
| **[@pkg-tools/format](https://npmjs.com/package/%40pkg-tools/format)**       |   🟢   |          [![@pkg-tools/format::version][format-version-src]][format-version-href] | [![@pkg-tools/format::downloads][format-downloads-src]][format-downloads-href]          |
| **[@pkg-tools/lint](https://npmjs.com/package/%40pkg-tools/lint)**           |   🟢   |                [![@pkg-tools/lint::version][lint-version-src]][lint-version-href] | [![@pkg-tools/lint::downloads][lint-downloads-src]][lint-downloads-href]                |
| **[@pkg-tools/sync](https://npmjs.com/package/%40pkg-tools/sync)**           |   🟡   |                [![@pkg-tools/sync::version][sync-version-src]][sync-version-href] | [![@pkg-tools/sync::downloads][sync-downloads-src]][sync-downloads-href]                |

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
