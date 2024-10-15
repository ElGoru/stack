import { helloWorld as helloWorldTable } from '@dbSchema'
import { factory } from '@factory'
import { queryValidator } from '@validator'
import { EitherAsync } from 'purify-ts'
import { z } from 'zod'

import { helloWorld } from './hello-world'

const schema = z.object({
  name: z.string(),
  age: z.coerce.number()
})

export const helloWorldHandler = factory.createHandlers(queryValidator(schema), async (c) => {
  const input = c.req.valid('query')

  const dependencies = {
    saveName: (name: string) =>
      EitherAsync(() => c.var.databaseClient.insert(helloWorldTable).values({ name }).execute())
        // eslint-disable-next-line unicorn/no-useless-undefined
        .map(() => undefined)
        .mapLeft((error) => ({ type: 'DependencyError' as const, message: `${error}`, dependency: 'db', input }))
  }
  return c.var.appResponse(await helloWorld(dependencies)(input))
})
