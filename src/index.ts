import { randomUUID } from 'node:crypto'

import { factory } from '@factory'
import { hc } from 'hono/client'

import { authHandler } from './auth/auth.handler'
import { helloWorldHandler } from './hello-world/hello-world.handler'
import { appResponseMiddleware } from './middleware/app-response'
import { loggerMiddleware } from './middleware/logger'

const app = factory
  .createApp()
  .use(loggerMiddleware)
  .use(appResponseMiddleware)
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
