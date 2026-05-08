"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
      }),
    });

    if (res.ok) {
      setStatus("Subscribed successfully!");
      form.reset();
    } else {
      setStatus("Subscription failed or email already exists.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <h2>Get New Listing Alerts</h2>

      <input
        name="email"
        type="email"
        required
        placeholder="Enter your email"
        style={{ padding: "12px", width: "300px", marginRight: "10px" }}
      />

      <button type="submit" style={{ padding: "12px 20px" }}>
        Subscribe
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
