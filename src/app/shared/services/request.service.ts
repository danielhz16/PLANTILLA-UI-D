import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '@services/api.service';
import { QueryCache } from '@services/query-cache.service';
import { ListRegistry } from '@services/list-registry.service';
import { Method } from '@shared/const/api';

export interface RequestOptions<T> {
  url: string;
  method: Method;
  keyCache?: string;
  nameID?: string;
  subProp?: string;
  deleteCell?: boolean;
  id?: string | number;
  hiddenSuccessNotice?: boolean;
  toggleActive?: boolean;
  refreshKey?: string;
  onSuccess?: (res: T) => void;
}

interface RequestResponse<T> {
  newData?: T;
  updateData?: T;
  deleteData?: T;
  [key: string]: unknown;
}

const isSameId = (currentId: unknown, targetId: string | number): boolean => {
  return String(currentId) === String(targetId);
};

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(
    private api: ApiService,
    private cache: QueryCache,
    private registry: ListRegistry,
  ) {}

  create<T = unknown>(options: RequestOptions<T>): {
    execute: (data: unknown) => Promise<T>;
    isPending: () => boolean;
  } {
    let pending = false;

    const execute = async (data: unknown): Promise<T> => {
      pending = true;
      try {
        const res = await firstValueFrom(
          this.api.request<RequestResponse<T>>(options.url, options.method, data ?? {}, undefined, options.hiddenSuccessNotice),
        );

        if (options.keyCache) {
          if (res?.newData) {
            this.cache.updateRows(options.keyCache, (rows) => [...rows, res.newData as Record<string, unknown>], options.subProp);
          }
          if (res?.updateData && options.nameID) {
            const updateData = res.updateData as Record<string, unknown>;
            this.cache.updateRows(
              options.keyCache,
              (rows) => rows.map((item) => {
                if (!isSameId((item as Record<string, unknown>)[options.nameID!], updateData[options.nameID!] as string | number)) return item;
                return { ...item, ...updateData };
              }),
              options.subProp,
            );
          }
          if (options.deleteCell && options.id && options.nameID) {
            const id = options.id;
            this.cache.updateRows(
              options.keyCache,
              (rows) => rows.filter((item) => !isSameId((item as Record<string, unknown>)[options.nameID!], id)),
              options.subProp,
            );
          }
          if (options.toggleActive && options.id && options.nameID) {
            const id = options.id;
            this.cache.updateRows(
              options.keyCache,
              (rows) => rows.map((item) => {
                if (!isSameId((item as Record<string, unknown>)[options.nameID!], id)) return item;
                const record = item as Record<string, unknown>;
                return { ...record, active: !record['active'] };
              }),
              options.subProp,
            );
          }
        }

        if (options.refreshKey) {
          this.registry.get(options.refreshKey)?.refetch();
        }

        options.onSuccess?.(res as unknown as T);
        return res as unknown as T;
      } finally {
        pending = false;
      }
    };

    return {
      execute,
      isPending: () => pending,
    };
  }
}