// eslint.config.mjs
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      prettier: prettierPlugin,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
