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

Using your package manager, you can now run the build script to clean your package's `./dist` directory.
