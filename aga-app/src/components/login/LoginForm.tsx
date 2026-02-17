import { useState } from "react";

import InputEmail from "../../components/ui/InputEmail";
import InputPassword from "../../components/ui/InputPassword";
import ButtonSignIn from "../ui/ButtonSignIn";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className=""></div>
      <div>
        <p>Sign In</p>
        <InputEmail email={email} setEmail={setEmail} />
        <InputPassword password={password} setPassword={setPassword} />
        <ButtonSignIn email={email} password={password} />
      </div>
    </>
  );
}
