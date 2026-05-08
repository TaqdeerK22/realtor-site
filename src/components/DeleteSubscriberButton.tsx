"use client";

import { useRouter } from "next/navigation";

export default function DeleteSubscriberButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Delete this subscriber?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/subscribers/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete subscriber.");
    }
  }

  return (
    <button className="site-button site-button-danger site-button-small"
    >
      Delete
    </button>
  );
}
