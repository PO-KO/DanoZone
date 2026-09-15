import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception.js';

export class CountryNotFoundException extends DomainException {
  readonly errorCode = 'COUNTRY_NOT_FOUND';

  constructor(countryId: string) {
    super(`Country ${countryId} not found`, HttpStatus.NOT_FOUND, {
      countryId,
    });
  }
}
