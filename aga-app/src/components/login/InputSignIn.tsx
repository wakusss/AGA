import React from "react";
import "./Input.css";
function SignIn() {
  return alert("Sign In is clicked");
}
function InputSignIn() {
  return (
    <>
      <label htmlFor="Sign In"></label>
      <input
        type="button"
        name="Sign In"
        value="Sign In"
        onClick={SignIn}
        className="inputSignIn"
      ></input>
    </>
  );
}

export default InputSignIn;
