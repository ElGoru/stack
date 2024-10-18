/* eslint-disable unicorn/prevent-abbreviations */
declare module 'bun' {
  interface Env {
    DATABASE_CONNECTION_STRING: string
    BETTER_AUTH_SECRET: string
    BETTER_AUTH_URL: string
    BETTER_AUTH_TRUSTED_ORIGINS: string
  }
}
