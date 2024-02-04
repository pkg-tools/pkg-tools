import { defineConfig } from "@pkg-tools/config"

export default defineConfig({
    build: [
        {
            failOnWarn: false,
            entries: ["src/index"],
            rollup: {
                inlineDependencies: true,
                esbuild: {
                    target: "node16",
                    minify: true,
                },
            },
            declaration: "node16",
        },
        {
            entries: ["src/cli"],
            clean: false,
            rollup: {
                inlineDependencies: true,
                esbuild: {
                    target: "node16",
                    minify: true,
                },
            },
        },
    ],
    format: {
        semi: false,
        tabWidth: 4,
        singleQuote: false,
    },
})
