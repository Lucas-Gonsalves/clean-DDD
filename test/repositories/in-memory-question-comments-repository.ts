import type { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComments: QuestionComment) {
    this.items.push(questionComments)
  }
}
