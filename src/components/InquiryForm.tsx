"use client";

import { useState } from "react";

export default function InquiryForm({
  listingId,
}: {
  listingId: string;
}) {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      listingId,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/inquiry", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("Inquiry saved successfully!");
      form.reset();
    } else {
      setStatus("Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}>
      <h2>Interested in this property?</h2>

      <input name="name" required placeholder="Your Name" style={{ padding: "12px" }} />
      <input name="email" required type="email" placeholder="Your Email" style={{ padding: "12px" }} />
      <input name="phone" required placeholder="Phone Number" style={{ padding: "12px" }} />
      <textarea name="message" placeholder="Message" rows={5} style={{ padding: "12px" }} />

      <button type="submit" style={{ padding: "14px", background: "black", color: "white", border: "none", borderRadius: "8px" }}>
        Send Inquiry
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
