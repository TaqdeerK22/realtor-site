"use client";

import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import RemoveSavedButton from "./RemoveSavedButton";

export default function SavedListingsClient() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    async function loadSaved() {
      const ids = JSON.parse(localStorage.getItem("savedListings") || "[]");

      const res = await fetch("/api/listings/saved", {
        method: "POST",
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();
      setListings(data.listings);
    }

    loadSaved();
  }, []);

  function handleRemove(id: string) {
    setListings((current) => current.filter((listing) => listing.id !== id));
  }

  if (listings.length === 0) {
    return <p>No saved listings yet.</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
      {listings.map((listing) => (
        <div key={listing.id}>
          <ListingCard listing={listing} />
          <RemoveSavedButton id={listing.id} onRemove={handleRemove} />
        </div>
      ))}
    </div>
  );
}
