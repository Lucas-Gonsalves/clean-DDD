import { makeAnswer } from 'test/factories/forum/make-answer'
import { InMemoryAnswersAttachmentsRepository } from 'test/repositories/forum/in-memory-answers-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/forum/in-memory-answers-repository'
import { beforeEach, describe, it } from 'vitest'

import { OnAnswerCreated } from './on-answer-created'

let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository = new InMemoryAnswersAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
  })
  it('should send a notification when an answer is created', () => {
    const _onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)
  })
})
