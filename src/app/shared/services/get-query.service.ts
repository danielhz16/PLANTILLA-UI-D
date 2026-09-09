import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '@services/api.service';
import { Method } from '@shared/const/api';

export interface GetQueryResult<T> {
  data: () => T | null;
  isLoading: () => boolean;
  refetch: () => Promise<void>;
}

@Injectable({ providedIn: 'root' })
export class GetQueryService {
  constructor(private api: ApiService) {}

  get<T = unknown>(url: string): GetQueryResult<T> & { run: (action: boolean) => void } {
    let enabled = true;
    const dataSignal = signal<T | null>(null);
    const loadingSignal = signal(false);
    let subId = 0;

    const execute = async () => {
      if (!enabled) return;
      loadingSignal.set(true);
      subId++;
      const id = subId;
      try {
        const result = await firstValueFrom(this.api.request<T>(url, 'GET' as Method));
        if (id === subId) dataSignal.set(result);
      } finally {
        if (id === subId) loadingSignal.set(false);
      }
    };

    return {
      data: dataSignal.asReadonly(),
      isLoading: loadingSignal.asReadonly(),
      refetch: async () => execute(),
      run: (action: boolean) => {
        enabled = action;
        if (action) execute();
      },
    };
  }
}