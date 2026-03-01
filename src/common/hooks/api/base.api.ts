
import type { Method } from "@/const/api";
import { toast } from "sonner";
import { useAuthStore, ERRORS } from "@/common";

const baseApi = import.meta.env.VITE_API || "http://localhost:3000/api";

interface Config {
    method: Method;
    headers: HeadersInit;
    credentials: RequestCredentials;
    body?: BodyInit;
}

interface ApiErrorResponse {
    show: string;
    message: string
}

export const callApi = async <T = unknown>(url: string, method: Method, data?: any, formData?: boolean): Promise<T> => {

    const config: Config = {
        method,
        headers: {
            "Content-Type": formData ? "multipart/form-data" : "application/json",
        },
        credentials: "include",
    }

    if (method !== "GET" &&  data) {
        config.body = formData ? data : JSON.stringify(data);
    }

    const cleanBase = baseApi.replace(/\/$/, '');
    const cleanUrl = url.replace(/^\//, '');
    const response: Response = await fetch(`${cleanBase}/${cleanUrl}`, config as RequestInit);

    if (!response.ok) {
      
        if (response.status === 401) {
           
            useAuthStore.getState().logoutUser();
          
            if (window.location.pathname !== '/auth/login') {
                window.location.href = '/auth/login';
            }
            let errorData: ApiErrorResponse = { show: "Sesión expirada", message: "Por favor, inicia sesión nuevamente" };
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    errorData = await response.json() as ApiErrorResponse;
                }
            } catch (e) {
                // Si no se puede parsear JSON, usar valores por defecto
            }
            toast.error(errorData?.show || errorData?.message || "Sesión expirada. Por favor, inicia sesión nuevamente");
            throw new Error("Unauthorized");
        } else if (response.status === 403) {
            // Redirigir a página de no autorizado
            if (window.location.pathname !== '/unauthorized') {
                window.location.href = '/unauthorized';
            }
            let errorData: ApiErrorResponse = { show: "No autorizado", message: "No tienes permisos para acceder a este recurso" };
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    errorData = await response.json() as ApiErrorResponse;
                }
            } catch (e) {
               
            }
            toast.error(errorData?.show || errorData?.message || "No tienes permisos para realizar esta acción");
            throw new Error("Forbidden");
        } else {
            let errorData: ApiErrorResponse = { show: "Error", message: "Ocurrió un error" };
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    errorData = await response.json() as ApiErrorResponse;
                }
            } catch (e) {
               
            }
            toast.error(errorData?.show || errorData?.message || "Ocurrió un error");
            throw new Error(errorData?.message || "Error en la petición");
        }
    }

    // Parse response body safely — avoid calling `json()` on empty responses
    let responseData: T | null = null;
    const contentType = response.headers.get("content-type") || "";

    if (response.status !== 204 && contentType.includes("application/json")) {
      const text = await response.text();
      responseData = text ? (JSON.parse(text) as T) : null;
    } else if (response.status !== 204) {
      // non-JSON but with a body — return raw text
      const text = await response.text();
      responseData = text ? (text as unknown as T) : null;
    }

    if (method !== "GET") {
      // Only show a toast when the API explicitly provides a `show` message
      const apiShow = responseData && typeof responseData === "object" ? (responseData as any).show : null;
      toast.success(apiShow || "Guardado exitosamente");
    }

    return responseData as unknown as T;
}