import { DependencyError } from '@appResponse'
import { EitherAsync } from 'purify-ts'

type Dependencies = {
  logger: (message: string) => EitherAsync<DependencyError, void>
}

type Input = {
  name: string
  age: number
}

type Output = EitherAsync<DependencyError, { message: string }>

export const helloWorld = (dependencies: Dependencies) => (input: Input) =>
  dependencies.logger(input.name).map(() => ({
    message: `Hello ${input.name}, you are ${input.age} years old`
  })) satisfies Output
