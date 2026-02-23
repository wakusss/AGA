import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Интерсептор запросов — токен получаем динамически
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

// Интерсептор ответов — logout тоже динамически
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      require("@/stores/authStore").useAuthStore.getState().logout();
      // Можно добавить уведомление или редирект здесь
    }
    return Promise.reject(err);
  },
);

export default api;
