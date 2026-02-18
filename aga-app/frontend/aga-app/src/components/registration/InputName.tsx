import React from "react";
import "./Input.css";

interface Props {
  value: string;
  updateField: (fieldName: string, value: string) => void;
}

export default function InputName({ value, updateField }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => updateField("Name", e.target.value)}
      placeholder="First Name"
      className="inputName"
      required
      autoComplete="given-name"
    />
  );
}
