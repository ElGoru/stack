import { MockDependencies, MockInput } from '@testHelpers'
import { describe, expect, mock, test } from 'bun:test'
import { EitherAsync, Left, Right } from 'purify-ts'

import { helloWorld } from './helloWorld'

const mockDependencies: MockDependencies<typeof helloWorld> = (overrides) => ({
  saveName: mock((_: string) => EitherAsync.liftEither(Right(undefined))),
  ...overrides
})

const mockInput: MockInput<typeof helloWorld> = (overrides) => ({
  name: 'Alice',
  age: 42,
  ...overrides
})

describe('helloWorld', () => {
  test('logs the name and age', async () => {
    const dependencies = mockDependencies()
    const input = mockInput()

    await helloWorld(dependencies)(input)

    expect(dependencies.saveName).toHaveBeenCalledWith('Alice')
  })

  test('return dependency error', async () => {
    const error = { type: 'DependencyError' as const, message: 'logger error', dependency: 'logger', input: 'Alice' }
    const dependencies = mockDependencies({
      saveName: mock((_) => EitherAsync.liftEither(Left(error)))
    })
    const input = mockInput()

    const res = await helloWorld(dependencies)(input)

    expect(dependencies.saveName).toHaveBeenCalledWith('Alice')
    expect(res.extract()).toEqual(error)
  })
})
