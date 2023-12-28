const { getPackageNamesSync } = require('@dopt/wutils');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'scope-enum': [0], // level: disabled
    'function-rules/scope-enum': [
      2, // level: error
      'always',
      (parsed) => {
        const packageNames = getPackageNamesSync();
        if (!parsed.scope || packageNames.includes(parsed.scope)) {
          return [true];
        }

        return [
          false,
          `scope must be one of\n\n    \u001b[37;1m<<<Global Scopes>>>\u001b[0m\n\t\u001b[32;1m${GLOBAL_SCOPES.join(
            '\n\t'
          )}\u001b[0m\n\n    \u001b[37;1m<<<Package Scopes>>>\u001b[0m\n\t\u001b[32;1m${packageNames.join(
            '\n\t'
          )}\u001b[0m\n\n`,
        ];
      },
    ],
  },
};
