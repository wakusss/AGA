import { handleSubmitLoginData } from "../../lib/utils.ts";
interface SignInButtonProps {
  email?: string;
  password?: string;
  isLoading?: boolean;
  setError?: (msg: string) => void;
  setLoading?: (isLoading: boolean) => void;
}

export default function ButtonSignIn({
  email,
  password,
  isLoading,
  setError,
  setLoading,
}: SignInButtonProps) {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmitLoginData(e, {
      email,
      password,
      onError: setError,
      onLoading: setLoading,
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
      {!isLoading ? (
        "Sign In"
      ) : (
        <div className="flex">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-[var(--color-primary-light-mode)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      )}
    </button>
  );
}
