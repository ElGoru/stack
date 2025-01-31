// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../.sst/platform/config.d.ts" />

import { initDrizzle } from '@stack/infra'

const directory = './apps/api'

export const createApi = ({ domain, trustedOrigins }: Readonly<{ domain: string; trustedOrigins: string[] }>) => {
  const vpc = new sst.aws.Vpc('MyVpc', { bastion: true })
  const rds = new sst.aws.Postgres('MyPostgres', {
    vpc,
    proxy: true,
    dev: {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'my_password',
      database: 'postgres'
    }
  })
  const { connectionString } = initDrizzle(directory, rds)

  const secret = new sst.Secret('MySecret')
  const cluster = new sst.aws.Cluster('MyCluster', { vpc })
  const service = cluster.addService('Api', {
    public: { domain },
    loadBalancer: {
      ports: [{ listen: '80/http', forward: '3000/http' }]
    },
    link: [rds],
    dev: {
      directory,
      command: 'bun dev',
      url: 'http://localhost:3000'
    },
    environment: {
      DATABASE_CONNECTION_STRING: connectionString,
      BETTER_AUTH_SECRET: secret.value,
      BETTER_AUTH_URL: domain,
      TRUSTED_ORIGINS: trustedOrigins.join(',')
    }
  })

  return service
}
