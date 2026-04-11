import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { FetchRecentTopicsUseCase } from './fetch-recent-topics'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentTopicsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentTopicsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 3, 2) }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 3, 3) }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 3, 1) }))

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toHaveLength(3)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2026, 3, 3) }),
      expect.objectContaining({ createdAt: new Date(2026, 3, 2) }),
      expect.objectContaining({ createdAt: new Date(2026, 3, 1) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 3, 1) }))
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
