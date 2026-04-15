import { type Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/domain/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/domain/resource-not-found-error'

import { Notification } from '../../enterprise/entities/notification'
import type { NotificationsRepository } from '../repositories/notifications-repository'

interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({ notification })
  }
}
