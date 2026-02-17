import { useState } from "react";

interface InputEmailProps {
  className?: string;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input(props: InputEmailProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setEmail(event.target.value);
  }

  return (
    <>
      <div className="grid grid-cols-1">
        <label
          htmlFor="email"
          className="text-[var(--color-text-primary-light-mode)] text-xl tracking-wide font-medium ml-2"
        >
          Email:
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className={`md:w-60 rounded-lg m-2 p-3 placeholder:italic text-base tracking-wide text-[var(--color-text-primary-light-mode)] placeholder:text-[var(--color-primary-light-mode)]/35 border-[1.5px] border-[var(--color-primary-light-mode)] focus:outline-none active:brightness-90 hover:brightness-130 hover:saturate-125 transition-all duration-150 ${props.className || ""}`}
          onChange={handleChange}
          value={props.email}
        ></input>
      </div>
    </>
  );
}
