import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    ignores: [
      'dist/*',
      '.docusaurus/*',
      'build/*',
      'docs/*',
      'rollup.config.mjs',
      'jest.config.js',
      'commitlint.config.js'
    ]
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];