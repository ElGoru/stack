import { factory } from '@factory'
import { TypedResponse } from 'hono'
import { SuccessStatusCode } from 'hono/utils/http-status'
import { Either } from 'purify-ts'

export type DependencyError = {
  type: 'DependencyError'
  message: string
  dependency: string
  input: unknown
}

export type ValidationError = {
  type: 'ValidationError'
  message: string
  input: unknown
}

export type AppError = DependencyError | ValidationError

export const appResponseMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('appResponse', <T>(input: Either<AppError, T>) =>
    input
      .map(c.json as (data: T) => TypedResponse<T, SuccessStatusCode, 'json'>)
      .mapLeft((error) => {
        switch (error.type) {
          case 'DependencyError':
            return c.json({ message: error.message }, 500)
          case 'ValidationError':
            return c.json({ message: error.message }, 400)
          default:
            return c.json({ message: 'Unknown error' }, 500)
        }
      })
      .extract()
  )
  await next()
})