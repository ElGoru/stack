import { factory } from '@factory'

export const authHandler = factory.createHandlers(async (c) => c.var.authHandler(c.req.raw))
