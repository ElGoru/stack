import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const helloWorld = pgTable('helloWorld', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 })
})
