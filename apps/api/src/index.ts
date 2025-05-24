import { factory } from '@factory'

import { appResponseMiddleware } from './middleware/app-response'
import { corsMiddleware } from './middleware/cors'
import { environmentValidatorMiddleware } from './middleware/environment-validator'
import { loggerMiddleware } from './middleware/logger'
import { authHandler } from './modules/auth/auth.handler'
import { helloWorldHandler } from './modules/hello-world/hello-world.handler'

const app = factory
  .createApp()
  .use(corsMiddleware)
  .use(loggerMiddleware)
  .use(appResponseMiddleware)
  .use(environmentValidatorMiddleware)
  .get('/api/auth/*', ...authHandler)
  .post('/api/auth/*', ...authHandler)
  .get('/hello-world', ...helloWorldHandler)

export default app

export type AppType = typeof app
