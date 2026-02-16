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
          className="text-[var(--color-text-primary-light-mode)] "
        >
          Email:
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className={`${props.className || ""}`}
          onChange={handleChange}
          value={props.email}
        ></input>
      </div>
    </>
  );
}
