import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import api from "./api";
import { useAuthStore } from "@/stores/authStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSubmitLoginData = async (
  e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  {
    email = "",
    password = "",
    onError,
    onLoading,
    onSuccess,
  }: {
    email?: string;
    password?: string;
    onError?: (message: string) => void;
    onLoading?: (isLoading: boolean) => void;
    onSuccess?: (isSuccess: boolean) => void;
  },
) => {
  e.preventDefault();
  onLoading?.(true);

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    console.log(response);
    const data = response.data;

    if (!response.status.toString().startsWith("2")) {
      const errorMessage = data.message || "Unknown error";

      onError?.(errorMessage);

      if (response.status === 401) onError?.("Invalid email or password!");

      return;
    }

    const token = data.token || data.accessToken;
    if (token) {
      const { setAccessToken } = useAuthStore.getState();
      setAccessToken(token);
      onSuccess?.(true);
    } else {
      onError?.("No token received");
    }

    onSuccess?.(true);
  } catch (err) {
    console.log(err);
  } finally {
    onLoading?.(false);
  }
};
