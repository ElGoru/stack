type Dependencies = {
  logger: {
    info: (message: string) => void
  }
}

type Input = {
  name: string
  age: number
}

export const helloWorld = (dependencies: Dependencies) => (input: Input) => {
  dependencies.logger.info('Hello World')
  return input
}
