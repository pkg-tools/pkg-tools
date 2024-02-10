# @pkg-tools/create-pkg

> A CLI for scaffolding packages w/ pkg-tools

## Usage

```sh
# pnpm
pnpm create @pkg-tools/pkg

# Yarn
yarn create @pkg-tools/pkg

# npm
npm create @pkg-tools/pkg
```

And then follow the instructions printed in your terminal.

You can specify the path to initialize the example project and the template to use by running:

```sh
# pnpm
pnpm create @pkg-tools/pkg path-to-pacakge -- --template template-name

# Yarn
yarn create @pkg-tools/pkg path-to-pacakge -- --template template-name

# npm
npm create @pkg-tools/pkg path-to-pacakge -- --template template-name
```

## Templates

See the [`templates`](./templates) directory for the list of templates.

- [`node-module-ts`](./templates/node-module-ts)
- [`node-cli-ts`](./templates/node-cli-ts)
- [`react-component-ts`](./templates/react-component-ts)

## License

[MIT](./LICENSE)
