import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create a new answer', async () => {
    const result = await sut.execute({
      instructorId: '',
      questionId: '',
      content: 'Answer content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]?.id).toEqual(result.value?.answer.id)
  })
})
