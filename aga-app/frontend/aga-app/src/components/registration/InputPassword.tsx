import React from "react";
import "./Input.css";
interface Props {
  value: string;
  updateField: (fieldName: string, value: string) => void;
}
const passwordRegex = /^.{8,}$/;

function isValidPassword(pwd: string): boolean {
  return passwordRegex.test(pwd);
}
function InputPassword({ value, updateField }: Props) {
  return (
    <>
      <input
        type="password"
        value={value}
        onChange={(e) => updateField("Password", e.target.value)}
        placeholder="Password"
        className="inputPassword"
        autoComplete="new-password"
        required
      ></input>
      {!isValidPassword(value) && value !== "" && (
        <span className="error-message">
          Password must be at least 8 characters
        </span>
      )}
    </>
  );
}

export default InputPassword;
