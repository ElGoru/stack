import type { AppType } from '@stack/api'
import { hc } from 'hono/client'
import { createContext, useContext } from 'react'

type Client = ReturnType<typeof hc<AppType>>

type ApiClientProviderProperties = Readonly<{
  children: React.ReactNode
  client: Client
}>

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ApiClientContext = createContext<Client>(undefined!)

// eslint-disable-next-line react-refresh/only-export-components
export const useApiClient = () => useContext(ApiClientContext)

export const ApiClientProvider = ({ children, client }: ApiClientProviderProperties) => {
  return <ApiClientContext.Provider value={client}>{children}</ApiClientContext.Provider>
}
