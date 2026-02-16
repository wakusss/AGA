interface InputEmailProps {
  className?: string;
}

export default function Input(props: InputEmailProps) {
  return (
    <>
      <input
        type="email"
        placeholder="Email"
        className={`${props.className || ""}`}
      ></input>
    </>
  );
}
