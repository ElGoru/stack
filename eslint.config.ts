import baseConfig from '@stack/eslint-config'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [...baseConfig]
})
