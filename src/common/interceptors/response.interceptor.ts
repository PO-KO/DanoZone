import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface.js';
import { map, Observable } from 'rxjs';

export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        data: data?.items ?? data,
        meta: {
          timestamp: new Date().toISOString(),
          ...(data?.pagination ? { pagination: data.pagination } : {}),
        },
      })),
    );
  }
}
