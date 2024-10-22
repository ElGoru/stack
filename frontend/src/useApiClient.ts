import { hc } from 'hono/client'
import { createContext, useContext } from 'react'

import type { AppType } from '../../backend/src/index'

type Client = ReturnType<typeof hc<AppType>>

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ApiClientContext = createContext<Client>(undefined!)

export const useApiClient = () => useContext(ApiClientContext)
