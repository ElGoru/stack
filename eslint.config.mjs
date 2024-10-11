// @ts-check
// TODO: make file .ts
import eslint from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.strict, {
  plugins: {
    'simple-import-sort': simpleImportSort
  },
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-shadow': ['error', { builtinGlobals: true }],
    'no-duplicate-imports': 'error',
    'no-console': 'warn',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ]
  }
})
