import './index.css'

import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { v4 } from 'uuid'

import viteLogo from '/vite.svg'

import reactLogo from '../assets/react.svg'
import { useApiClient } from '../useApiClient'

const Index = () => {
  const [count, setCount] = useState(0)

  const client = useApiClient()
  const mutation = useMutation({
    mutationFn: (data: Readonly<{ id: string; name: string; age: string }>) =>
      client['hello-world'].$get({ query: data }).then(async (response) => {
        if (response.ok) {
          return await response.json()
        } else {
          throw new Error('Failed to fetch')
        }
      })
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <button onClick={() => mutation.mutate({ id: v4(), name: 'name', age: '27' })}>
          Hono RPC: {mutation.isSuccess ? mutation.data.message : 'Click me'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div />
    </>
  )
}

export const Route = createLazyFileRoute('/')({
  component: Index
})
