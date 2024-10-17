import { randomUUID } from 'node:crypto'

import { factory } from '@factory'
import { hc } from 'hono/client'

import { helloWorldHandler } from './hello-world/hello-world.handler'
import { appResponseMiddleware } from './middleware/app-response'
import { databaseClientMiddleware } from './middleware/database-client'
import { loggerMiddleware } from './middleware/logger'

declare module 'bun' {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  interface Env {
    DATABASE_CONNECTION_STRING: string
  }
}

const app = factory
  .createApp()
  .use(loggerMiddleware)
  .use(databaseClientMiddleware)
  .use(appResponseMiddleware)
  .get('/', ...helloWorldHandler)

export default app

export type AppType = typeof app

const client = hc<AppType>('http://localhost:3000/')
// eslint-disable-next-line unicorn/prefer-top-level-await
client.index.$get({ query: { id: randomUUID(), name: 'error', age: '30' } }).then(async (response) => {
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
