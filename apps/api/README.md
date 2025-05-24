# @stack/api

<div align="center">

A modern API backend built with **TypeScript**, **Hono**, and **PostgreSQL**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-4-blue)](https://hono.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-0.33-green)](https://orm.drizzle.team/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.1-green)](https://github.com/your-org/better-auth)

</div>

## 📚 Overview

This project uses [Hono](https://hono.dev/) for the API framework, [Drizzle](https://orm.drizzle.team/) for database operations, and [Purify-ts](https://gigobyte.github.io/purify/) for functional programming patterns.

## ✨ Features

- ⚡️ Fast development with Bun runtime
- 🔐 Type-safe API endpoints with Hono
- 📦 PostgreSQL with Drizzle ORM
- 🛡️ Request validation with Zod
- 🚦 Functional error handling with Purify-ts
- 🧪 TypeScript-first codebase
- 🧩 Modular architecture
- 🔒 Built-in authentication with Better Auth

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (>=1.0.0)
- [Docker](https://www.docker.com/) for PostgreSQL
- [Node.js](https://nodejs.org/) (>=18)

### 1. Install Dependencies

```sh
bun install
```

### 2. Launch Local Database

```sh
docker run --name my-postgres -e POSTGRES_PASSWORD=my_password -d -p 5432:5432 postgres
```

### 3. Configure Environment Variables

```sh
cp .env.example .env
```

Required variables:
| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_CONNECTION_STRING` | PostgreSQL connection URL | `postgresql://postgres:my_password@localhost:5432/postgres` |
| `BETTER_AUTH_SECRET` | Secret key for auth | `random_string` |
| `BETTER_AUTH_URL` | Auth service URL | `http://localhost:3000` |
| `TRUSTED_ORIGINS` | Allowed CORS origins | `http://localhost:5173` |

### 4. Migrate Database Schema

```sh
bun db:push
```

## 📦 Project Structure

```
apps/api/
├── src/
│   ├── modules/        # Feature modules (auth, hello-world)
│   ├── middleware/     # Custom middleware
│   ├── types/          # Type definitions
│   ├── lib/            # Utilities
│   └── index.ts        # App entry point
├── drizzle/
│   ├── migrations/    # Database migrations
│   ├── schema/        # Database schema
│   └── utils/         # Schema utilities
└── sst-infra.ts       # Infrastructure config
```

## 🛠️ Development

### Available Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `bun dev`           | Start development server |
| `bun test`          | Run tests                |
| `bun lint`          | Lint code                |
| `bun db:studio`     | Open Drizzle Studio      |
| `bun db:push`       | Push schema changes      |
| `bun db:pull`       | Pull schema changes      |
| `bun db:generate`   | Generate migrations      |
| `bun auth:generate` | Generate auth schema     |

## Core Concepts

### Code Organization

#### Business Logic

- **Purpose**: Encapsulates core business logic
- **Location**: `src/modules/*/module.ts`
- **Pattern**: Pure functions with explicit dependencies and Either types

Example:

```ts
import { EitherAsync } from 'purify-ts'

export const helloWorld =
  (dependencies: Dependencies) =>
  (input: Input): Output =>
    dependencies.saveName(input.id, input.name).map(() => ({
      message: `Hello ${input.name}, you are ${input.age} years old`
    }))
```

#### Handlers

- **Purpose**: HTTP request handling
- **Location**: `src/modules/*/handler.ts`
- **Pattern**: Request validation, dependency injection and response formatting

Example:

```ts
import { factory } from '@factory'
import { queryValidator } from '@validator'

export const helloWorldHandler = factory.createHandlers(queryValidator(schema), async (c) => {
  const input = c.req.valid('query')
  return c.var.appResponse(await helloWorld(dependencies)(input))
})
```

## Technologies

### Core Libraries

#### Hono Framework

Modern, lightweight API framework:

```ts
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
app.get('/hello', async (c) => {
  return c.json({ message: 'Hello World' })
})
```

#### Drizzle ORM

Type-safe database operations:

```ts
import { db } from '@/lib/db'
import { users } from '@/db/schema'

const user = await db.query.users.findFirst({
  where: eq(users.id, userId)
})
```

### Better Auth

Better Auth is our authentication solution that provides secure, session-based authentication with the following features:

- 🔒 HTTP-only cookie session management
- 🔑 Secure password hashing with Argon2
- 🚫 CSRF protection
- 📨 Email verification
- 🔄 Refresh token rotation
- 🌐 Multi-tenant support

Example usage:

```ts
import { auth } from '@/lib/auth'

// Login endpoint
app.post('/login', async (c) => {
  const session = await auth.createSession({
    email,
    password,
    tenant: 'default'
  })

  return c.json(
    {
      user: session.user
    },
    {
      cookies: session.cookies
    }
  )
})

// Protected route
app.use('/api/*', auth.middleware())
```

#### Purify-ts

Functional error handling:

```ts
import { Either } from 'purify-ts'

const result = await Either.try(async () => {
  // Your code here
})
```

## 📝 ESLint Configuration

For production applications, enable type-aware lint rules:

```js
// eslint.config.js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
})
```
