import { Left } from 'purify-ts'

import { factory } from '#factory'

import { environmentSchema } from '../types/environment'

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
