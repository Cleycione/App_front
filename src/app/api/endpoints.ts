import { apiFetch, apiUpload, tokenStore } from "./client";
import type {
  PageResponse,
  PostResponse,
  DonationResponse,
  PetResponse,
  HealthCardResponse,
  CaregiverResponse,
  VetResponse,
  PartnerResponse,
  NotificationResponse,
  CommunityMessageResponse,
  WalletResponse,
  WalletTransactionResponse,
  CouponResponse,
  ClaimRequest,
} from "./types";

export const authApi = {
  signup: (payload: {
    name: string;
    address?: string;
    cpf: string;
    profession?: string;
    phone: string;
    email: string;
    password: string;
  }) =>
    apiFetch<{ accessToken: string; refreshToken: string; expiresInSeconds: number }>(
      "/auth/signup",
      { method: "POST", body: JSON.stringify(payload), auth: false },
    ).then((data) => {
      const accessToken =
        data.accessToken ?? (data as any).access_token ?? (data as any).token;
      const refreshToken =
        data.refreshToken ?? (data as any).refresh_token ?? (data as any).refreshToken;
      const expiresInSeconds =
        data.expiresInSeconds ?? (data as any).expires_in ?? (data as any).expiresIn;
      if (!accessToken || !refreshToken) {
        throw new Error("Resposta de autenticação inválida");
      }
      tokenStore.setTokens(accessToken, refreshToken);
      return { accessToken, refreshToken, expiresInSeconds };
    }),
  login: (payload: {
    login: string;
    password: string;
    deviceId?: string;
    trusted?: boolean;
  }) =>
    apiFetch<{ accessToken: string; refreshToken: string; expiresInSeconds: number }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify(payload), auth: false },
    ).then((data) => {
      const accessToken =
        data.accessToken ?? (data as any).access_token ?? (data as any).token;
      const refreshToken =
        data.refreshToken ?? (data as any).refresh_token ?? (data as any).refreshToken;
      const expiresInSeconds =
        data.expiresInSeconds ?? (data as any).expires_in ?? (data as any).expiresIn;
      if (!accessToken || !refreshToken) {
        throw new Error("Resposta de autenticação inválida");
      }
      tokenStore.setTokens(accessToken, refreshToken);
      return { accessToken, refreshToken, expiresInSeconds };
    }),
  logout: () => tokenStore.clear(),
};

export const usersApi = {
  getMe: () => apiFetch<{ id: string; name: string; address?: string; cpf: string; profession?: string; phone: string; email: string; createdAt: string }>("/users/me"),
  updateMe: (payload: Partial<{ name: string; address: string; profession: string; phone: string; email: string }>) =>
    apiFetch("/users/me", { method: "PATCH", body: JSON.stringify(payload) }),
  updatePreferences: (payload: Partial<{ theme: string; fontSize: string; highContrast: boolean }>) =>
    apiFetch("/users/me/preferences", { method: "PATCH", body: JSON.stringify(payload) }),
  addTrustedDevice: (payload: { deviceId: string; trusted: boolean }) =>
    apiFetch("/users/me/trusted-devices", { method: "POST", body: JSON.stringify(payload) }),
  removeTrustedDevice: (deviceId: string) =>
    apiFetch(`/users/me/trusted-devices/${deviceId}`, { method: "DELETE" }),
};

export const postsApi = {
  list: (
    params: Record<string, string | number | undefined>,
    options?: { auth?: boolean; skipRefresh?: boolean },
  ) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<PostResponse>>(`/posts?${searchParams.toString()}`, {
      auth: options?.auth ?? false,
      skipRefresh: options?.skipRefresh,
    });
  },
  get: (id: string) => apiFetch<PostResponse>(`/posts/${id}`, { auth: false }),
  create: (payload: Partial<PostResponse>) =>
    apiFetch<PostResponse>("/posts", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: Partial<PostResponse>) =>
    apiFetch<PostResponse>(`/posts/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  remove: (id: string) => apiFetch(`/posts/${id}`, { method: "DELETE" }),
  addUpdate: (id: string, message: string) =>
    apiFetch(`/posts/${id}/updates?message=${encodeURIComponent(message)}`, { method: "POST" }),
  timeline: (id: string) => apiFetch(`/posts/${id}/timeline`, { auth: false }),
  createClaim: (id: string, payload: ClaimRequest) =>
    apiFetch(`/posts/${id}/claims`, { method: "POST", body: JSON.stringify(payload) }),
};

export const mapApi = {
  posts: (
    params: Record<string, string | number | undefined>,
    options?: { auth?: boolean; skipRefresh?: boolean },
  ) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<PostResponse>>(
      `/map/posts?${searchParams.toString()}`,
      { auth: options?.auth ?? true, skipRefresh: options?.skipRefresh },
    );
  },
};

export const donationsApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<DonationResponse>>(`/donations?${searchParams.toString()}`, { auth: false });
  },
  get: (id: string) => apiFetch<DonationResponse>(`/donations/${id}`, { auth: false }),
  create: (payload: Partial<DonationResponse>) =>
    apiFetch<DonationResponse>("/donations", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: Partial<DonationResponse>) =>
    apiFetch<DonationResponse>(`/donations/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  remove: (id: string) => apiFetch(`/donations/${id}`, { method: "DELETE" }),
};

export const petsApi = {
  list: () => apiFetch<PageResponse<PetResponse>>("/pets"),
  get: (id: string) => apiFetch<PetResponse>(`/pets/${id}`),
  create: (payload: Partial<PetResponse>) =>
    apiFetch<PetResponse>("/pets", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: Partial<PetResponse>) =>
    apiFetch<PetResponse>(`/pets/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  remove: (id: string) => apiFetch(`/pets/${id}`, { method: "DELETE" }),
  getHealthCard: (id: string) => apiFetch<HealthCardResponse>(`/pets/${id}/health-card`),
  putHealthCard: (id: string, payload: HealthCardResponse) =>
    apiFetch<HealthCardResponse>(`/pets/${id}/health-card`, { method: "PUT", body: JSON.stringify(payload) }),
};

export const caregiversApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<CaregiverResponse>>(`/caregivers?${searchParams.toString()}`, { auth: false });
  },
  get: (id: string) => apiFetch<CaregiverResponse>(`/caregivers/${id}`, { auth: false }),
};

export const vetsApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<VetResponse>>(`/vets?${searchParams.toString()}`, { auth: false });
  },
  get: (id: string) => apiFetch<VetResponse>(`/vets/${id}`, { auth: false }),
};

export const partnersApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<PartnerResponse>>(`/partners?${searchParams.toString()}`, { auth: false });
  },
  get: (id: string) => apiFetch<PartnerResponse>(`/partners/${id}`, { auth: false }),
};

export const notificationsApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<NotificationResponse>>(`/notifications?${searchParams.toString()}`);
  },
  unreadCount: () => apiFetch<{ count: number }>("/notifications/unread-count"),
  markRead: (id: string) => apiFetch(`/notifications/${id}/read`, { method: "POST" }),
};

export const communityApi = {
  listMessages: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<CommunityMessageResponse>>(`/community/messages?${searchParams.toString()}`, { auth: false });
  },
  sendMessage: (payload: {
    message: string;
    mentions?: string[];
    imageUrl?: string;
    isPinned?: boolean;
  }) =>
    apiFetch("/community/messages", { method: "POST", body: JSON.stringify(payload) }),
  listMentions: () => apiFetch<PageResponse<CommunityMessageResponse>>("/community/mentions"),
  markMentionRead: (id: string) => apiFetch(`/community/mentions/${id}/read`, { method: "POST" }),
};

export const walletApi = {
  getWallet: () => apiFetch<WalletResponse>("/wallet"),
  listTransactions: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    return apiFetch<PageResponse<WalletTransactionResponse>>(`/wallet/transactions?${searchParams.toString()}`);
  },
  createTransaction: (params: { type: string; description: string; amount: number }) =>
    apiFetch(`/wallet/transactions?type=${encodeURIComponent(params.type)}&description=${encodeURIComponent(params.description)}&amount=${params.amount}`, { method: "POST" }),
  createCoupon: (payload: { partnerName: string; discount: string; validUntil: string }) =>
    apiFetch<CouponResponse>("/wallet/coupons", { method: "POST", body: JSON.stringify(payload) }),
};

export const uploadsApi = {
  upload: (file: File) => apiUpload("/uploads", file),
};
