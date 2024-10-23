import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppType } from '../../backend/src/index'
import { routeTree } from './routeTree.gen'
import { ApiClientContext } from './useApiClient'

// Create a new router instance
const router = createRouter({ routeTree })
const queryClient = new QueryClient()
const apiClient = hc<AppType>(import.meta.env.VITE_APP_API_URL)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={apiClient}>
        <RouterProvider router={router} />
      </ApiClientContext.Provider>
    </QueryClientProvider>
  </StrictMode>
)

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
