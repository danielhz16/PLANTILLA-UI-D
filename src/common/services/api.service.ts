import type { Method } from '@/const/api';
import { toast } from 'sonner';
import { useAuthStore } from '@/common';
import { ERRORS } from '@/const/errors';

const baseApi = import.meta.env.VITE_API;

interface ApiErrorResponse {
  show: string;
  message: string;
  code?: number;
  retryAfter?: number;
}

const cleanUrl = (url: string): string => {
  const cleanBase = baseApi.replace(/\/$/, '');
  const cleanPath = url.replace(/^\//, '');
  return `${cleanBase}/${cleanPath}`;
};

const parseError = async (response: Response): Promise<ApiErrorResponse> => {
  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await response.json() as ApiErrorResponse;
    }
  } catch {}
  return { show: 'Error', message: 'Ocurri\u00f3 un error' };
};

const handleUnauthorized = async (response: Response): Promise<never> => {
  const errorData = await parseError(response);

  if (Number(errorData.code) === ERRORS.MFA_PENDING) {
    useAuthStore.getState().setMfaPending(true);
    const mfaError = new Error(errorData?.show || errorData?.message || 'MFA pendiente') as Error & {
      code?: number;
      apiError?: ApiErrorResponse;
    };
    mfaError.code = ERRORS.MFA_PENDING;
    mfaError.apiError = errorData;
    throw mfaError;
  }

  useAuthStore.getState().logoutUser();
  if (globalThis.location.pathname !== '/auth/login') {
    globalThis.location.href = '/auth/login';
  }
  toast.error(errorData?.show || errorData?.message || 'Sesi\u00f3n expirada');
  throw new Error('Unauthorized');
};

const handleForbidden = async (response: Response): Promise<never> => {
  const errorData = await parseError(response);
  if (globalThis.location.pathname !== '/unauthorized') {
    globalThis.location.href = '/unauthorized';
  }
  toast.error(errorData?.show || errorData?.message || 'No tienes permisos');
  throw new Error('Forbidden');
};

const handleRateLimited = async (response: Response): Promise<never> => {
  const errorData = await parseError(response);
  const retryAfter = errorData.retryAfter ?? 30;
  const message = `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter} segundos.`;
  toast.error(errorData?.show || message);
  const error = new Error(errorData?.message || message) as Error & { retryAfter?: number };
  error.retryAfter = retryAfter;
  throw error;
};

const handleError = async (response: Response): Promise<never> => {
  const errorData = await parseError(response);
  toast.error(errorData?.show || errorData?.message || 'Ocurri\u00f3 un error');
  throw new Error(errorData?.message || 'Error en la petici\u00f3n');
};

const parseResponse = async <T>(response: Response): Promise<T | null> => {
  if (response.status === 204) return null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : null;
  }
  const text = await response.text();
  return text ? (text as unknown as T) : null;
};

const showSuccessToast = (method: Method, data: unknown): void => {
  if (method === 'GET') return;
  const apiShow = data && typeof data === 'object' ? (data as Record<string, unknown>).show : null;
  toast.success((apiShow as string) || 'Guardado exitosamente');
};

export const callApi = async <T = unknown>(
  url: string,
  method: Method,
  data?: unknown,
  formData?: boolean,
): Promise<T> => {
  const config: RequestInit & { headers: Record<string, string> } = {
    method,
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    },
    credentials: 'include',
  };

  if (method !== 'GET' && data) {
    config.body = formData ? (data as BodyInit) : JSON.stringify(data);
  }

  const response: Response = await fetch(cleanUrl(url), config);

  if (!response.ok) {
    if (response.status === 401) return handleUnauthorized(response);
    if (response.status === 403) return handleForbidden(response);
    if (response.status === 429) return handleRateLimited(response);
    return handleError(response);
  }

  const responseData = await parseResponse<T>(response);
  showSuccessToast(method, responseData);
  return responseData as T;
};
