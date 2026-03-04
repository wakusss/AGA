import { useAuthStore } from "@/stores/authStore";

export default function ButtonLogOut() {
  const { logout } = useAuthStore();

  return (
    <>
      <button
        onClick={logout}
        className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Log Out
      </button>
    </>
  );
}
