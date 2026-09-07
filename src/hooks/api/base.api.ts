import type { Method } from '@/const/api';
import { callApi as serviceCallApi } from '@/services/api.service';

export const callApi = async <T = unknown>(
  url: string,
  method: Method,
  data?: unknown,
  formData?: boolean,
  hiddenSuccessNotice?: boolean,
): Promise<T> => serviceCallApi<T>(url, method, data, formData, hiddenSuccessNotice);
