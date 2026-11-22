const API_BASE = (import.meta.env.VITE_ADMIN_API_BASE_URL || "").replace(/\/$/, "");

export type ApiResult<T> = { data: T | null; error: string | null; configured: boolean };

export async function adminRequest<T>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> {
  if (!API_BASE) return { data: null, error: "Admin API is not configured.", configured: false };
  try {
    const response = await fetch(`${API_BASE}${path.startsWith("/") ? path : `/${path}`}`, {
      ...init,
      credentials: "include",
      headers: { Accept: "application/json", ...(init.body ? { "Content-Type": "application/json" } : {}), ...init.headers },
    });
    if (response.status === 204) return { data: null, error: null, configured: true };
    const payload = await response.json().catch(() => null);
    if (!response.ok) return { data: null, error: payload?.detail || payload?.message || `Request failed (${response.status})`, configured: true };
    return { data: payload as T, error: null, configured: true };
  } catch {
    return { data: null, error: "Unable to reach the PesaGuard admin API.", configured: true };
  }
}

export const adminApi = {
  health: () => adminRequest<Record<string, unknown>>("/livez"),
  overview: () => adminRequest<Record<string, unknown>>("/api/v1/admin/overview"),
  list: (resource: string, query = "") => adminRequest<{ items?: unknown[]; total?: number }>(`/api/v1/admin/${resource}${query}`),
};
