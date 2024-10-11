import { DependencyError } from '@types'
import { EitherAsync } from 'purify-ts'

type Dependencies = {
  saveName: (name: string) => EitherAsync<DependencyError, void>
}

type Input = {
  name: string
  age: number
}

type Output = EitherAsync<DependencyError, { message: string }>

export const helloWorld =
  (dependencies: Dependencies) =>
  (input: Input): Output =>
    dependencies.saveName(input.name).map(() => ({
      message: `Hello ${input.name}, you are ${input.age} years old`
    }))
