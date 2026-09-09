import { Injectable } from '@angular/core';
import { ListQuery } from '@services/list-query.service';

@Injectable({ providedIn: 'root' })
export class ListRegistry {
  private readonly queries = new Map<string, ListQuery<Record<string, unknown>>>();

  register(key: string, query: ListQuery<Record<string, unknown>>): void {
    this.queries.set(key, query);
  }

  unregister(key: string): void {
    this.queries.delete(key);
  }

  get(key: string): ListQuery<Record<string, unknown>> | null {
    return this.queries.get(key) ?? null;
  }
}