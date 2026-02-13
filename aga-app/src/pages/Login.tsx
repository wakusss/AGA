import React from "react";
import InputEmail from "../components/login/InputEmail";
import InputPassword from "../components/login/InputPassword";
import InputSignIn from "../components/login/InputSignIn";
import InputSignUp from "../components/login/InputSignUp";

import "./Login.css";
function Login() {
  return (
    <>
      <div className="form">
        <InputEmail />
        <InputPassword />
        <div className="buttons">
          <InputSignIn />
          <InputSignUp />
        </div>
      </div>
    </>
  );
}

export default Login;
