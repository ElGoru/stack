import { AppResponse } from '@appResponse'
import { TypedResponse } from 'hono'
import { createFactory } from 'hono/factory'
import { ClientErrorStatusCode, ServerErrorStatusCode, SuccessStatusCode } from 'hono/utils/http-status'
import { JSONObject } from 'hono/utils/types'

type CustomEnv = {
  Variables: {
    appResponse: <T>(
      input: AppResponse<T>
    ) =>
      | TypedResponse<T, SuccessStatusCode, 'json'>
      | TypedResponse<JSONObject, ClientErrorStatusCode | ServerErrorStatusCode, 'json'>
  }
}

export const factory = createFactory<CustomEnv>()
