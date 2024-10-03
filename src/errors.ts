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

const errorSwitch =
  (jsonBuilder: (value: JSONValue, statusCode: StatusCode) => TypedResponse<JSONValue, StatusCode, 'json'>) =>
  (error: AppError): TypedResponse<JSONValue, StatusCode, 'json'> => {
    switch (error.type) {
      case 'dependencyError':
        return jsonBuilder({ message: error.message }, 500)
      case 'validationError':
        return jsonBuilder({ message: error.message }, 400)
      default:
        return jsonBuilder({ message: 'Unknown error' }, 500)
    }
  }

export const errorMapMiddleware = factory.createMiddleware(async (c, next) => {
  c.set(
    'appResponse',
    <T extends JSONValue>(input: Either<AppError, T>): TypedResponse<T, StatusCode, 'json'> =>
      input
        .map(c.json as (data: T) => TypedResponse<T, StatusCode, 'json'>)
        .mapLeft(errorSwitch(c.json) as (error: AppError) => TypedResponse<T, StatusCode, 'json'>)
        .extract()
  )
  await next()
})
