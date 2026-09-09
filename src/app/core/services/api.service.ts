import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Method } from '@shared/const/api';
import { ToastService } from '@services/toast.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toast: ToastService,
  ) {}

  private cleanUrl(url: string): string {
    const cleanBase = this.baseUrl.replace(/\/$/, '');
    const cleanPath = url.replace(/^\//, '');
    return `${cleanBase}/${cleanPath}`;
  }

  request<T>(
    url: string,
    method: Method,
    data?: unknown,
    params?: Record<string, string | number | boolean | ReadonlyArray<string | number | boolean> | null | undefined>,
    hiddenSuccessNotice = false,
  ): Observable<T> {
    const fullUrl = this.cleanUrl(url);
    const httpParams = params ? this.buildParams(params) : undefined;
    let observable: Observable<T>;

    switch (method) {
      case 'GET':
        observable = this.http.get<T>(fullUrl, { params: httpParams, withCredentials: true });
        break;
      case 'POST':
        observable = this.http.post<T>(fullUrl, data ?? {}, { withCredentials: true });
        break;
      case 'PUT':
        observable = this.http.put<T>(fullUrl, data ?? {}, { withCredentials: true });
        break;
      case 'PATCH':
        observable = this.http.patch<T>(fullUrl, data ?? {}, { withCredentials: true });
        break;
      case 'DELETE':
        observable = this.http.delete<T>(fullUrl, { body: data, withCredentials: true });
        break;
      default:
        observable = this.http.get<T>(fullUrl, { params: httpParams, withCredentials: true });
        break;
    }

    if (method !== 'GET' && !hiddenSuccessNotice) {
      return new Observable<T>((subscriber) => {
        observable.subscribe({
          next: (res) => {
            const apiShow = res && typeof res === 'object' ? (res as Record<string, unknown>)['show'] : null;
            this.toast.success((apiShow as string) || 'Guardado exitosamente');
            subscriber.next(res);
            subscriber.complete();
          },
          error: (err) => subscriber.error(err),
        });
      });
    }

    return observable;
  }

  private buildParams(
    params: Record<string, string | number | boolean | ReadonlyArray<string | number | boolean> | null | undefined>,
  ): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          httpParams = httpParams.append(key, String(item));
        });
      } else {
        httpParams = httpParams.append(key, String(value));
      }
    });
    return httpParams;
  }
}