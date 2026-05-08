"use client";

import { useEffect, useState } from "react";

export default function SaveListingButton({ id }: { id: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedListings = JSON.parse(
      localStorage.getItem("savedListings") || "[]"
    );

    setSaved(savedListings.includes(id));
  }, [id]);

  function toggleSave() {
    let savedListings = JSON.parse(
      localStorage.getItem("savedListings") || "[]"
    );

    if (saved) {
      savedListings = savedListings.filter((listingId: string) => listingId !== id);
    } else {
      savedListings.push(id);
    }

    localStorage.setItem("savedListings", JSON.stringify(savedListings));
    setSaved(!saved);
  }

  return (
    <button
      onClick={toggleSave}
      style={{
        padding: "10px 16px",
        background: saved ? "green" : "black",
        color: "white",
        border: "none",
        borderRadius: "8px",
      }}
    >
      {saved ? "Saved" : "Save Listing"}
    </button>
  );
}
