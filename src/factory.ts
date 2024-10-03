import { TypedResponse } from 'hono'
import { createFactory } from 'hono/factory'
import { StatusCode } from 'hono/utils/http-status'
import { JSONValue } from 'hono/utils/types'
import { Either } from 'purify-ts'

import { AppError } from './errors'

type CustomEnv = {
  Variables: {
    appResponse: <T extends JSONValue>(input: Either<AppError, T>) => TypedResponse<T, StatusCode, 'json'>
  }
}

export const factory = createFactory<CustomEnv>()
