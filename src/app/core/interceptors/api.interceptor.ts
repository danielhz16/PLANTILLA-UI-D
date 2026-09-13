import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { AuthStore } from '@core/auth/auth.store';
import { ERRORS } from '@features/auth/const/errors';

export interface ApiErrorResponse {
  show: string;
  message: string;
  code?: number;
  retryAfter?: number;
}

export interface ApiError extends Error {
  apiError?: ApiErrorResponse;
  code?: number;
  retryAfter?: number;
}

const parseBody = (error: HttpErrorResponse): ApiErrorResponse | undefined => {
  const body = error.error;
  if (body && typeof body === 'object' && 'message' in body) {
    return body as ApiErrorResponse;
  }
  return undefined;
};

const buildError = (message: string, data?: ApiErrorResponse): ApiError => {
  const error = new Error(message) as ApiError;
  if (data) {
    error.apiError = data;
    error.code = data.code;
    error.retryAfter = data.retryAfter;
  }
  return error;
};

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const auth = inject(AuthStore);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorData = parseBody(error);

      if (error.status === 401) {
        if (Number(errorData?.code) === ERRORS.MFA_PENDING) {
          auth.setMfaPending(true);
          return throwError(() => buildError(errorData?.show || errorData?.message || 'MFA pendiente', errorData));
        }
        auth.logoutUser();
        toast.error(errorData?.show || errorData?.message || 'Sesi\u00f3n expirada');
        if (router.url !== '/auth/login') {
          router.navigateByUrl('/auth/login');
        }
        return throwError(() => buildError(errorData?.show || errorData?.message || 'Unauthorized', errorData));
      }

      if (error.status === 403) {
        const message = errorData?.show || errorData?.message || 'No tienes permisos';
        toast.error(message);
        if (router.url !== '/unauthorized') {
          router.navigateByUrl('/unauthorized');
        }
        return throwError(() => buildError(message, errorData));
      }

      if (error.status === 429) {
        const retryAfter = errorData?.retryAfter ?? 30;
        const message = errorData?.show || `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter} segundos.`;
        toast.error(message);
        return throwError(() => buildError(errorData?.message || message, errorData));
      }

      const message = errorData?.show || errorData?.message || 'Ocurri\u00f3 un error';
      toast.error(message);
      return throwError(() => buildError(errorData?.message || 'Error en la petici\u00f3n', errorData));
    }),
  );
};