"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 16px",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "6px",
      }}
    >
      Logout
    </button>
  );
}
