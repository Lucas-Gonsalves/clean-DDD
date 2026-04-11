import { type Either, left, right } from '@/core/either'

import type { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAnswersUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswersUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findById(answerId)

    if (!answers) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answers.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answers)

    return right({})
  }
}
