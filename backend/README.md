# Parking

## Installation

Follow these steps to set up the project locally:

1. **Install Dependencies:**

   To install the necessary dependencies, run:

   ```sh
   bun install
   ```

2. **Launch Local Database:**

   Start a PostgreSQL database using Docker:

   Lunch local db

   ```sh
   docker run --name my-postgres -e POSTGRES_PASSWORD=my_password -d -p 5432:5432 postgres
   ```

3. **Configure Environment Variables:**

   Create a .env file in the root directory with the following content:
   Example `.env` file:

   ```env
   DATABASE_CONNECTION_STRING='postgresql://postgres:my_password@localhost:5432/postgres'
   ```

4. **Migrate Database Schema:**

   Apply the database migrations with:
   Migrate schema

   ```sh
   bun db:push
   ```

## Usage

- To start the application in development mode, execute:

  ```sh
  bun dev
  ```

## Database Management

- To open Drizzle Studio:

  ```sh
  bun db:studio
  ```

- To push schema changes to the database:

  ```sh
  bun db:push
  ```

- To pull schema changes from the database:

  ```sh
  bun db:pull
  ```

- To generate TypeScript types from the database schema:

  ```sh
  bun db:generate
  ```

## Core Concepts:

Effective software development relies on a well-organized codebase that is scalable, maintainable, and easy to test. A key principle in achieving this is the separation of concerns. By clearly distinguishing between core business logic, HTTP handling, and response management, we create a modular architecture that simplifies development and testing. This document outlines these core concepts and their roles in promoting consistency and clarity across the application.

### Code

- **Purpose**: Encapsulates the core business logic.
- **Functionality**: Takes dependencies and input, processes the input using the dependencies, and returns a result.
- **Example**: In `hello-world.ts`, the `helloWorld` function logs a message and returns a greeting message.

### Handler

- **Purpose**: Acts as a bridge between the HTTP request and the core business logic.
- **Functionality**: Validates the incoming request, prepares dependencies, invokes the core logic, and handles the response.
- **Example**: In `hello-world.handler.ts`, the `helloWorldHandler` validates the query parameters, sets up the logger dependency, and calls the `helloWorld` function.

### appResponse

- **Purpose**: Standardizes the response format and error handling across the application.
- **Functionality**: Provides middleware to handle the response and errors in a consistent manner.
- **Example**: In `app-response.ts`, the `appResponseMiddleware` sets up a method to handle successful responses and different types of errors (e.g., `DependencyError`, `ValidationError`).

## Technologies

This project leverages a variety of modern technologies and libraries to ensure a robust and scalable application. Below is a brief overview of the key technologies used

### TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It helps catch errors early through a type system and makes JavaScript development more efficient.

### Bun

Bun is a fast JavaScript runtime like Node or Deno. It is designed to start fast, and it includes a bundler, transpiler, and package manager. This project uses Bun for running scripts and managing dependencies.

### Hono

Hono is a small, fast, and secure web framework for building web applications and APIs. It is used in this project to handle HTTP requests and responses.

### Zod

Zod is a TypeScript-first schema declaration and validation library. It is used in this project to validate incoming data and ensure it meets the expected format.

### Purify-ts

Purify-ts is a functional programming library for TypeScript. It provides a set of tools for working with functional programming concepts like Either, Chain, and Map. Allowing to handle errors in a better way

### Drizzle ORM

Drizzle ORM is a lightweight TypeScript ORM for SQL databases. It provides a type-safe way to interact with your database and is used in this project for database operations.

### ESLint and Prettier

ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code. Prettier is an opinionated code formatter. Together, they help maintain code quality and consistency.

### PostgreSQL

PostgreSQL is a powerful, open-source object-relational database system. It is used in this project as the primary database for storing application data.
