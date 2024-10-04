import { factory } from '@factory'
import { TypedResponse } from 'hono'
import { SuccessStatusCode } from 'hono/utils/http-status'
import { Either } from 'purify-ts'

export type DependencyError = {
  type: 'dependencyError'
  message: string
  dependency: string
  input: unknown
}

export type ValidationError = {
  type: 'validationError'
  message: string
  input: unknown
}

type AppError = DependencyError | ValidationError

export type AppResponse<T> = Either<AppError, T>

export const appResponseMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('appResponse', <T>(input: AppResponse<T>) =>
    input
      .map(c.json as (data: T) => TypedResponse<T, SuccessStatusCode, 'json'>)
      .mapLeft((error) => {
        switch (error.type) {
          case 'dependencyError':
            return c.json({ message: error.message }, 500)
          case 'validationError':
            return c.json({ message: error.message }, 400)
          default:
            return c.json({ message: 'Unknown error' }, 500)
        }
      })
      .extract()
  )
  await next()
})
