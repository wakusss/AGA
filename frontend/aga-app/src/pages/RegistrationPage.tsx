import { useState } from "react";
import { validateEmail, validatePassword } from "../lib/validation";
import ErrorMessage from "../components/widgets/ErrorMessage";
import RegistrationForm from "../components/registration/RegistrationForm";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

function Register() {
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    secondName: "",
    login: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  // Notification state (toast message)
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  // Show notification (toast) and auto-hide after 4 seconds
  const showNotification = (
    message: string,
    type: "error" | "success" = "error",
  ) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Validate form and show error notifications if needed
  const validateForm = (): boolean => {
    // Email checks
    if (!formData.email?.trim()) {
      showNotification("Please enter your email");
      return false;
    }
    if (!validateEmail(formData.email)) {
      showNotification("Invalid email format");
      return false;
    }

    // Password checks
    if (!formData.password) {
      showNotification("Please enter a password");
      return false;
    }
    if (!validatePassword(formData.password)) {
      showNotification("Password must be at least 8 characters");
      return false;
    }

    // Confirm password checks
    if (!formData.confirmPassword) {
      showNotification("Please confirm your password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showNotification("Passwords do not match");
      return false;
    }

    // You can add validation for other fields here if needed
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log("Submitting form:", formData);
    showNotification("Registration successful!", "success");
  };

  return (
    <main className="flex">
      <div className="w-2/3 relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <StarsBackground />
        </div>
        <div className="min-h-screen flex flex-col justify-center items-center relative text-center ">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary-light-mode)] tracking-tight">
            Welcome to AGAChat
          </h1>
          <p className="mt-3 text-lg text-[var(--color-text-primary-light-mode)] max-w-md z-index-30">
            A place to talk openly with people from other countries. No borders,
            no judgment — just real conversations.
          </p>
        </div>
      </div>
      <div className="w-1/3 min-h-screen flex flex-col justify-center items-center">
        <RegistrationForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
        <div>
          <a
            href="/signin"
            className="text-[var(--color-primary-light-mode)] active:brightness-90 hover:brightness-110 hover:saturate-125 transition-all duration-150"
          >
            You already have an account?
          </a>
        </div>
      </div>
      {/* Toast notification using existing ErrorMessage component */}
      {notification && (
        <div className="toast-wrapper">
          <ErrorMessage
            message={notification.message}
            type={notification.type}
          />
        </div>
      )}
    </main>
  );
}

export default Register;
