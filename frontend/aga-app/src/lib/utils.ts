import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import api from "./api";
import { useAuthStore } from "@/stores/authStore";
import { on } from "events";

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
  onLoading?.(true);

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    const token = data.token || data.accessToken;
    if (token) {
      const { setAccessToken } = useAuthStore.getState();
      setAccessToken(token);
      onSuccess?.(true);
    } else {
      throw new Error("No token received");
    }
  } catch (err: any | Error) {
    if (err.response?.status === 401) onError?.("Invalid email or password!");
    if (err.response?.status === 400) onError?.("Please fill in all fields!");
    if (err.response?.status === 500)
      onError?.("Server error, please try again later!");
    if (Error instanceof Error) onError?.(err.message);
  } finally {
    onLoading?.(false);
  }
};
export const handleSubmitRegisterData = async (
  e: React.MouseEvent<HTMLButtonElement>,
  {
    formData,
    onError,
    onLoading,
    onSuccess,
  }: {
    formData?: {
      name: string;
      secondName: string;
      login: string;
      confirmPassword: string;
      email: string;
    };
    onError?: (message: string) => void;
    onLoading?: (isLoading: boolean) => void;
    onSuccess?: (isSuccess: boolean) => void;
  },
) => {
  e.preventDefault();
  try {
    const response = await api.post("auth/register", {
      name: formData?.name,
      secondName: formData?.secondName,
      login: formData?.login,
      password: formData?.confirmPassword,
      email: formData?.email,
    });

    if (response.status === 201) {
      onSuccess?.(true);
    } else {
      throw new Error("Registration failed");
    }
  } catch (err: any | Error) {
    if (err.response?.status === 400) onError?.("Please fill in all fields!");
    if (err.response?.status === 409)
      onError?.("User with this email already exists!");
    if (err instanceof Error) onError?.(err.message);
  } finally {
    onLoading?.(false);
  }
};

export const fetchPosts = async ({
  onError,
  onLoading,
  onSuccess,
}: {
  onError?: (message: string) => void;
  onLoading?: (isLoading: boolean) => void;
  onSuccess?: (data: any) => void;
}) => {
  onLoading?.(true);
  try {
    const response = await api.get("/posts");
    if (response.status === 200) {
      onSuccess?.(response.data);
    } else {
      throw new Error("Failed to fetch posts");
    }
  } catch (err: any | Error) {
    if (err.response?.status === 401) onError?.("Unauthorized, please log in!");
    if (err.response?.status === 500)
      onError?.("Server error, please try again later!");
    if (err instanceof Error) onError?.(err.message);
  } finally {
    onLoading?.(false);
  }
};

export const createPost = async ({
  postData,
  onError,
  onSuccess,
}: {
  postData?: {
    content: string;
    imageUrl?: string;
  };
  onError?: (message: string) => void;
  onSuccess?: (data: any) => void;
}) => {
  try {
    const response = await api.post("/posts", postData);
    if (response.status === 201) {
      onSuccess?.(true);
    } else {
      throw new Error("Failed to create post");
    }
  } catch (err: any | Error) {
    if (err.response?.status === 400) onError?.("Invalid post data!");
    if (err.response?.status === 401) onError?.("Unauthorized, please log in!");
    if (err.response?.status === 500)
      onError?.("Server error, please try again later!");
    if (err instanceof Error) onError?.(err.message);
  }
};

export const getComments = async (
  postId: number,
  {
    onError,
    onLoading,
    onSuccess,
  }: {
    onError?: (message: string) => void;
    onLoading?: (isLoading: boolean) => void;
    onSuccess?: (data: any) => void;
  },
) => {
  onLoading?.(true);

  try {
    const response = await api.get(`/posts/${postId}/comments`);
    if (response.status === 200) {
      onSuccess?.(response.data);
    } else {
      throw new Error("Failed to fetch comments");
    }
  } catch (err: any | Error) {
    if (err.response?.status === 500)
      onError?.("Server error, please try again later!");
    if (err instanceof Error) onError?.(err.message);
  } finally {
    onLoading?.(false);
  }
};

export const addComment = async (
  postId: number,
  commentData: {
    content: string;
  },
  {
    onError,
    onLoading,
    onSuccess,
  }: {
    onError?: (message: string) => void;
    onLoading?: (isLoading: boolean) => void;
    onSuccess?: (data: any) => void;
  },
) => {
  onLoading?.(true);

  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    if (response.status === 201) {
      onSuccess?.(response.data);
    } else {
      throw new Error("Failed to add comment");
    }
  } catch (err: any | Error) {
    if (err.response?.status === 500)
      onError?.("Server error, please try again later!");
    if (err instanceof Error) onError?.(err.message);
  } finally {
    onLoading?.(false);
  }
};
