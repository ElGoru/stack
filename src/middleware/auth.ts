import { factory } from '@factory'

import { getAuth } from '../../auth.config'

export const authMiddleware = factory.createMiddleware(async (c, next) => {
  const auth = getAuth(c.var.databaseClient)
  c.set('authApi', auth.api)
  c.set('authHandler', auth.handler)
  await next()
})
