interface SignInButtonProps {
  className?: string;
}

export default function ButtonSignIn(props: SignInButtonProps) {
  return (
    <button className={`${props.className || ""}`} value={"Sign In"}>
      Sign In
    </button>
  );
}
