import { handleSubmitLoginData } from "../../lib/utils.ts";
interface SignInButtonProps {
  className?: string;
  email?: string;
  password?: string;
}

export default function ButtonSignIn(props: SignInButtonProps) {
  const propsData = { email: props.email, password: props.password };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmitLoginData(e, propsData);
  };

  return (
    <button
      className={`border-1 m-2${props.className || ""}`}
      value={"Sign In"}
      onClick={() => handleSubmit}
    >
      Sign In
    </button>
  );
}
