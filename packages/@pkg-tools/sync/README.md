## @pkg-tools/sync

🚧 This package is in beta. 🚧

A CLI for mirroring code from a package in a monorepo to another repository

### Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/sync

# w/ yarn
yarn add -D @pkg-tools/sync

# w/ npm
npm install -D @pkg-tools/sync
```

### Usage

In your `package.json`, you can use the exported cli `sync` in your sync script e.g.

```
"scripts": {
  "sync": "sync"
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
  sync: {...},
});

```
