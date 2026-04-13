import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface QuestionAttachmentProps {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.attachmentId
  }

  get attachmentId() {
    return this.props.questionId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityId) {
    const attachment = new QuestionAttachment(props, id)

    return attachment
  }
}
