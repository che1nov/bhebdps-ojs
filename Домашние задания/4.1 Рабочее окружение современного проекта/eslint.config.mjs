import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'eslint.config.mjs',
    ],
  },
  js.configs.recommended,
  ...compat.extends('airbnb-base'),
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['src/js/__tests__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['webpack.config.js'],
    rules: {
      'import/no-commonjs': 'off',
      'global-require': 'off',
    },
  },
];
