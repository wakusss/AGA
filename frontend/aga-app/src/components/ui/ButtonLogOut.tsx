import { useAuthStore } from "@/stores/authStore";

export default function ButtonLogOut() {
  const { logout } = useAuthStore();

  return (
    <>
      <button onClick={logout}>Log Out</button>
    </>
  );
}
