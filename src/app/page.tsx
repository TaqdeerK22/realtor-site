import Navbar from "../components/Navbar";
import SubscribeForm from "../components/SubscribeForm";
import ListingCard from "../components/ListingCard";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import Testimonials from "../components/Testimonials";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredListings = await prisma.listing.findMany({
    where: { status: "active" },
    orderBy: { views: "desc" },
    take: 6,
  });

  return (
    <>
      <Navbar />

      <main>
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            padding: "0 7vw",
            background: "#FAF6F2",
          }}
        >
          <div className="hero-bg" />

          <img
            className="floaty"
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            alt="Luxury home"
            style={{
              position: "absolute",
              right: "7%",
              top: "18%",
              width: "360px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "34px",
              boxShadow: "0 25px 60px rgba(104,59,43,0.22)",
            }}
          />

          <img
            className="drift"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Modern home"
            style={{
              position: "absolute",
              right: "20%",
              bottom: "15%",
              width: "260px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "28px",
              boxShadow: "0 20px 45px rgba(104,59,43,0.2)",
            }}
          />

          <div
            className="fade-up"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "760px",
            }}
          >
            <p style={{ letterSpacing: "4px", textTransform: "uppercase", color: "#B08401", fontWeight: 700 }}>
              Find Your Place
            </p>

            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(64px,9vw,120px)",
                lineHeight: "0.92",
                margin: "10px 0 24px",
                color: "#683B2B",
              }}
            >
              Belonging has
              <br />
              <span style={{ color: "#D49E8D" }}>a doorstep.</span>
            </h1>

            <p style={{ fontSize: "24px", lineHeight: "1.7", maxWidth: "620px", color: "#4d3c36", marginBottom: "36px" }}>
              Real estate is more than a transaction — it’s the start of your next chapter.
            </p>

            <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
              <Link href="/listings">
                <button className="site-button site-button-primary">Explore Properties</button>
              </Link>

              <Link href="/contact">
                <button style={{ padding: "16px 32px", borderRadius: "999px", background: "#683B2B", color: "white", fontWeight: 700 }}>
                  Schedule Consultation
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="card fade-up" style={{ maxWidth: "1100px", margin: "0 auto", padding: "42px", textAlign: "center" }}>
            <h2 style={{ fontSize: "44px", color: "#683B2B" }}>Your Trusted BC Real Estate Partner</h2>
            <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#5b4a43" }}>
              Helping buyers, sellers, and investors move confidently through the real estate process with honest guidance and modern tools.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "#DED1BD" }}>
          <h2 style={{ textAlign: "center", fontSize: "42px", color: "#683B2B" }}>
            Buying or Selling?
          </h2>

          <div style={{ maxWidth: "1100px", margin: "30px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            <div className="card hover-lift" style={{ padding: "34px" }}>
              <h2>Buying a Home</h2>
              <p>Search listings, compare options, and ask questions before making your move.</p>
              <Link href="/listings" style={{ color: "#B08401", fontWeight: "bold" }}>Browse Listings →</Link>
            </div>

            <div className="card hover-lift" style={{ padding: "34px" }}>
              <h2>Selling Your Home</h2>
              <p>Get support with pricing, marketing, negotiation, and preparing your home for sale.</p>
              <Link href="/contact" style={{ color: "#B08401", fontWeight: "bold" }}>Contact Realtor →</Link>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <h2 style={{ textAlign: "center", fontSize: "42px", color: "#683B2B" }}>
            Featured Properties
          </h2>

          {featuredListings.length === 0 && (
            <p style={{ textAlign: "center" }}>No featured listings yet.</p>
          )}

          <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <Testimonials />

        <section className="section-padding" style={{ background: "linear-gradient(135deg, #683B2B, #D49E8D)", color: "white", textAlign: "center" }}>
          <SubscribeForm />
        </section>
      </main>

    </>
  );
}
