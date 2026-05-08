import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="nav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "22px 6vw",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "32px",
          fontWeight: 700,
          letterSpacing: "2px",
          color: "#683B2B",
          fontFamily: "var(--font-serif)",
        }}
      >
        LR
      </Link>

      <div
        style={{
          display: "flex",
          gap: "34px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/listings">Properties</Link>
        <Link href="/about">About</Link>
        <Link href="/testimonials">Testimonials</Link>
        <Link href="/contact">Contact</Link>

        <Link href="/login">
          <button className="site-button site-button-secondary"
          >
            Realtor Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
