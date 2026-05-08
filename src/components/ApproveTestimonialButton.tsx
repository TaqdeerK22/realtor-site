"use client";

import { useRouter } from "next/navigation";

export default function ApproveTestimonialButton({ id }: { id: string }) {
  const router = useRouter();

  async function approve() {
    const res = await fetch(`/api/testimonials/${id}/approve`, {
      method: "PUT",
    });

    if (res.ok) router.refresh();
    else alert("Failed to approve testimonial.");
  }

  return <button onClick={approve}>Approve</button>;
}
