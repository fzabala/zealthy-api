import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules/',
      'build//',
      '**/.env/',
      '**/.env.development/',
      '**/.env.production/',
      '**/*.log/',
      '**/.eslintcache/',
      '**/coverage/',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:prettier/recommended',
      'plugin:import/recommended',
      'eslint:recommended'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        NodeJS: true,
      },

      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

          // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

          // use <root>/path/to/folder/tsconfig.json
          project: '.',
        },
      },
    },

    rules: {
      'no-unused-expressions': 'error',
      'import/no-default-export': 'error',
      'no-useless-rename': 'error',
    },
  },
  ...compat.extends('plugin:@typescript-eslint/recommended').map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'no-unused-expressions': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  ...compat
    .extends('plugin:jest/recommended', 'plugin:jest/style')
    .map((config) => ({
      ...config,
      files: ['**/testing/**', '**/*.test.ts', '**/*.test.tsx'],
    })),
  {
    files: ['**/testing/**', '**/*.test.ts', '**/*.test.tsx'],

    plugins: {
      jest,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    rules: {
      'jest/no-alias-methods': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'no-undef': 'off',
      'testing-library/prefer-user-event': 'off',
    },
  },
];
