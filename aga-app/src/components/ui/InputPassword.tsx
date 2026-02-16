interface InputEmailProps {
  className?: string;
}

export default function InputPassword(props: InputEmailProps) {
  return (
    <>
      <input
        type="password"
        placeholder="Password"
        className={`${props.className || ""}`}
      ></input>
    </>
  );
}
