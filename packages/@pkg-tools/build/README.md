## @dopt/pkg-build

A CLI for building packages.

This CLI is a thin abstraction on top of [unbuild](https://github.com/unjs/unbuild). It centralizes our build configuration, which helps us consistently build opensource packages that support both module systems (CJS and ESM).

### Install

```bash
# w/ pnpm
pnpm add -D @dopt/pkg-build

# w/ yarn
yarn add -D @dopt/pkg-build

# w/ npm
npm install -D @dopt/pkg-build
```

### Usage

Create a `build.config.ts` in your package root that imports `@dopt/pkg-build`.

This package exports `external` and `internal` build configurations. External are for package we externalize i.e. opensource and publish.

We provide four different external package build configurations.

1. node
1. isomorphic
1. browser
1. react

If we were building a node package, our `build.config.ts` might look like the following.

```
import { external } from '@dopt/pkg-build';

export default external.node({
  // ... override any default build configuration
})
```

Now, in your `package.json`, you can use the exported cli `pkg-build` in your build script e.g.

```
"scripts": {
  "build": "pkg-build"
}
```

Using your package manager, you can now run the build script to build your package.
