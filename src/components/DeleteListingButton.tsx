"use client";

import { useRouter } from "next/navigation";

export default function DeleteListingButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this listing?");

    if (!confirmDelete) return;

    const res = await fetch(`/api/listings/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete listing.");
    }
  }

  return (
    <button className="site-button site-button-danger site-button-small"
    >
      Delete
    </button>
  );
}
