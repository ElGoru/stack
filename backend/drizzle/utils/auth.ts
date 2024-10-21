import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { getAuth } from '../../auth.config'

/**
 * this function is only meant to be used to generate drizzle schema.
 *
 * @internal
 */
export const auth = getAuth(drizzle(postgres('')))
