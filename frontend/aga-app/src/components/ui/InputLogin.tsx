interface InputLoginProps {
  className?: string;
  login: string;
  setLogin: (value: string) => void;
}

export default function InputLogin(props: InputLoginProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setLogin(event.target.value);
  }
  return (
    <>
      <div className="grid grid-cols-1">
        <label
          htmlFor="login"
          className="text-[var(--color-text-primary-light-mode)] text-xl tracking-wide font-medium ml-2"
        >
          Login:
        </label>
        <input
          type="text"
          value={props.login}
          onChange={handleChange}
          placeholder="Login"
          className={`md:w-60 rounded-lg m-2 p-3 placeholder:italic text-base tracking-wide text-[var(--color-text-primary-light-mode)] placeholder:text-[var(--color-primary-light-mode)]/35 border-[1.5px] border-[var(--color-primary-light-mode)] focus:outline-none active:brightness-90 hover:brightness-130 hover:saturate-125 transition-all duration-150 shadow-lg ${props.className || ""}`}
          autoComplete="username"
          required
        ></input>
      </div>
    </>
  );
}
