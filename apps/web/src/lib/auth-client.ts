import { createAuthClient } from 'better-auth/react'

export const client: ReturnType<typeof createAuthClient> = createAuthClient({
  baseURL: import.meta.env.VITE_APP_API_URL // the base url of your auth server
})
