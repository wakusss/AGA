import InputEmail from "../components/ui/InputEmail";
import InputPassword from "../components/ui/InputPassword";

import "./Login.css";
function Login() {
  return (
    <>
      <div className="form">
        <InputEmail />
        <InputPassword />
        <div className="buttons"></div>
      </div>
    </>
  );
}

export default Login;
