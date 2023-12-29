## @pkg-tools/format

A CLI for formating packages build artifacts.

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

```
"scripts": {
  "format": "format"
}
```

Using your package manager, you can now run the build script to format your package's `./src` directory.
