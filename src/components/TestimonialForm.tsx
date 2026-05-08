"use client";

import { useState } from "react";

export default function TestimonialForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/testimonials", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        message: formData.get("message"),
      }),
    });

    if (res.ok) {
      setStatus("Thanks! Your testimonial was submitted for review.");
      form.reset();
    } else {
      setStatus("Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input name="name" placeholder="Your Name" required style={{ padding: "12px" }} />
      <textarea name="message" placeholder="Your Testimonial" required rows={6} style={{ padding: "12px" }} />

      <button type="submit" style={{ padding: "14px", background: "black", color: "white" }}>
        Submit Testimonial
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
