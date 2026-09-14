import { PaginationMeta } from '../interfaces/api-response.interface.js';

export class PaginatedResult<T> {
  constructor(
    public readonly items: T[],
    public readonly pagination: PaginationMeta,
  ) {}
}
