import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AnswerAttachmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.attachmentId
  }

  get attachmentId() {
    return this.props.answerId
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    const attachment = new AnswerAttachment(props, id)

    return attachment
  }
}
