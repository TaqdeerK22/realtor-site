"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleSamePageClick(href: string) {
    if (pathname === href) {
      router.refresh();
      window.location.reload();
    }
  }

  return (
    <nav
      className="nav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "22px 6vw",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        onClick={() => handleSamePageClick("/")}
        style={{
          fontSize: "32px",
          fontWeight: 700,
          letterSpacing: "1px",
          color: "#683B2B",
          fontFamily: "var(--font-serif)",
        }}
      >
        Lovepreet Realty
      </Link>

      <div style={{ display: "flex", gap: "26px", alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/" onClick={() => handleSamePageClick("/")}>Home</Link>
        <Link href="/listings" onClick={() => handleSamePageClick("/listings")}>Properties</Link>
        <Link href="/about" onClick={() => handleSamePageClick("/about")}>About</Link>
        <Link href="/testimonials" onClick={() => handleSamePageClick("/testimonials")}>Testimonials</Link>
        <Link href="/contact" onClick={() => handleSamePageClick("/contact")}>Contact</Link>

        <Link
          href="/login"
          onClick={() => handleSamePageClick("/login")}
          className="site-button site-button-secondary"
        >
          Realtor Login
        </Link>
      </div>
    </nav>
  );
}
