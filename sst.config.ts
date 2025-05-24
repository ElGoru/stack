// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'stack',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws'
    }
  },
  async run() {
    const { createApi } = await import('./apps/api/sst-infra')
    const { createSite } = await import('./apps/web/sst-infra')
    const domain = 'placeholder.com'
    const siteDomain = $dev === true ? 'http://localhost:5173' : `www.${domain}`
    const apiDomain = $dev === true ? 'http://localhost:3000' : `api.${domain}`
    const api = createApi({ domain: apiDomain, trustedOrigins: [siteDomain] })
    const site = createSite({ domain: siteDomain, api })

    return { siteUrl: site.url, apiUrl: api.url }
  }
})
