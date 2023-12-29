## @pkg-tools/lint

A CLI for linting packages build artifacts.

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

```
"scripts": {
  "lint": "lint"
}
```

Using your package manager, you can now run the build script to lint your package's `./src` directory.
