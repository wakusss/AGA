interface SignInButtonProps {
  className?: string;
  email?: string;
  password?: string;
}

export default function ButtonSignIn(props: SignInButtonProps) {
  function handleClick() {
    console.log(props.email + " " + props.password);
  }

  return (
    <button
      className={`border-1 m-2${props.className || ""}`}
      value={"Sign In"}
      onClick={handleClick}
    >
      Sign In
    </button>
  );
}
