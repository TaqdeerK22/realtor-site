"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Wrong password.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
        type="password"
        name="password"
        placeholder="Enter realtor admin password"
        required
        style={{ padding: "12px" }}
      />

      <button type="submit" style={{ padding: "14px", background: "black", color: "white" }}>
        Realtor Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
