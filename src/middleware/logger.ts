/* eslint-disable no-console */
import { factory } from '@factory'

const humanize = (times: string[]) => {
  const [delimiter, separator] = [',', '.']
  const orderTimes = times.map((v) => v.replaceAll(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + delimiter))
  return orderTimes.join(separator)
}

const time = (start: number) => {
  const delta = Date.now() - start
  return humanize([delta < 1000 ? delta + 'ms' : Math.round(delta / 1000) + 's'])
}

export const loggerMiddleware = factory.createMiddleware(async (c, next) => {
  const start = Date.now()
  console.log('[REQUEST]', `${c.req.method} ${URL.parse(c.req.raw.url)?.pathname}`)

  // eslint-disable-next-line functional/no-return-void
  c.set('logger', (type, message) => (data) => {
    switch (type) {
      case 'info': {
        console.info(`\u001B[34m[INFO] ${message}:\u001B[0m`, JSON.stringify(data))
        break
      }
      case 'error': {
        console.error(`\u001B[31m[ERROR] ${message}:\u001B[0m`, JSON.stringify(data))
        break
      }
      case 'success': {
        console.log(`\u001B[32m[SUCCESS] ${message}:\u001B[0m`, JSON.stringify(data))
        break
      }
      default: {
        console.log(`[LOG] ${message}:`, JSON.stringify(data))
      }
    }
  })
  await next()

  console.log('[RESPONSE]', `${c.res.status} ${time(start)}`)
})
