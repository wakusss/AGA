import React from "react";
import "./Input.css";
interface Props {
  value: string;
  updateField: (fieldName: string, value: string) => void;
  passwordValue: string;
}

export default function InputConfirmPassword({
  value,
  updateField,
  passwordValue,
}: Props) {
  const isMismatch =
    value !== "" && passwordValue !== "" && value !== passwordValue;

  return (
    <div className="input-wrapper">
      <input
        type="password"
        value={value}
        onChange={(e) => updateField("ConfirmPassword", e.target.value)}
        placeholder="Confirm Password"
        className={`inputPassword ${isMismatch ? "invalid" : ""}`}
        autoComplete="new-password"
        required
      />
    </div>
  );
}
