import { factory } from '@factory'
import { Left } from 'purify-ts'

import { environmentSchema } from '../environment'

export const environmentValidatorMiddleware = factory.createMiddleware(async (c, next) => {
  const runtimeEnvironment = environmentSchema.safeParse(process.env)
  if (!runtimeEnvironment.success) {
    return c.var.appResponse(
      Left({
        type: 'InternalError' as const,
        message: 'Invalid environment variables',
        error: runtimeEnvironment.error
      })
    )
  }

  await next()
})
