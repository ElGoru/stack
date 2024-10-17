import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './drizzle/schema',
  dialect: 'postgresql',
  out: './drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING
  }
})
