import { describe, expect, it } from 'vitest';
import { MAX_PAGE_SIZE, clampPagination } from '@/lib/pagination';

describe('clampPagination', () => {
  it('keeps normal values', () => {
    expect(clampPagination(2, 10)).toEqual({ page: 2, limit: 10 });
  });

  it('caps a huge limit sent by a direct action call', () => {
    expect(clampPagination(1, 1e9).limit).toBe(MAX_PAGE_SIZE);
  });

  it('falls back on junk, zero, negative and object values', () => {
    expect(clampPagination('x', 0)).toEqual({ page: 1, limit: 9 });
    expect(clampPagination(-3, -1)).toEqual({ page: 1, limit: 9 });
    expect(clampPagination({ $gt: 0 }, { $gt: 0 })).toEqual({ page: 1, limit: 9 });
    expect(clampPagination(1.5, 2.5)).toEqual({ page: 1, limit: 9 });
  });
});
