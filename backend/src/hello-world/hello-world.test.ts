/* eslint-disable functional/no-return-void */
import { MockDependencies, MockInput } from '@testHelpers'
import { describe, expect, mock, test } from 'bun:test'
import { EitherAsync, Left, Right } from 'purify-ts'

import { helloWorld } from './hello-world'

const mockDependencies: MockDependencies<typeof helloWorld> = (overrides) => ({
  saveName: mock((_: string) => EitherAsync.liftEither(Right({})).void()),
  ...overrides
})

const mockInput: MockInput<typeof helloWorld> = (overrides) => ({
  id: 'b16ed4bb-2c3f-478f-8b1d-1139467daf4d',
  name: 'Alice',
  age: 42,
  ...overrides
})

describe('helloWorld', () => {
  test('logs the name and age', async () => {
    const dependencies = mockDependencies()
    const input = mockInput()

    await helloWorld(dependencies)(input)

    expect(dependencies.saveName).toHaveBeenCalledWith('b16ed4bb-2c3f-478f-8b1d-1139467daf4d', 'Alice')
  })

  test('return dependency error', async () => {
    const error = {
      type: 'DependencyError' as const,
      message: 'logger error',
      dependency: 'logger',
      input: 'Alice'
    }
    const dependencies = mockDependencies({
      saveName: mock((_) => EitherAsync.liftEither(Left(error)))
    })
    const input = mockInput()

    const response = await helloWorld(dependencies)(input)

    expect(dependencies.saveName).toHaveBeenCalledWith('b16ed4bb-2c3f-478f-8b1d-1139467daf4d', 'Alice')
    expect(response.extract()).toEqual(error)
  })
})
