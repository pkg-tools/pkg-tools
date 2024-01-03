## @pkg-tools/build

A CLI for building packages.

This CLI is a thin abstraction on top of [unbuild](https://github.com/unjs/unbuild). It centralizes our build configuration, which helps us consistently build opensource packages that support both module systems (CJS and ESM).

### Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/build

# w/ yarn
yarn add -D @pkg-tools/build

# w/ npm
npm install -D @pkg-tools/build
```

### Usage

In your `package.json`, you can use the exported cli `build` in your build script e.g.

```
"scripts": {
  "build": "build"
}
```

### Configuration

Install the @pkg-tools/config package

```bash
# w/ pnpm
pnpm add -D @pkg-tools/config

# w/ yarn
yarn add -D @pkg-tools/config

# w/ npm
npm install -D @pkg-tools/config
```

Define a `pkg-tools.config.ts` in the root of your package and add the following.

```ts
import { definePkgToolsConfig } from '@pkg-tools/config';

export default definePkgToolsConfig({
  build: {...},
});

```
