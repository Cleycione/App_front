export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ??
  "http://localhost:8080/api/v1";

const ACCESS_TOKEN_KEY = "petmatch_access_token";
const REFRESH_TOKEN_KEY = "petmatch_refresh_token";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export const tokenStore = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }
  return (await response.text()) as unknown as T;
}

async function refreshToken() {
  const refreshTokenValue = tokenStore.getRefreshToken();
  if (!refreshTokenValue) {
    throw new Error("Missing refresh token");
  }
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshTokenValue}`,
      "X-Refresh-Token": refreshTokenValue,
    },
    credentials: "include",
    body: JSON.stringify({
      refreshToken: refreshTokenValue,
      refresh_token: refreshTokenValue,
    }),
  });
  if (!response.ok) {
    tokenStore.clear();
    throw new Error("Refresh token failed");
  }
  const data = await parseResponse<any>(response);
  const accessToken =
    data.accessToken ?? data.access_token ?? data.token;
  const refreshToken =
    data.refreshToken ?? data.refresh_token ?? data.refreshToken;
  const expiresInSeconds =
    data.expiresInSeconds ?? data.expires_in ?? data.expiresIn;
  if (!accessToken || !refreshToken) {
    throw new Error("Invalid refresh token response");
  }
  tokenStore.setTokens(accessToken, refreshToken);
  return { accessToken, refreshToken, expiresInSeconds };
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean; skipRefresh?: boolean } = {},
): Promise<T> {
  const { auth = true, skipRefresh = false, headers, ...rest } = options;
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(headers ?? {}),
  };

  if (auth) {
    const accessToken = tokenStore.getAccessToken();
    if (accessToken) {
      requestHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
    credentials: "include",
  });

  if (
    response.status === 401 &&
    auth &&
    !skipRefresh &&
    !path.startsWith("/auth/") &&
    tokenStore.getRefreshToken()
  ) {
    try {
      await refreshToken();
      const retryHeaders: HeadersInit = {
        ...requestHeaders,
        Authorization: `Bearer ${tokenStore.getAccessToken()}`,
      };
      const retryResponse = await fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: retryHeaders,
        credentials: "include",
      });
      if (!retryResponse.ok) {
        const errorPayload = await parseResponse<ApiError>(retryResponse);
        throw { ...errorPayload, status: retryResponse.status } as ApiError;
      }
      return await parseResponse<T>(retryResponse);
    } catch (error) {
      throw error;
    }
  }

  if (!response.ok) {
    const errorPayload = await parseResponse<ApiError>(response);
    throw { ...errorPayload, status: response.status } as ApiError;
  }

  return await parseResponse<T>(response);
}

export async function apiUpload(path: string, file: File): Promise<{ url: string }> {
  const accessToken = tokenStore.getAccessToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorPayload = await parseResponse<ApiError>(response);
    throw { ...errorPayload, status: response.status } as ApiError;
  }

  return await parseResponse<{ url: string }>(response);
}
