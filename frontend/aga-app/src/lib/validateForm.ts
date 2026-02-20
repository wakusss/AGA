// import ErrorMessage from "../components/widgets/ErrorMessage";
// import { validateEmail, validatePassword } from "./validation";

// interface FormData {
//   name: string;
//   secondName: string;
//   login: string;
//   password: string;
//   confirmPassword: string;
//   email: string;
// }

// interface ValidationResult {
//   setNotification: (value: string) => void;
// }

// const showNotification = (
//   message: string,
//   type: "error" | "success" = "error",
// ) => {
//   setNotification({ message, type });

//   setTimeout(() => {
//     setNotification(null);
//   }, 4000);
// };

// export default function validateForm(
//   formData: FormData,
//   setNotification: (value: string) => void,
// ) {
//   // Email checks
//   if (!formData.email?.trim()) {
//     showNotification("Please enter your email");
//     return false;
//   }
//   if (!validateEmail(formData.email)) {
//     showNotification("Invalid email format");
//     return false;
//   }

//   // Password checks
//   if (!formData.password) {
//     showNotification("Please enter a password");
//     return false;
//   }
//   if (!validatePassword(formData.password)) {
//     showNotification("Password must be at least 8 characters");
//     return false;
//   }

//   // Confirm password checks
//   if (!formData.confirmPassword) {
//     showNotification("Please confirm your password");
//     return false;
//   }
//   if (formData.password !== formData.confirmPassword) {
//     showNotification("Passwords do not match");
//     return false;
//   }

//   // You can add validation for other fields here if needed
//   return true;
// }
