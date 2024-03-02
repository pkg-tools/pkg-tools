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
pnpm create @pkg-tools/pkg -- --path=path-to-package --template=template-name

# Yarn
yarn create @pkg-tools/pkg -- --path=path-to-package --template=template-name

# npm
npm create @pkg-tools/pkg -- --path=path-to-package --template=template-name
```

## Templates

See the [`templates`](./templates) directory for the list of templates.

- [`node`](./templates/node)
- [`cli`](./templates/cli)
- [`react`](./templates/react)

## License

[MIT](./LICENSE)
