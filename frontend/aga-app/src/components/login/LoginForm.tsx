import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputEmail from "../../components/ui/InputEmail";
import InputPassword from "../../components/ui/InputPassword";
import ButtonSignIn from "../ui/ButtonSignIn";
import ErrorMessage from "../widgets/ErrorMessage";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const navigate = useNavigate();

  const handleError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 5000);
  };

  const handleSuccess = () => {
    setErrorMsg(null);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/profile", { replace: true });
    }, 1500);
  };

  return (
    <>
      <img
        src="../../src/assets/logo.jpg"
        alt="AGA Chat Logo"
        className="h-10 sm:h-14 lg:h-auto w-auto object-contain shrink-0 max-w-[220px]"
      />
      <form>
        <InputEmail email={email} setEmail={setEmail} />
        <InputPassword password={password} setPassword={setPassword} />
        <ButtonSignIn
          email={email}
          password={password}
          isLoading={isLoading}
          setError={handleError}
          setLoading={setIsLoading}
          setSuccess={handleSuccess}
        />
      </form>
      {errorMsg && <ErrorMessage message={errorMsg} type="error" />}
      {isSuccess && (
        <ErrorMessage message={"Sign In completed!"} type="success" />
      )}
    </>
  );
}
