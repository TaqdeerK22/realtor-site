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
        padding: "18px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        flexWrap: "wrap",
        gap: "18px",
      }}
    >
      <Link href="/" style={{ fontWeight: "bold", fontSize: "26px", letterSpacing: "1px" }}>
        Lovepreet Realty
      </Link>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search city..."
          style={{ padding: "10px 14px", borderRadius: "999px", border: "1px solid #ddd" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 18px",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "999px",
          }}
        >
          Search
        </button>
      </form>

      <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", fontSize: "15px" }}>
        <Link href="/">Home</Link>
        <Link href="/listings">Properties</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/testimonial">Testimonial</Link>
        <Link href="/login">Realtor Login</Link>
      </div>
    </nav>
  );
}
