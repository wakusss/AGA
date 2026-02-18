import { useState } from "react";

import InputEmail from "../../components/ui/InputEmail";
import InputPassword from "../../components/ui/InputPassword";
import ButtonSignIn from "../ui/ButtonSignIn";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <img
        src="../../src/assets/logo.jpg"
        alt="AGA Chat Logo"
        className="h-10 sm:h-14 lg:h-auto w-auto object-contain shrink-0 max-w-[220px]"
      />
      <InputEmail email={email} setEmail={setEmail} />
      <InputPassword password={password} setPassword={setPassword} />
      <ButtonSignIn email={email} password={password} />
    </>
  );
}
