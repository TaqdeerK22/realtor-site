"use client";

import { useRouter } from "next/navigation";

export default function ToggleListingStatusButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();

  async function toggleStatus() {
    const newStatus = status === "active" ? "suspended" : "active";

    const res = await fetch(`/api/listings/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update status.");
    }
  }

  return (
    <button onClick={toggleStatus}>
      {status === "active" ? "Suspend" : "Activate"}
    </button>
  );
}
