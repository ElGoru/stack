# @stack/web

<div align="center">

A modern web application built with **React**, **TypeScript**, and **Vite**.

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8)](https://tailwindcss.com/)

</div>

## 📚 Overview

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling, [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching, and [@tanstack/react-router](https://tanstack.com/router/latest) for routing. It is designed to work seamlessly with the [`@stack/api`](../api/README.md) backend.

## ✨ Features

- ⚡️ Fast development with [Vite](https://vitejs.dev/)
- ⚛️ React 18 with strict mode
- 🎨 Utility-first styling with Tailwind CSS
- 🔄 Data fetching and caching with React Query
- 🧭 Type-safe routing with TanStack Router
- 🧪 TypeScript-first codebase
- 🧩 Modular component structure
- 🌗 Theme support via context provider

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (>=1.0.0)
- [Node.js](https://nodejs.org/) (>=18)

### 1. Install dependencies

```sh
bun install
```

### 2. Configure environment variables

```sh
cp .env.example .env
```

Required variables:
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_API_URL` | API backend URL | `http://localhost:3000` |

### 3. Start the development server

```sh
bun dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app.

## 📦 Project Structure

```
apps/web/
├── src/
│   ├── components/      # Reusable React components
│   ├── routes/          # File-based routing
│   ├── lib/            # Utilities and configurations
│   ├── main.tsx        # App entry point
│   └── main.css        # Global styles
├── public/             # Static assets
└── index.html         # HTML template
```

## 🛠️ Development

### Available Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `bun dev`     | Start development server |
| `bun build`   | Build for production     |
| `bun preview` | Preview production build |
| `bun lint`    | Run ESLint               |
| `bun test`    | Run tests                |

### Core Technologies

#### Routing with TanStack Router

[@tanstack/react-router](https://tanstack.com/router/latest) provides type-safe, file-based routing:

- 🔍 Type-safe route params and search params
- 📁 File-based routing structure
- 🔄 Data loading with route loaders

#### Data Fetching with Hono RPC

[Hono RPC](https://honojs.dev/recipes/rpc/) enables type-safe backend communication:

```ts
import { useQuery } from '@tanstack/react-query'
import { rpc } from '@/lib/rpc'

const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => rpc.user.getUser({ id: userId })
})
```

#### Authentication with Better Auth

[Better Auth](https://github.com/your-org/better-auth) provides secure session management:

```ts
import { useAuth } from '@/lib/auth'

const { user, login, logout } = useAuth()
```

Features:

- 🔐 Secure HTTP-only cookie sessions
- 🎣 React hooks for auth state
- 🛡️ Route protection

## 🎨 Styling

- Built with [Tailwind CSS](https://tailwindcss.com/)
- Uses [shadcn/ui](https://ui.shadcn.com/) components
- Theme configuration in [`main.css`](src/main.css)

## 📝 ESLint Configuration

For production applications, enable type-aware lint rules:

```js
// eslint.config.js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
})
```
