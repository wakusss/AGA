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
      className={`border-1 m-2${props.className || ""}`}
      value={"Sign Up"}
      onClick={props.handleSubmit}
    >
      Sign Up
    </button>
  );
}
