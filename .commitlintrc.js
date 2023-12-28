/** @type {import('cz-git').UserConfig} */
const { getPackageNamesSync } = require('@dopt/wutils');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    types: [
      { value: 'feat', name: 'feat:     ✨  A new feature' },
      { value: 'build', name: 'build:    🚧  A Build system change' },
      { value: 'fix', name: 'fix:      🐛  A bug fix' },
      { value: 'docs', name: 'docs:     📝  Documentation only changes' },
      {
        value: 'style',
        name: 'style:    🎨  Changes that do not affect the meaning of the code (white-space, formatting)',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   A code change that neither fixes a bug nor adds a feature',
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  A code change that improves performance',
      },
      {
        value: 'test',
        name: 'test:     ✅  Adding missing tests or correcting existing tests',
      },
      {
        value: 'ci',
        name: 'ci:       🤖  Changes to CI configuration and scripts (e.g. GitHub Actions)',
      },
      {
        value: 'chore',
        name: "chore:    🔨  Other changes that don't modify src or test files",
      },
      { value: 'revert', name: 'revert:   ⏪️  Revert to a commit' },
    ],

    scopes: [...getPackageNamesSync()].map((scope) => ({
      name: scope,
    })),

    messages: {
      type: "Select the type of change that you're committing:",
      scope: '\nWhat is the SCOPE of this change:',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change: (press enter to skip)\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },

    allowCustomScopes: false,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['breaking', 'footerPrefix', 'footer'],
    maxSubjectLength: 100,
  },
};
