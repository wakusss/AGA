interface InputEmailProps {
  className?: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputPassword(props: InputEmailProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setPassword(event.target.value);
  }

  return (
    <>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        placeholder="Password"
        className={`${props.className || ""}`}
        onChange={handleChange}
        value={props.password}
      ></input>
    </>
  );
}
