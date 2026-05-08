"use client";

import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";

export default function RecentlyViewedClient() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    async function loadViewed() {
      const ids = JSON.parse(
        localStorage.getItem("recentlyViewed") || "[]"
      );

      const res = await fetch("/api/listings/saved", {
        method: "POST",
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();
      setListings(data.listings);
    }

    loadViewed();
  }, []);

  if (listings.length === 0) {
    return <p>No recently viewed listings.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
