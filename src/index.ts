import { factory } from '@factory'
import { hc } from 'hono/client'

import { helloWorldHandler } from './helloWorld/helloWorld.handler'
import { appResponseMiddleware } from './middleware/appResponse'
import { dbClientMiddleware } from './middleware/dbClient'
import { loggerMiddleware } from './middleware/logger'

declare module 'bun' {
  interface Env {
    DB_CONNECTION_STRING: string
  }
}

const app = factory
  .createApp()
  .use(loggerMiddleware)
  .use(dbClientMiddleware)
  .use(appResponseMiddleware)
  .get('/', ...helloWorldHandler)

export default app

export type AppType = typeof app

const client = hc<AppType>('http://localhost:3000/')
client.index.$get({ query: { name: 'error', age: '30' } }).then(async (res) => {
  if (res.ok) {
    // eslint-disable-next-line no-console
    res.json().then((x) => console.log(x))
  } else {
    // eslint-disable-next-line no-console
    res.json().then((x) => console.error(x))
  }
})
