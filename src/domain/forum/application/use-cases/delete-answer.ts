import type { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswersUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswersUseCaseResponse {}

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findById(answerId)

    if (!answers) {
      throw new Error('Resource not found')
    }

    if (authorId !== answers.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answers)

    return {}
  }
}
