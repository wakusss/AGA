import { handleSubmitLoginData } from "../../lib/utils.ts";
import LoadingSpinner from "./LoadingSpinner.tsx";
interface SignInButtonProps {
  email?: string;
  password?: string;
  isLoading?: boolean;
  setError?: (msg: string) => void;
  setLoading?: (isLoading: boolean) => void;
  setSuccess: (isSuccess: boolean) => void;
}

export default function ButtonSignIn({
  email,
  password,
  isLoading,
  setError,
  setLoading,
  setSuccess,
}: SignInButtonProps) {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmitLoginData({
      email,
      password,
      onError: setError,
      onLoading: setLoading,
      onSuccess: () => setSuccess(true),
    });
  };

  return (
    <button
      className={
        "border-1 border-[var(--color-primary-light-mode)] rounded-lg m-2 p-2 px-5 text-[var(--color-text-primary-light-mode) hover:bg-[var(--color-primary-light-mode)]/50 active:bg-[var(--color-primary-light-mode)]/70"
      }
      onClick={handleSubmit}
      disabled={isLoading}
    >
      {!isLoading ? "Sign In" : <LoadingSpinner />}
    </button>
  );
}
