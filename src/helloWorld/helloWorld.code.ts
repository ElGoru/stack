import { AppResponse, DependencyError } from '@appResponse'
import { Either } from 'purify-ts'

type Dependencies = {
  logger: (message: string) => Either<DependencyError, void>
}

type Input = {
  name: string
  age: number
}

type Output = AppResponse<{ message: string }>

export const helloWorld = (dependencies: Dependencies) => (input: Input) =>
  dependencies.logger(input.name).map(() => ({
    message: `Hello ${input.name}, you are ${input.age} years old`
  })) satisfies Output
