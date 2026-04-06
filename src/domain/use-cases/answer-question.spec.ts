import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()
  const answer = answerQuestion.execute({
    questionId: '1',
    instructorId: '2',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})
