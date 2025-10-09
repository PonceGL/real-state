/* eslint-disable import/no-anonymous-default-export */
export default { 
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
          2,
          'always',
          ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'test', 'chore'],
        ],
        'scope-empty': [2, 'never'],
      },
 };
