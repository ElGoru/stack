// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.strict, {
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-shadow': ['error', { builtinGlobals: true }],
    'sort-imports': 'error',
    'no-duplicate-imports': 'error',
    'no-console': 'warn',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }]
  }
})
