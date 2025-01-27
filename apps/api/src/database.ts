import * as schema from '@dbSchema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const database = drizzle(postgres(process.env.DATABASE_CONNECTION_STRING), { schema })
