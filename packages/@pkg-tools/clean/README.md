## @pkg-tools/clean

A CLI for cleaning packages build artifacts.

This CLI is a thin abstraction on top of [ShellJs](https://www.npmjs.com/package/shelljs). It centralizes our usage of ShellJS's `rm` command.

### Install

```bash
# w/ pnpm
pnpm add -D @pkg-tools/clean

# w/ yarn
yarn add -D @pkg-tools/clean

# w/ npm
npm install -D @pkg-tools/clean
```

### Usage

In your `package.json`, you can use the exported cli `clean` in your clean script e.g.

```
"scripts": {
  "clean": "clean"
}
```

By default `clean` removes the `./dist` directory. If you need to clean a different directory provide a relative path to it as an argument e.g.,

```
"scripts": {
  "clean": "clean ./lib"
}
```

Alternatively, you can configre clean using the a `pkg.config.ts` configuration. See the next section.

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
  clean: {
    directory: './lib',
  },
});
```
