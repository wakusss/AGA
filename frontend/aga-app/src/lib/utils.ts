import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
  }: {
    email?: string;
    password?: string;
    onError?: (message: string) => void;
    onLoading?: (isLoading: boolean) => void;
  },
) => {
  e.preventDefault();
  const data = {
    email,
    password,
  };

  onLoading?.(true);

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = responseData.message || "Unknown error";

      onError?.(errorMessage);

      if (response.status === 401) onError?.("Invalid email or password!");

      return;
    }
  } catch (err) {
    const message = "The server is not responding";
    onError?.(message);
  } finally {
    onLoading?.(false);
  }
};
