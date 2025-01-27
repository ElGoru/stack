import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { timestamps } from '../utils/columns'

export const helloWorld = pgTable('helloWorld', {
  id: uuid('id').primaryKey(),
  name: varchar('name').notNull(),
  ...timestamps
})
