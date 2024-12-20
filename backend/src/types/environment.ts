import { z } from 'zod'

export const environmentSchema = z.object({
  DATABASE_CONNECTION_STRING: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  BETTER_AUTH_TRUSTED_ORIGINS: z.string(),
  CORS_ORIGINS: z.string(),
  ENVIRONMENT: z.string()
})

declare module 'bun' {
  // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/no-empty-object-type
  interface Env extends z.infer<typeof environmentSchema> {}
}
