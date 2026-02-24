import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function handleSubmitLoginData(
  e: React.MouseEvent<HTMLButtonElement>,
  {
    email,
    password,
    onError,
    onLoading,
  }: {
    email?: string;
    password?: string;
    onError?: (msg: string) => void;
    onLoading?: (isLoading: boolean) => void;
  }
) {
  if (!email || !password) {
    onError?.("Email and password are required.");
    return;
  }

  onLoading?.(true);

  // Simulate an API call
  setTimeout(() => {
    // For demo purposes, we just check if email is "  
  }
  )}