import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputEmail from "../../components/ui/InputEmail";
import InputPassword from "../../components/ui/InputPassword";
import ButtonSignIn from "../ui/ButtonSignIn";
import ErrorMessage from "../widgets/ErrorMessage";
import { useAuthStore } from "@/stores/authStore";
import logoSrc from "@/assets/logo.jpg";

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
    useAuthStore.getState().checkAuth();
    setSuccess(true);

    setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 1000);
  };

  return (
    <>
      <img
        src={logoSrc}
        alt="AGA Chat Logo"
        className="h-10 sm:h-14 lg:h-auto w-auto object-contain shrink-0 max-w-[220px]"
      />
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
      {errorMsg && <ErrorMessage message={errorMsg} type="error" />}
      {isSuccess && (
        <ErrorMessage message={"Sign In completed!"} type="success" />
      )}
    </>
  );
}
