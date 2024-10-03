import { factory } from '@factory'
import { queryValidator } from '@validator'
import { Left, Right } from 'purify-ts'
import { z } from 'zod'

import { helloWorld } from './helloWorld.code'

const schema = z.object({
  name: z.string(),
  age: z.coerce.number()
})

const dependencies = {
  logger: (message: string) =>
    message === 'error'
      ? Left({
          type: 'dependencyError' as const,
          message: 'Failed to log',
          dependency: 'logger',
          input: null
        })
      : Right(undefined)
}

export const helloWorldHandler = factory.createHandlers(queryValidator(schema), (c) =>
  c.var.appResponse(helloWorld(dependencies)(c.req.valid('query')))
)
