import { Filters } from '@services/query-cache.service';

function toFilterPairs(key: string, value: unknown): string[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.flatMap((item) => toFilterPairs(key, item));
  if (typeof value === 'object') return [`${key}=${encodeURIComponent(JSON.stringify(value))}`];
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return [`${key}=${encodeURIComponent(String(value))}`];
  }
  return [];
}

export const constructUrlFilter = (
  originalUrl: string,
  filters?: Filters,
  page?: number,
  pageSize?: number,
): string => {
  const queryParams: string[] = [];

  if (typeof page === 'number') queryParams.push(`page=${page}`);
  if (typeof pageSize === 'number') queryParams.push(`pageSize=${pageSize}`);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      queryParams.push(...toFilterPairs(key, value));
    });
  }

  if (queryParams.length === 0) return originalUrl;

  const separator = originalUrl.includes('?') ? '&' : '?';
  return `${originalUrl}${separator}${queryParams.join('&')}`;
};