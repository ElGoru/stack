import { person } from '@dbSchema'
import { factory } from '@factory'
import { queryValidator } from '@validator'
import { EitherAsync } from 'purify-ts'
import { z } from 'zod'

import { helloWorld } from './helloWorld.code'

const schema = z.object({
  name: z.string(),
  age: z.coerce.number()
})

export const helloWorldHandler = factory.createHandlers(queryValidator(schema), async (c) => {
  const input = c.req.valid('query')

  const dependencies = {
    logger: (message: string) =>
      EitherAsync(() => c.var.dbClient.insert(person).values({ name: message }).execute())
        .map(() => undefined)
        .mapLeft((error) => ({ type: 'dependencyError' as const, message: `${error}`, dependency: 'db', input }))
  }
  return c.var.appResponse(await helloWorld(dependencies)(input))
})
