import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { hc } from 'hono/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppType } from '../../backend/src/index'
import App from './App'
import { ApiClientContext } from './useApiClient'

const queryClient = new QueryClient()
const apiClient = hc<AppType>(import.meta.env.VITE_APP_API_URL)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={apiClient}>
        <App />
      </ApiClientContext.Provider>
    </QueryClientProvider>
  </StrictMode>
)
