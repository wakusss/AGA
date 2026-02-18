import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSubmitLoginData = async (
  e: { preventDefault: () => void },
  props: {
    email?: string;
    password?: string;
  },
) => {
  e.preventDefault();

  const data = {
    email: props.email,
    password: props.password,
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ? `Ошибка ${response.status}` : "Сетевая ошибка",
      );
    }
    const result = await response.json();
    console.log("Ответ сервера:", result);
  } catch (err) {
    console.error(err);
  }
};
