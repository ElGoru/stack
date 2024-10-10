export type DependencyError = {
  type: 'DependencyError'
  message: string
  dependency: string
  input: unknown
}

export type ValidationError = {
  type: 'ValidationError'
  message: string
  input: unknown
}
