import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question, type QuestionProps } from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(overrride: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: 'Example',
    content: 'example-content',
    ...overrride,
  })

  return question
}
