import { factory } from '@factory'
import { TypedResponse } from 'hono'
import { StatusCode } from 'hono/utils/http-status'
import { JSONValue } from 'hono/utils/types'
import { Either } from 'purify-ts'

type DependencyError = {
  type: 'dependencyError'
  message: string
  dependency: string
  input: unknown
}

type ValidationError = {
  type: 'validationError'
  message: string
  input: unknown
}

export type AppError = DependencyError | ValidationError

export const errorMapMiddleware = factory.createMiddleware(async (c, next) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const x = <T extends JSONValue>(input: Either<AppError, T>): TypedResponse<T, StatusCode, 'json'> =>
    input
      .map((value) => c.json(value))
      .mapLeft((error) => {
        switch (error.type) {
          case 'dependencyError':
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return c.json<JSONValue>({ message: error.message }, 500)
          case 'validationError':
            return c.json({ message: error.message }, 400)
          default:
            return c.json({ message: 'Unknown error' }, 500)
        }
      })
      .extract()
  c.set('customResponse', x)
  await next()
})
