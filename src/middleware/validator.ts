import { factory } from '@factory'
import { zValidator } from '@hono/zod-validator'
import { Left } from 'purify-ts'
import { Schema } from 'zod'

export const queryValidator = <T>(schema: Schema<T>) =>
  factory.createMiddleware(
    zValidator('query', schema, (result, c) => {
      if (!result.success) {
        const error = Left({ type: 'ValidationError' as const, message: 'Failed to validate', input: result.data })
        return c.var.appResponse(error)
      }
      c.var.logger('info', 'valid query')(result.data)
    })
  )
