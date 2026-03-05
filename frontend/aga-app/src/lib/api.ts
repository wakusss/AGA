import axios from "axios";
import { apiUrl } from "@/lib/config.ts";

const api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Interceptor requests
api.interceptors.request.use(
  async (config) => {
    const { useAuthStore } = await import("@/stores/authStore");
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor responses
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const { useAuthStore } = await import("@/stores/authStore");
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  },
);

export default api;
