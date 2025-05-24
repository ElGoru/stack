# Full-Stack TypeScript Monorepo

<div align="center">

A modern full-stack application built with **TypeScript**, **React**, and **Hono**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Hono](https://img.shields.io/badge/Hono-4-blue)](https://hono.dev/)
[![SST](https://img.shields.io/badge/SST-3-green)](https://sst.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)

</div>

## 📚 Overview

This monorepo contains a complete full-stack application with:

- 🌐 Modern web frontend with React, Vite, and TailwindCSS
- 🚀 Fast API backend with Hono and PostgreSQL
- ☁️ Infrastructure as code with SST and AWS
- 🔒 Built-in authentication with Better Auth

## 📦 Project Structure

```
.
├── apps/
│   ├── web/           # React frontend application
│   └── api/           # Hono backend API
├── packages/
│   ├── eslint-config/ # Shared ESLint configuration
│   └── infra/        # Shared infrastructure code
└── sst.config.ts     # SST infrastructure configuration
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (>=1.0.0)
- [Node.js](https://nodejs.org/) (>=18)
- [Docker](https://www.docker.com/) for PostgreSQL
- [AWS CLI](https://aws.amazon.com/cli/) configured

### 1. Install Dependencies

```sh
bun install
```

### 2. Start Local Database

```sh
docker run --name my-postgres -e POSTGRES_PASSWORD=my_password -d -p 5432:5432 postgres
```

### 3. Configure Environment

Copy environment files for both apps:

```sh
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 4. Start Development

```sh
bun dev
```

Visit:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

## 📘 Documentation

- [Web Frontend](apps/web/README.md)
- [API Backend](apps/api/README.md)

## ⚙️ Development

### Available Scripts

| Command    | Description                   |
| ---------- | ----------------------------- |
| `bun dev`  | Start all applications        |
| `bun lint` | Lint all packages             |
| `bun test` | Run tests across all packages |

### Windows Compatibility

- **SST with Bun:**  
  Node.js is required alongside Bun on Windows. Without Node, you may encounter:  
  `[SST] error: [runtime] NotImplementedError: node:v8 setFlagsFromString is not yet implemented in Bun.`

- **Tunnel Installation:**  
  SST tunnel installation is not currently supported on Windows.

### Development Recommendations

- **Local Development:**  
  Prefer local development without SST when possible to avoid unnecessary cloud resource creation.
- **Infrastructure:**  
  Use SST for deployment and production infrastructure management.

## 🏗️ Infrastructure

This project uses [SST](https://sst.dev) for infrastructure as code:

- 🌐 API Gateway and Lambda functions
- 💾 RDS PostgreSQL database
- 🔐 Secrets management
- 📤 Static website hosting

### Deployment

1. Configure AWS credentials
2. Set Up Authentication
   ```sh
   bunx sst secrets set BetterAuthSecret <your-secret-value>
   ```
3. Deploy to dev:
   ```sh
   bunx sst deploy --stage dev
   ```
