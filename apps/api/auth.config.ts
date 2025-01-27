import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const getAuth = (database: Parameters<typeof drizzleAdapter>['0']): ReturnType<typeof betterAuth> =>
  betterAuth({
    database: drizzleAdapter(database, {
      provider: 'pg'
    }),
    emailAndPassword: {
      enabled: true
    },
    trustedOrigins: process.env.TRUSTED_ORIGINS.split(',')
  })
