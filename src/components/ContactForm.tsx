"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/inquiry", {
      method: "POST",
      body: JSON.stringify({
        listingId: null,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
      }),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      form.reset();
    } else {
      setStatus("Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input name="name" required placeholder="Your Name" style={{ padding: "12px" }} />
      <input name="email" required type="email" placeholder="Your Email" style={{ padding: "12px" }} />
      <input name="phone" required placeholder="Phone Number" style={{ padding: "12px" }} />
      <textarea name="message" required placeholder="Message" rows={6} style={{ padding: "12px" }} />

      <button type="submit" style={{ padding: "14px", background: "black", color: "white" }}>
        Send Message
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
