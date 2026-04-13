import { type Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import type { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import type { AnswersAttachmentsRepository } from '../repositories/answer-attachments-repository'
import type { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentRepository: AnswersAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
