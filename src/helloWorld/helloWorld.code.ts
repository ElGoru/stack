import { Either } from 'purify-ts'

import { AppError } from '../errors'

type Dependencies = {
  logger: (message: string) => Either<AppError, void>
}

type Input = {
  name: string
  age: number
}

type Output = Either<AppError, { message: string }>

export const helloWorld =
  (dependencies: Dependencies) =>
  (input: Input): Output =>
    dependencies.logger(input.name).map(() => ({
      message: `Hello ${input.name}, you are ${input.age} years old`
    }))
