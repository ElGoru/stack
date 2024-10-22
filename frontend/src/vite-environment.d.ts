/// <reference types="vite/client" />

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
}

// eslint-disable-next-line no-shadow
interface ImportMeta {
  readonly env: ImportMetaEnv
}
