import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception.js';

export class UserNotFoundException extends DomainException {
  readonly errorCode = 'USER_NOT_FOUND';

  constructor(userId: string) {
    super(`User ${userId} not found`, HttpStatus.NOT_FOUND, { userId });
  }
}
