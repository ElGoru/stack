import { factory } from '@factory'
import { zValidator } from '@hono/zod-validator'
import { Left } from 'purify-ts'
import { Schema } from 'zod'

export const queryValidator = <T>(schema: Schema<T>) =>
  factory.createMiddleware(
    zValidator('query', schema, (result, c) => {
      if (!result.success) {
        return c.var.appResponse(Left({ type: 'validationError', message: 'Failed to validate', input: result.data }))
      }
    })
  )
