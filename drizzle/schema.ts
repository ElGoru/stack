import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const person = pgTable('person', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 })
})
