// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../.sst/platform/config.d.ts" />

const directory = './apps/web'

export const createSite = ({
  domain,
  api
}: Readonly<{ domain: string; api: ReturnType<sst.aws.Cluster['addService']> }>) => {
  const site = new sst.aws.StaticSite('Web', {
    domain,
    path: directory,
    build: {
      command: 'bun build',
      output: 'dist'
    },
    environment: {
      VITE_APP_API_URL: api.url
    },
    dev: {
      url: 'http://localhost:5173'
    }
  })

  return site
}
