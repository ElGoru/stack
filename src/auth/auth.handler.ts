import { database } from '@database'
import { factory } from '@factory'

import { auth } from './auth'

export const authHandler = factory.createHandlers(async (c) => auth(database)(c.req.raw))
