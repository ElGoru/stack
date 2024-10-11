import { factory } from '@factory'

export const appResponseMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('appResponse', (input) =>
    input
      .ifRight(c.var.logger('success', 'appResponse'))
      //TODO: remove 'as object'
      .map((data) => c.json(data as object, 200))
      .ifLeft(c.var.logger('error', 'appError'))
      .mapLeft((error) => {
        switch (error.type) {
          case 'DependencyError':
            return c.json({ message: error.message }, 500)
          case 'ValidationError':
            return c.json({ message: error.message }, 400)
          default:
            return c.json({ message: 'Unknown error' }, 500)
        }
      })
      .extract()
  )
  await next()
})
