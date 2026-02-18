import { useState } from "react";
import InputEmail from "../components/registration/InputEmail";
import InputPassword from "../components/registration/InputPassword";
import InputName from "../components/registration/InputName";
import InputLastName from "../components/registration/InputLastName";
import InputLogin from "../components/registration/InputLogin";
import InputConfirmPassword from "../components/registration/InputConfirmPassword";
import { validateEmail, validatePassword } from "../utils/util";
import ErrorMessage from "../components/widgets/ErrorMessage";

import "./Register.css";

function Register() {
  // Form data state
  const [formData, setFormData] = useState({
    Name: "",
    SecondName: "",
    Login: "",
    Password: "",
    ConfirmPassword: "",
    Email: "",
  });

  // Notification state (toast message)
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  // Helper to update any form field
  const updateField = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };
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
    if (!formData.Email?.trim()) {
      showNotification("Please enter your email");
      return false;
    }
    if (!validateEmail(formData.Email)) {
      showNotification("Invalid email format");
      return false;
    }

    // Password checks
    if (!formData.Password) {
      showNotification("Please enter a password");
      return false;
    }
    if (!validatePassword(formData.Password)) {
      showNotification("Password must be at least 8 characters");
      return false;
    }

    // Confirm password checks
    if (!formData.ConfirmPassword) {
      showNotification("Please confirm your password");
      return false;
    }
    if (formData.Password !== formData.ConfirmPassword) {
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
      <form className="register-form">
        <h2>Sign Up</h2>

        <InputName updateField={updateField} value={formData.Name} />
        <InputLastName updateField={updateField} value={formData.SecondName} />
        <InputLogin updateField={updateField} value={formData.Login} />

        <InputPassword updateField={updateField} value={formData.Password} />

        <InputConfirmPassword
          value={formData.ConfirmPassword}
          updateField={updateField}
          passwordValue={formData.Password}
        />

        <InputEmail updateField={updateField} value={formData.Email} />

        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>

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
