interface InputNameProps {
  className?: string;
  name: string;
  setName: (value: string) => void;
}

export default function InputName(props: InputNameProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setName(event.target.value);
  }

  return (
    <>
      <div className="grid grid-cols-1">
        <label
          htmlFor="name"
          className="text-[var(--color-text-primary-light-mode)] text-xl tracking-wide font-medium ml-2"
        >
          First Name:
        </label>
        <input
          type="text"
          value={props.name}
          onChange={handleChange}
          placeholder="First Name"
          className={`md:w-60 rounded-lg m-2 p-3 placeholder:italic text-base tracking-wide text-[var(--color-text-primary-light-mode)] placeholder:text-[var(--color-primary-light-mode)]/35 border-[1.5px] border-[var(--color-primary-light-mode)] focus:outline-none active:brightness-90 hover:brightness-130 hover:saturate-125 transition-all duration-150 shadow-lg ${props.className || ""}`}
          required
          autoComplete="given-name"
        />
      </div>
    </>
  );
}
