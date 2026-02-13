import React from "react";
import "./Input.css";
function SignUp() {
  return alert("Sign In is clicked");
}

function InputSignUp({}) {
  return (
    <>
      <label htmlFor="Sign Up"></label>
      <input
        type="button"
        name="Sign Up"
        value="Sign Up"
        onClick={SignUp}
        className="inputSignUp"
      ></input>
    </>
  );
}

export default InputSignUp;
