## @dopt/pkg-clean

A CLI for cleaning packages build artifacts.

This CLI is a thin abstraction on top of [ShellJs](https://www.npmjs.com/package/shelljs). It centralizes our usage of ShellJS's `rm` command.

### Install

```bash
# w/ pnpm
pnpm add -D @dopt/pkg-clean

# w/ yarn
yarn add -D @dopt/pkg-clean

# w/ npm
npm install -D @dopt/pkg-clean
```

### Usage

```
"scripts": {
  "clean": "pkg-clean"
}
```

Using your package manager, you can now run the build script to clean your package's `./dist` directory.
