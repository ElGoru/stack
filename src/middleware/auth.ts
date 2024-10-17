import { factory } from '@factory'

import { getAuth } from '../auth-config'

export const authMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('auth', getAuth(c.var.databaseClient))
  await next()
})
