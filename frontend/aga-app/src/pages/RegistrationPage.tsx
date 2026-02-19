import { useState } from "react";
import { validateEmail, validatePassword } from "../lib/validation";
import ErrorMessage from "../components/widgets/ErrorMessage";
import RegistrationForm from "../components/registration/RegistrationForm";

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

    // Optional: clear form after success
    // setFormData({ Name: "", SecondName: "", Login: "", Password: "", ConfirmPassword: "", Email: "" });
  };

  return (
    <div className="register-container">
      <RegistrationForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      {/* Toast notification using existing ErrorMessage component */}
      {notification && (
        <div className="toast-wrapper">
          <ErrorMessage
            message={notification.message}
            type={notification.type}
          />
        </div>
      )}
    </div>
  );
}

export default Register;
