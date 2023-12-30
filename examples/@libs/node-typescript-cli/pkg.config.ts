import { definePkgToolsConfig } from "@pkg-tools/config";
import { config } from "@pkg-tools/build";

export default definePkgToolsConfig({
  build: config.node({
    entries: ["src/index", "src/cli"],
  }),
  format: {
    semi: true,
  },
});
