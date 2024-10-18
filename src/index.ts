import { randomUUID } from 'node:crypto'

import { factory } from '@factory'
import { hc } from 'hono/client'

import { authHandler } from './auth/auth.handler'
import { helloWorldHandler } from './hello-world/hello-world.handler'
import { appResponseMiddleware } from './middleware/app-response'
import { authMiddleware } from './middleware/auth'
import { databaseClientMiddleware } from './middleware/database-client'
import { loggerMiddleware } from './middleware/logger'

declare module 'bun' {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  interface Env {
    DATABASE_CONNECTION_STRING: string
    BETTER_AUTH_SECRET: string
    BETTER_AUTH_URL: string
    BETTER_AUTH_TRUSTED_ORIGINS: string
  }
}

const app = factory
  .createApp()
  .use(loggerMiddleware)
  .use(databaseClientMiddleware)
  .use(appResponseMiddleware)
  .use(authMiddleware)
  .get('/api/auth/*', ...authHandler)
  .post('/api/auth/*', ...authHandler)
  .get('/hello-world', ...helloWorldHandler)

export default app

export type AppType = typeof app

const client = hc<AppType>('http://localhost:3000/')
// eslint-disable-next-line unicorn/prefer-top-level-await
client['hello-world'].$get({ query: { id: randomUUID(), name: 'error', age: '30' } }).then(async (response) => {
  if (response.ok) {
    const json = await response.json()
    // eslint-disable-next-line no-console
    console.log(json)
  } else {
    const json = await response.json()
    // eslint-disable-next-line no-console
    console.error(json)
  }
})
