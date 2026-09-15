import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception.js';

export class UserAddressNotFoundException extends DomainException {
  readonly errorCode = 'USER_ADDRESS_NOT_FOUND';

  constructor(userId: string, addressId: string) {
    super(`Address not found for user `, HttpStatus.NOT_FOUND, {
      userId,
      addressId,
    });
  }
}
