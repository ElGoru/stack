import { factory } from '@factory'
import { cors } from 'hono/cors'

export const corsMiddleware = factory.createMiddleware(async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: process.env.TRUSTED_ORIGINS.split(','),
    credentials: true
  })
  return corsMiddlewareHandler(c, next)
})
