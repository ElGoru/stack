import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LoginForm } from '@/components/login-form'
import { client } from '@/lib/auth-client'

const useSession = client.useSession

const Auth = () => {
  const { data: session, isPending, error } = useSession()
  if (isPending) {
    return <div>Loading...</div>
  }
  if (error || session === null || new Date(session.session.expiresAt).getTime() < Date.now()) {
    return (
      <div className="p-5">
        <LoginForm onSubmit={client.signIn.email} />
      </div>
    )
  }

  return <Outlet />
}

export const Route = createFileRoute('/_auth')({
  component: Auth
})
