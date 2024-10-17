import { factory } from '@factory'

export const authHandler = factory.createHandlers(async (c) => c.var.auth.handler(c.req.raw))
