export type StoredUserProfile = {
  id?: string;
  name?: string;
  address?: string;
  cpf?: string;
  profession?: string;
  phone?: string;
  email?: string;
  createdAt?: string;
};

const USER_PROFILE_KEY = "petmatch_user_profile";

export const userStore = {
  get: (): StoredUserProfile | null => {
    try {
      const raw = localStorage.getItem(USER_PROFILE_KEY);
      return raw ? (JSON.parse(raw) as StoredUserProfile) : null;
    } catch {
      return null;
    }
  },
  set: (profile: StoredUserProfile | null) => {
    if (!profile) {
      localStorage.removeItem(USER_PROFILE_KEY);
      return;
    }
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  },
};
