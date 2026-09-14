import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception.js';

export class UserEmailAlreadyExistException extends DomainException {
  readonly errorCode = 'USER_EMAIL_ALREADY_EXIST';

  constructor() {
    super(`User email already exist`, HttpStatus.CONFLICT);
  }
}
