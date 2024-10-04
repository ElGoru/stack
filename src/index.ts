import { factory } from '@factory'
import { hc } from 'hono/client'

import { appResponseMiddleware } from './appResponse'
import { helloWorldHandler } from './helloWorld/helloWorld'

const app = factory
  .createApp()
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
