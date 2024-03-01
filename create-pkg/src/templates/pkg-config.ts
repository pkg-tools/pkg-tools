export default function ({
  cjs = false,
  sourcemap = true,
  minify = true,
  extensions = 'modern',
}: {
  cjs: boolean;
  sourcemap: boolean;
  minify: boolean;
  extensions?: 'modern' | 'compatible';
}) {
  return `import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  build: {
    entries: ['src/index'],
    ${sourcemap && `sourcemap: true,`}
    ${extensions && `extensions: ${extensions}`}
    rollup: {
      inlineDependencies: true,
      ${cjs && `emitCJS: true,`}
      esbuild: {
        target: ['node16'],
        ${minify && `minify: true,`}
      },
    },
    declaration: 'compatible',
  },
  format: {
    semi: true,
    tabWidth: 2,
    singleQuote: true,
  },
  lint: {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
});
`;
}
