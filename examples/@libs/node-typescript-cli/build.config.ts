import { config } from "@pkg-tools/build";

export default config.node({
  entries: ["src/index", "src/cli"],
});
