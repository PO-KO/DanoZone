import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception.js';

export class UserAddressAlreadyExistException extends DomainException {
  readonly errorCode = 'USER_ADDRESS_ALREADY_EXIST';

  constructor() {
    super(`User address already exist`, HttpStatus.CONFLICT);
  }
}
