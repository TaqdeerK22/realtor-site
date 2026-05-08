"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    router.push(`/listings?location=${encodeURIComponent(search)}`);
  }

  return (
    <nav
      style={{
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        gap: "20px",
      }}
    >
      <Link href="/" style={{ fontWeight: "bold", fontSize: "24px" }}>
        RealtorSite
      </Link>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search location..."
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Search
        </button>
      </form>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link href="/">Home</Link>
        <Link href="/listings">Listings</Link>
        <Link href="/saved">Saved</Link>
        <Link href="/recently-viewed">Recently Viewed</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/testimonial">Testimonial</Link>
        <Link href="/login">Realtor Login</Link>
      </div>
    </nav>
  );
}
