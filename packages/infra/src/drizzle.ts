// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../.sst/platform/config.d.ts" />

export const initDrizzle = (directory: string, rds: Readonly<sst.aws.Postgres>) => {
  const connectionString = $interpolate`postgres://${rds.username}:${rds.password}@${rds.host}:${rds.port}/${rds.database}`

  new sst.x.DevCommand('dbStudio', {
    link: [rds],
    dev: {
      command: `bun drizzle-kit studio`,
      autostart: false,
      directory
    },
    environment: {
      DATABASE_CONNECTION_STRING: connectionString
    }
  })

  new sst.x.DevCommand('dbMigrate', {
    link: [rds],
    dev: {
      command: `bun drizzle-kit migrate`,
      autostart: false,
      directory
    },
    environment: {
      DATABASE_CONNECTION_STRING: connectionString
    }
  })

  return { connectionString }
}
