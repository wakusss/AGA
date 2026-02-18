import React from "react";
import "./Input.css";

interface Props {
  value: string;
  updateField: (fieldName: string, value: string) => void;
}

function InputLogin({ value, updateField }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => updateField("Login", e.target.value)}
      placeholder="Login"
      className="inputLogin"
      autoComplete="username"
      required
    ></input>
  );
}

export default InputLogin;
