module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  extends: ['prettier', 'plugin:jest/recommended', 'plugin:import/recommended'],
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'unused-imports', 'import'],
  env: {
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
        },
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              arguments: false,
              attributes: false,
            },
          },
        ],
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        endOfLine: 'auto',
        semi: true,
        arrowParens: 'always',
        bracketSpacing: true,
        tabWidth: 2,
      },
    ],
    'import/no-unresolved': [
      0,
      {
        commonjs: true,
        amd: true,
      },
    ],
    'import/no-cycle': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'import/first': 'error',
    'import/named': 'off',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'no-console': 'error',
    'no-unused-expressions': [
      1,
      {
        allowTernary: true,
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
