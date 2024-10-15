/* eslint-disable no-console */
import { factory } from '@factory'

const humanize = (times: string[]) => {
  const [delimiter, separator] = [',', '.']
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + delimiter))
  return orderTimes.join(separator)
}

const time = (start: number) => {
  const delta = Date.now() - start
  return humanize([delta < 1000 ? delta + 'ms' : Math.round(delta / 1000) + 's'])
}

const tryDecodeURI = (str: string): string => {
  try {
    return decodeURI(str)
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decodeURI(match)
      } catch {
        return match
      }
    })
  }
}

const getPath = (request: Request): string => {
  const url = request.url
  const start = url.indexOf('/', 8)
  const path = url
    .slice(start)
    .split('')
    .map((char, i) => {
      const charCode = char.charCodeAt(0)
      if (charCode === 37) {
        const queryIndex = url.indexOf('?', start + i)
        const pat = url.slice(start, queryIndex === -1 ? undefined : queryIndex)
        return tryDecodeURI(pat.includes('%25') ? pat.replace(/%25/g, '%2525') : pat)
      } else if (charCode === 63) {
        return url.slice(start, start + i)
      }
      return ''
    })
    .join('')
  return path || url.slice(start)
}

export const loggerMiddleware = factory.createMiddleware(async (c, next) => {
  const start = Date.now()
  console.log('[REQUEST]', `${c.req.method} ${getPath(c.req.raw)}`)

  // eslint-disable-next-line functional/no-return-void
  c.set('logger', (type, message) => (data) => {
    switch (type) {
      case 'info':
        console.info(`\x1b[34m[INFO] ${message}:\x1b[0m `, JSON.stringify(data))
        break
      case 'error':
        console.error(`\x1b[31m[ERROR] ${message}:\x1b[0m `, JSON.stringify(data))
        break
      case 'success':
        console.log(`\x1b[32m[SUCCESS] ${message}:\x1b[0m `, JSON.stringify(data))
        break
      default:
        console.log(`[LOG] ${message}: `, JSON.stringify(data))
    }
  })
  await next()

  console.log('[RESPONSE]', `${c.res.status} ${time(start)}`)
})
