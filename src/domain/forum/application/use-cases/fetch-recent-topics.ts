import { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/question-repository'

interface FetchRecentTopicsUseCaseRequest {
  page: number
}

interface FetchRecentTopicsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentTopicsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentTopicsUseCaseRequest): Promise<FetchRecentTopicsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
