import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const getAuth = (database: Parameters<typeof drizzleAdapter>['0']) =>
  betterAuth({
    database: drizzleAdapter(database, {
      provider: 'pg'
    }),
    emailAndPassword: {
      enabled: true
    }
  })

/**
 * this function is only meant to be used to generate drizzle schema.
 * auth should be accessed via the factory custom environment variable.
 *
 * @internal
 */
export const auth = getAuth(drizzle(postgres('')))
