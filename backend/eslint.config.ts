import tseslint from 'typescript-eslint'

import baseConfig from '../settings/eslint.config'

export default tseslint.config(...baseConfig, {})
