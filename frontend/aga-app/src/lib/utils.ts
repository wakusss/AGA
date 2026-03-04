import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import api from "./api";
import { useAuthStore } from "@/stores/authStore";
import { on } from "events";
import type { Post } from "@/components/types/Post";

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
    if (err instanceof Error) onError?.(err.message);
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
  // e.preventDefault();  ← закомментировано, т.к. передали MouseEvent, а не FormEvent
  onLoading?.(true);

  try {
    const response = await api.post("/auth/register", {
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
  } catch (err: any) {
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
  } catch (err: any) {
    if (err.response?.status === 401) onError?.("Unauthorized, please log in!");
    if (err.response?.status === 500)
      onError?.("Server error, please try again later!");
    if (err instanceof Error) onError?.(err.message);
  } finally {
    onLoading?.(false);
  }
};

interface UserProfile {
  id: number;
  email: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  createdAt: string;    
}

export const fetchCurrentUserProfile = async ({
  onError,
  onLoading,
  onSuccess,
}: {
  onError?: (message: string) => void;
  onLoading?: (isLoading: boolean) => void;
  onSuccess?: (data: UserProfile) => void;
}) => {
  onLoading?.(true);

  try {
    const response = await api.get("/users/me");

    if (response.status === 200) {
      onSuccess?.(response.data);
    } else {
      throw new Error(`Unexpected status: ${response.status}`);
    }
  } catch (err: any) {
     if (err.response?.status === 401) onError?.("Unauthorized, please log in!");
    if (err.response?.status === 500)
      onError?.("Server error, please try again later!");
    if (err instanceof Error) onError?.(err.message);
  } finally {
    onLoading?.(false);
  }
};
export const updateCurrentUserProfile = async ({
  data,
  onSuccess,
  onError,
}: {
  data: {
    username: string;
    bio?: string;
    avatarUrl?: string | null;
  };
  onSuccess?: (updated: UserProfile) => void;
  onError?: (message: string) => void;
}) => {
  try {
    const response = await api.patch("/users/me", {
      username: data.username.trim(),
      bio: data.bio?.trim(),
      avatarUrl: data.avatarUrl,
    });

    if (response.status === 200) {
      onSuccess?.(response.data);
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || "Failed to update profile";
    onError?.(msg);
    console.error("PATCH /users/me error:", err);
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

export const deletePost = async (postId: string | number) => {
  try {
    const res = await api.delete(`posts/${postId}`);
    return res;
  } catch (err: any) {
    throw err;
  }
}

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
  commentData: { content: string },
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

    onSuccess?.(response.data);
  } catch (err: any) {
    if (err.response?.status === 500) {
      onError?.("Server error, please try again later!");
    } else if (err.response?.status === 400) {
      onError?.("Invalid comment data");
    } else if (err.response?.status === 403) {
      onError?.("You don't have permission to comment");
    } else {
      onError?.("Failed to add comment: " + (err.message || "Unknown error"));
    }
  } finally {
    onLoading?.(false);
  }
};

export const fetchAllPosts = async ({
  onError,
  onLoading,
  onSuccess,
}: {
  onError?: (message: string) => void;
  onLoading?: (isLoading: boolean) => void;
  onSuccess?: (posts: any[]) => void; 
}) => {
  onLoading?.(true);

  try {

    const response = await api.get('/posts');

    if (response.status === 200) {
      let posts = response.data;


      if (posts && Array.isArray(posts.content)) {
        posts = posts.content;
      }

     
      posts = posts.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      }));

      onSuccess?.(posts);
    } else {
      throw new Error(`Unexpected status: ${response.status}`);
    }
  } catch (err: any) {
    let message = 'Failed to load posts';

    if (err.response) {
      const status = err.response.status;
      if (status === 401) message = 'Unauthorized. Please log in.';
      else if (status === 500) message = 'Server error (500). Check backend logs.';
      else message = `Error ${status}`;

    
      console.error('Server response body:', err.response.data);
    } else if (err.request) {
      message = 'No response from server. Is backend running?';
    } else {
      message = err.message || 'Unknown error';
    }

    onError?.(message);
    console.error('fetchAllPosts failed:', err);
  } finally {
    onLoading?.(false);
  }
};
interface UpdatePostData {
  content: string | "";
  imageUrl?: string | null;
}

export const updatePost = async (
  postId: number,
  data: UpdatePostData,
  onSuccess?: (updated: Post) => void,
  onError?: (msg: string) => void
): Promise<Post | null> => {
  try {
    const payload: any = { content: data.content.trim() , id:postId };
    

    if (data.imageUrl !== undefined) {
      payload.imageUrl = data.imageUrl || null;
    }
    console.log(payload);
    console.log(postId);

    const response = await api.patch<Post>(`/posts`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      onSuccess?.(response.data);
      return response.data;
    }

    throw new Error(`Unexpected status: ${response.status}`);
  } catch (err: any) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to update post";

    onError?.(message);
    console.error(`PATCH /posts/${postId} failed:`, err);
    
    return null;
  }
};