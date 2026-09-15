import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception.js';

export class CountryNameAlreadyExist extends DomainException {
  readonly errorCode: 'CountryNameAlreadyExist';

  constructor() {
    super(`Country name already exist`, HttpStatus.CONFLICT);
  }
}
