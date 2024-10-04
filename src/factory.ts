import { AppError } from '@appResponse'
import { TypedResponse } from 'hono'
import { createFactory } from 'hono/factory'
import { ClientErrorStatusCode, ServerErrorStatusCode, SuccessStatusCode } from 'hono/utils/http-status'
import { JSONObject } from 'hono/utils/types'
import { Either } from 'purify-ts'

import { DrizzleClient } from './dbClient'

type CustomEnv = {
  Variables: {
    dbClient: DrizzleClient
    appResponse: <T>(
      input: Either<AppError, T>
    ) =>
      | TypedResponse<T, SuccessStatusCode, 'json'>
      | TypedResponse<JSONObject, ClientErrorStatusCode | ServerErrorStatusCode, 'json'>
  }
}

export const factory = createFactory<CustomEnv>()
