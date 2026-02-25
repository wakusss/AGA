import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedToken = localStorage.getItem("access_token");
  return {
    accessToken: storedToken,
    isAuthenticated: !!storedToken,
    setAccessToken: (token) => {
      localStorage.setItem("access_token", token || "");
      set({ accessToken: token, isAuthenticated: !!token });
    },
    logout: () => {
      localStorage.removeItem("access_token");
      set({ accessToken: null, isAuthenticated: false });
    },
    checkAuth: () => {
      const token = localStorage.getItem("access_token");
      set({ accessToken: token, isAuthenticated: !!token });
    },
  };
});
