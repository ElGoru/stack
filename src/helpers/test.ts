import { Mock } from 'bun:test'

type BunMockedDependencies<Dependencies> = {
  [Key in keyof Dependencies]: Dependencies[Key] extends (...args: infer Arguments) => infer Return
    ? Mock<(...args: Arguments) => Return>
    : never
}

type MockedDependencies<Code> = Code extends (dependencies: infer Dependencies) => (input: infer Input) => unknown
  ? BunMockedDependencies<Dependencies>
  : never

export type MockDependencies<Code> = (overrides?: Partial<MockedDependencies<Code>>) => MockedDependencies<Code>

type MockedInput<Code> = Code extends (dependencies: infer Dependencies) => (input: infer Input) => unknown
  ? Input
  : never

export type MockInput<Code> = (overrides?: Partial<MockedInput<Code>>) => MockedInput<Code>
