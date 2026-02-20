interface SignUpButtonProps {
  className?: string;
  formData?: {
    name: string;
    secondName: string;
    login: string;
    password: string;
    confirmPassword: string;
    email: string;
  };
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonSignUp(props: SignUpButtonProps) {
  return (
    <button
      className={`border-1 border-[var(--color-primary-light-mode)] rounded-lg m-2 p-2 px-5 text-[var(--color-text-primary-light-mode) hover:bg-[var(--color-primary-light-mode)]/50 active:bg-[var(--color-primary-light-mode)]/70`}
      onClick={props.handleSubmit}
    >
      {}
    </button>
  );
}
