import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../exceptions/domain.exception.js';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { status, body } = this.normalize(exception);

    this.logger.error(`${request.method} ${request.url} - ${status}`);

    response.status(status).json({
      success: false,
      ...body,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private normalize(exception: unknown): {
    status: number;
    body: Record<string, unknown>;
  } {
    if (exception instanceof DomainException) {
      const response = exception.getResponse() as Record<string, unknown>;
      return {
        status: exception.getStatus(),
        body: {
          errorCode: exception.errorCode,
          message: response.message,
          details: response.details,
        },
      };
    }

    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        body: { errorCode: 'HTTP_ERROR', message: exception.message },
      };
    }

    if (exception instanceof QueryFailedError) {
      return this.handleDatabaseError(exception);
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        errorCode: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    };
  }

  private handleDatabaseError(exception: QueryFailedError): {
    status: number;
    body: Record<string, unknown>;
  } {
    const driverError = exception.driverError as {
      code?: string;
      constraint?: string;
    };

    switch (driverError.code) {
      case '23505': // unique_violation
        return {
          status: HttpStatus.CONFLICT,
          body: {
            errorCode: 'DUPLICATE_ENTRY',
            message: 'Resource already exists',
            constraint: driverError.constraint,
          },
        };
      case '23503': // foreign_key_violation
        return {
          status: HttpStatus.BAD_REQUEST,
          body: {
            errorCode: 'INVALID_REFERENCE',
            message: 'Referenced resource does not exist',
          },
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            errorCode: 'DATABASE_ERROR',
            message: 'A database error occurred',
          },
        };
    }
  }
}
