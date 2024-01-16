const { getLintConfig } = require("@pkg-tools/config");
module.exports = {
  ...getLintConfig().overrideConfig,
};
