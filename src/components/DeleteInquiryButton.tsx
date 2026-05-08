"use client";

import { useRouter } from "next/navigation";

export default function DeleteInquiryButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Delete this inquiry?");

    if (!confirmDelete) return;

    const res = await fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete inquiry.");
    }
  }

  return (
    <button className="site-button site-button-danger site-button-small"
    >
      Delete Inquiry
    </button>
  );
}
