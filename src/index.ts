import { Hono } from 'hono'

import { helloWorldHandler } from './helloWorld/helloWorld'

const app = new Hono()

app.get('/', ...helloWorldHandler)

export default app
