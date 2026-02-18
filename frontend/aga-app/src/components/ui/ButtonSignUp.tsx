interface SignUpButtonProps {
  className?: string;
}

export default function ButtonSignUp(props: SignUpButtonProps) {
  return (
    <button className={`${props.className || ""}`} value={"Sign Up"}>
      Sign Up
    </button>
  );
}
