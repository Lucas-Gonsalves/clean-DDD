import { expect, test } from 'vitest'

import type { Answer } from '../entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  // eslint-disable-next-line
  create: async (_answer: Answer): Promise<void> => {
    return
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '2',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
