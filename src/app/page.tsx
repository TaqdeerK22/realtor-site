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

  const cities = ["Victoria", "Vancouver", "Surrey", "Burnaby", "Langley", "Abbotsford"];

  return (
    <>
      <Navbar />

      <main className="page-motion">
        <section
          style={{
            minHeight: "86vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            padding: "70px 40px",
            background: "linear-gradient(135deg, #FAF6F2 0%, #DED1BD 48%, #D49E8D 100%)",
          }}
        >
          <div
            className="animate-zoom-bg"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 15% 30%, rgba(176,132,1,0.22), transparent 18%), radial-gradient(circle at 80% 20%, rgba(104,59,43,0.16), transparent 20%), radial-gradient(circle at 70% 85%, rgba(212,158,141,0.28), transparent 22%)",
              opacity: 0.9,
            }}
          />

          <div
            className="animate-fade-up"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "880px",
            }}
          >
            <p
              style={{
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#683B2B",
                fontWeight: "bold",
              }}
            >
              British Columbia Real Estate
            </p>

            <h1
              style={{
                fontSize: "clamp(52px, 8vw, 104px)",
                lineHeight: "0.98",
                margin: "18px 0",
                color: "#683B2B",
                fontFamily: "Georgia, serif",
              }}
            >
              Belonging has
              <br />
              <span style={{ color: "#D49E8D" }}>a doorstep.</span>
            </h1>

            <p
              style={{
                fontSize: "22px",
                lineHeight: "1.6",
                maxWidth: "620px",
                color: "#2b211d",
                marginBottom: "34px",
              }}
            >
              Real estate is more than a transaction — it is the beginning of your next chapter.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/listings">
                <button
                  className="animate-glow"
                  style={{
                    padding: "16px 34px",
                    background: "#B08401",
                    color: "white",
                    border: "none",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Explore Properties
                </button>
              </Link>

              <Link href="/contact">
                <button
                  style={{
                    padding: "16px 34px",
                    background: "#683B2B",
                    color: "white",
                    border: "none",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Contact Realtor
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 40px" }}>
          <div className="pretty-section animate-fade-up" style={{ maxWidth: "1100px", margin: "0 auto", padding: "42px", textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", color: "#683B2B", fontFamily: "Georgia, serif" }}>
              Your Trusted BC Real Estate Partner
            </h2>

            <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#5b4a43" }}>
              Whether you are buying your first home, selling your property, or exploring investment opportunities,
              this site helps you search listings, ask questions, and connect directly with your realtor.
            </p>
          </div>
        </section>

        <section style={{ padding: "60px 40px" }}>
          <h2 style={{ fontSize: "38px", textAlign: "center", color: "#683B2B", fontFamily: "Georgia, serif" }}>
            Search Popular Areas
          </h2>

          <div
            style={{
              marginTop: "28px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            {cities.map((city) => (
              <div
                key={city}
                className="card-hover pretty-section"
                style={{
                  padding: "26px",
                  background: "white",
                }}
              >
                <h3 style={{ color: "#683B2B" }}>{city}</h3>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", color: "#B08401" }}>
                  <Link href={`/listings?location=${city}&propertyType=House`}>House</Link>
                  <Link href={`/listings?location=${city}&propertyType=Townhouse`}>Townhouse</Link>
                  <Link href={`/listings?location=${city}&propertyType=Condo`}>Condo</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "60px 40px", background: "#DED1BD" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <div className="card-hover" style={{ padding: "34px", background: "#FAF6F2", borderRadius: "22px" }}>
              <h2 style={{ color: "#683B2B" }}>Buying a Home?</h2>
              <p>Find the property that fits your lifestyle and your future.</p>
              <Link href="/contact" style={{ color: "#B08401", fontWeight: "bold" }}>Ask a Buying Question →</Link>
            </div>

            <div className="card-hover" style={{ padding: "34px", background: "#FAF6F2", borderRadius: "22px" }}>
              <h2 style={{ color: "#683B2B" }}>Selling Your Home?</h2>
              <p>Get support with pricing, marketing, negotiation, and closing.</p>
              <Link href="/contact" style={{ color: "#B08401", fontWeight: "bold" }}>Request Seller Help →</Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 40px" }}>
          <h2 style={{ fontSize: "38px", textAlign: "center", color: "#683B2B", fontFamily: "Georgia, serif" }}>
            Featured Properties
          </h2>

          {featuredListings.length === 0 && (
            <p style={{ textAlign: "center" }}>No featured listings yet.</p>
          )}

          <div
            style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <Testimonials />

        <section
          style={{
            padding: "80px 40px",
            textAlign: "center",
            background: "linear-gradient(135deg, #683B2B, #D49E8D)",
            color: "white",
          }}
        >
          <div className="animate-float">
            <h2 style={{ fontSize: "40px", fontFamily: "Georgia, serif" }}>
              Get new listing alerts straight to your inbox.
            </h2>
            <SubscribeForm />
          </div>
        </section>
      </main>
    </>
  );
}
