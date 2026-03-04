import LoadingSpinner from "./LoadingSpinner";

interface SignUpButtonProps {
  className?: string;
  formData?: {
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
  };
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  setError?: (msg: string) => void;
  setLoading?: (isLoading: boolean) => void;
  setSuccess?: (isSuccess: boolean) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonSignUp(props: SignUpButtonProps) {
  return (
    <button
      className={`border-1 border-[var(--color-primary-light-mode)] rounded-lg m-2 p-2 px-5 text-[var(--color-text-primary-light-mode) hover:bg-[var(--color-primary-light-mode)]/50 active:bg-[var(--color-primary-light-mode)]/70`}
      onClick={props.handleSubmit}
      disabled={props.isLoading}
    >
      {!props.isLoading ? "Sign Up" : <LoadingSpinner />}
    </button>
  );
}
