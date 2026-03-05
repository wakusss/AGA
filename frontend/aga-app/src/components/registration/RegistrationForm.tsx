import { useState } from "react";
import { validateEmail, validatePassword } from "../../lib/validation";
import InputLogin from "../ui/InputLogin";
import InputPassword from "../ui/InputPassword";
import InputConfirmPassword from "../ui/InputConfirmPassword";
import InputEmail from "../ui/InputEmail";
import ButtonSignUp from "../ui/ButtonSignUp";
import ErrorMessage from "../widgets/ErrorMessage";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { handleSubmitRegisterData } from "@/lib/utils";
import logoSrc from "@/assets/logo.jpg";

export default function RegistrationForm() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  // Validate form and show error notifications if needed
  const validateForm = (): boolean => {
    // Email checks
    if (!formData.email?.trim()) {
      setErrorMsg("Please enter your email");
      return false;
    }
    if (!validateEmail(formData.email)) {
      setErrorMsg("Invalid email format");
      return false;
    }

    // Password checks
    if (!formData.password) {
      setErrorMsg("Please enter a password");
      return false;
    }
    if (!validatePassword(formData.password)) {
      setErrorMsg("Password must be at least 8 characters");

      return false;
    }

    // Confirm password checks
    if (!formData.confirmPassword) {
      setErrorMsg("Please confirm your password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;
    if (errorMsg) handleError(errorMsg);

    handleSubmitRegisterData({
      formData,
      onError: handleError,
      onLoading: setIsLoading,
      onSuccess: handleSuccess,
    });
  };

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

  const setField = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <img
        src={logoSrc}
        alt="AGA Chat Logo"
        className="h-10 sm:h-14 lg:h-auto w-auto object-contain shrink-0 max-w-[220px]"
      />
      <InputLogin login={formData.userName} setLogin={setField("userName")} />
      <InputPassword
        password={formData.password}
        setPassword={setField("password")}
      />
      <InputConfirmPassword
        confirmPassword={formData.confirmPassword}
        setConfirmPassword={setField("confirmPassword")}
        passwordValue={formData.password}
      />
      <InputEmail email={formData.email} setEmail={setField("email")} />
      <ButtonSignUp
        formData={formData}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isError={!!errorMsg}
        isSuccess={isSuccess}
        setLoading={setIsLoading}
        setError={handleError}
        setSuccess={handleSuccess}
      />
      {errorMsg && <ErrorMessage message={errorMsg} type="error" />}
      {isSuccess && (
        <ErrorMessage message={"Sign Up completed!"} type="success" />
      )}
    </>
  );
}
