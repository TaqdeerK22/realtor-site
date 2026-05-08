import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <h1>About Your Realtor</h1>

        <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
          I help buyers, sellers, and investors find the right property across British Columbia.
          My goal is to make real estate simple, honest, and stress-free.
        </p>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "30px" }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <h2>Buyers</h2>
            <p>Personalized property searches, market guidance, and offer support.</p>
          </div>

          <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <h2>Sellers</h2>
            <p>Listing strategy, pricing advice, marketing, and negotiation support.</p>
          </div>

          <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <h2>Investors</h2>
            <p>Help finding strong opportunities with long-term value.</p>
          </div>
        </section>

        <Link href="/contact">
          <button style={{ marginTop: "30px", padding: "14px 24px", background: "black", color: "white" }}>
            Contact Me
          </button>
        </Link>
      </main>
    </>
  );
}
