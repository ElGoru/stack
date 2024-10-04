import * as schema from '@dbSchema'
import { factory } from '@factory'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const sql = postgres(Bun.env.DB_CONNECTION_STRING)
const db = drizzle(sql, { schema })

export type DrizzleClient = typeof db

export const dbClientMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('dbClient', db)
  await next()
})
