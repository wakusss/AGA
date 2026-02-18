import React from "react";
import "./Input.css";

interface Props {
  value: string;
  updateField: (fieldName: string, value: string) => void;
}
function InputLastName({ value, updateField }: Props) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => updateField("SecondName", e.target.value)}
        placeholder="Last Name"
        className="inputLastName"
        autoComplete="family-name"
        required
      ></input>
    </>
  );
}

export default InputLastName;
