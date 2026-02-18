// components/widgets/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
  type?: "error" | "success" | "info"; // если есть поддержка разных типов
}

export default function ErrorMessage({
  message,
  type = "error",
}: ErrorMessageProps) {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "#2a9d8f"
      : type === "info"
        ? "#0288d1"
        : /* error */ "#e63946";

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: "white",
        padding: "12px 20px",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        minWidth: "260px",
        maxWidth: "380px",
      }}
    >
      {type === "success" ? "✅" : "⚠️"} {message}
    </div>
  );
}
