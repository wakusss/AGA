import React, { useState } from "react";

import "./Input.css";

interface Props {
  value: string;
  updateField: (fieldName: string, value: string) => void;
}

export default function InputEmail({ value, updateField }: Props) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValid = value === "" || emailRegex.test(value);

  return (
    <>
      <input
        type="email"
        value={value}
        onChange={(e) => updateField("Email", e.target.value)}
        placeholder="Email"
        className={`inputEmail ${!isValid && value ? "invalid" : ""}`}
        autoComplete="email"
        required
      />
      {!isValid && value && (
        <span className="error-message">Invalid email</span>
      )}
    </>
  );
}
