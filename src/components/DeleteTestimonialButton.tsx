"use client";

import { useRouter } from "next/navigation";

export default function DeleteTestimonialButton({ id }: { id: string }) {
  const router = useRouter();

  async function remove() {
    if (!confirm("Delete this testimonial?")) return;

    const res = await fetch(`/api/testimonials/${id}`, {
      method: "DELETE",
    });

    if (res.ok) router.refresh();
    else alert("Failed to delete testimonial.");
  }

  return <button onClick={remove}>Delete</button>;
}
