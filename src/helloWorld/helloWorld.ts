import { zValidator } from '@hono/zod-validator'
import { createFactory } from 'hono/factory'
import { z } from 'zod'

import { helloWorld } from './helloWorld.code'

const factory = createFactory()

const schema = z.object({
  name: z.string(),
  age: z.coerce.number()
})

export const helloWorldHandler = factory.createHandlers(zValidator('query', schema), (c) => {
  return c.json(helloWorld({ logger: console })(c.req.valid('query')))
})
