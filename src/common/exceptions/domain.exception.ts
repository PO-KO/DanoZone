import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class DomainException extends HttpException {
  abstract readonly errorCode: string;

  constructor(
    message: string,
    status: HttpStatus,
    public readonly details?: Record<string, unknown>,
  ) {
    super({ message, errorCode: undefined, details }, status);
  }
}
