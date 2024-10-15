import * as schema from '@dbSchema'
import { DependencyError, ValidationError } from '@types'
import { ExtractTablesWithRelations } from 'drizzle-orm'
import { PgDatabase } from 'drizzle-orm/pg-core'
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import { TypedResponse } from 'hono'
import { createFactory } from 'hono/factory'
import { ClientErrorStatusCode, ServerErrorStatusCode, SuccessStatusCode } from 'hono/utils/http-status'
import { Either } from 'purify-ts'

// eslint-disable-next-line functional/no-return-void
type Logger = (type: 'log' | 'info' | 'success' | 'error', title: string) => (data: unknown) => void

type DBClient = PgDatabase<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>

type AppResponse = <T>(
  input: Either<DependencyError | ValidationError, T>
) =>
  | TypedResponse<T, SuccessStatusCode, 'json'>
  | TypedResponse<{ [key: string]: unknown }, ClientErrorStatusCode | ServerErrorStatusCode, 'json'>

type CustomEnv = {
  Variables: {
    logger: Logger
    dbClient: DBClient
    appResponse: AppResponse
  }
}

export const factory = createFactory<CustomEnv>()
