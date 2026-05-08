"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");

    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      router.push("/dashboard");
    } else {
      setError("Wrong password.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
        type="password"
        name="password"
        placeholder="Enter admin password"
        required
        style={{ padding: "12px" }}
      />

      <button type="submit" style={{ padding: "14px", background: "black", color: "white" }}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
