## @pkg-tools/format

A CLI for formating a package's source code.

This CLI is a thin abstraction on top of [prettier](https://prettier.io/).

### Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/format

# w/ yarn
yarn add -D @pkg-tools/format

# w/ npm
npm install -D @pkg-tools/format
```

### Usage

In your `package.json`, you can use the exported cli `format` in your format script e.g.

```json
"scripts": {
  "format": "format"
}
```

You can also check if the formatting is correct e.g.

```json
"scripts": {
  "format:check": "format -c"
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

Define a `pkg.config.ts` in the root of your package and add the following.

```ts
import { definePkgToolsConfig } from '@pkg-tools/config';

export default definePkgToolsConfig({
  format: {...},
});

```
