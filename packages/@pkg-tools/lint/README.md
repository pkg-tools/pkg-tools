## @pkg-tools/lint

A CLI for linting packages source code.

This CLI is a thin abstraction on top of [eslint](https://eslint.org/).

### Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/lint

# w/ yarn
yarn add -D @pkg-tools/lint

# w/ npm
npm install -D @pkg-tools/lint
```

### Usage

In your `package.json`, you can use the exported cli `lint` in your lint script e.g.

```
"scripts": {
  "lint": "lint"
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
  lint: {...},
});

```
