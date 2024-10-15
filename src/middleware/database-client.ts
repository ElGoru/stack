import * as schema from '@dbSchema'
import { factory } from '@factory'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_CONNECTION_STRING)
const database = drizzle(sql, { schema })

export const databaseClientMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('databaseClient', database)
  await next()
})
