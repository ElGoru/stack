import { cors } from 'hono/cors'

import { factory } from '#factory'

export const corsMiddleware = factory.createMiddleware(async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: (origin) =>
      process.env.ENVIRONMENT === 'development' ? origin : process.env.CORS_ORIGINS.split(',').find((o) => o === origin)
  })
  return corsMiddlewareHandler(c, next)
})
