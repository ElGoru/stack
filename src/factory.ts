import { DependencyError, ValidationError } from '@types'
import { TypedResponse } from 'hono'
import { createFactory } from 'hono/factory'
import { ClientErrorStatusCode, ServerErrorStatusCode, SuccessStatusCode } from 'hono/utils/http-status'
import { Either } from 'purify-ts'

// eslint-disable-next-line functional/no-return-void
type Logger = (type: 'log' | 'info' | 'success' | 'error', title: string) => (data: unknown) => void

type AppResponse = <T>(
  input: Either<DependencyError | ValidationError, T>
) =>
  | TypedResponse<T, SuccessStatusCode, 'json'>
  | TypedResponse<{ [key: string]: unknown }, ClientErrorStatusCode | ServerErrorStatusCode, 'json'>

type CustomEnvironment = {
  Variables: {
    logger: Logger
    appResponse: AppResponse
  }
}

export const factory = createFactory<CustomEnvironment>()
