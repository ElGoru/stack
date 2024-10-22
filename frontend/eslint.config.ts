import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

import baseConfig from '../eslint.config'

export default tseslint.config(...baseConfig, {
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'functional/no-return-void': 'off',
    'unicorn/filename-case': 'off'
  }
})
