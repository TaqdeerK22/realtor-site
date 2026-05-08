import Navbar from "../components/Navbar";
import SubscribeForm from "../components/SubscribeForm";
import ListingCard from "../components/ListingCard";
import Testimonials from "../components/Testimonials";
import HomeStats from "../components/HomeStats";
import HeroStatsBar from "../components/HeroStatsBar";
import Link from "next/link";
import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredListings = await prisma.listing.findMany({
    where: {
      status: "active",
    },
    orderBy: {
      views: "desc",
    },
    take: 3,
  });

  return (
    <>
      <Navbar />

      <main>
        <section
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
            background:
              "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <div>
            <h1 style={{ fontSize: "64px", marginBottom: "20px" }}>
              Find Your Dream Home
            </h1>

            <p style={{ fontSize: "22px", marginBottom: "30px" }}>
              Modern real estate listings across British Columbia.
            </p>

            <Link href="/listings">
              <button
                style={{
                  padding: "14px 28px",
                  background: "white",
                  color: "black",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              >
                Browse Listings
              </button>
            </Link>

            <SubscribeForm />
          </div>
        </section>

        <HeroStatsBar />

        <section style={{ padding: "40px" }}>
          <h2 style={{ fontSize: "36px" }}>Featured Listings</h2>

          {featuredListings.length === 0 && <p>No featured listings yet.</p>}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <HomeStats />

        <Testimonials />
      </main>
    </>
  );
}
