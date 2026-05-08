import Navbar from "../../components/Navbar";
import ListingCard from "../../components/ListingCard";
import { prisma } from "../../lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    propertyType?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const location = params.location || "";
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const bedrooms = params.bedrooms ? Number(params.bedrooms) : undefined;
  const bathrooms = params.bathrooms ? Number(params.bathrooms) : undefined;
  const propertyType = params.propertyType || "";
  const sort = params.sort || "newest";

  let orderBy: any = { createdAt: "desc" };
  if (sort === "price-low") orderBy = { price: "asc" };
  if (sort === "price-high") orderBy = { price: "desc" };
  if (sort === "views") orderBy = { views: "desc" };

  const listings = await prisma.listing.findMany({
    where: {
      status: "active",
      location: { contains: location, mode: "insensitive" },
      price: { gte: minPrice, lte: maxPrice },
      bedrooms: { gte: bedrooms },
      bathrooms: { gte: bathrooms },
      propertyType: propertyType ? { equals: propertyType } : undefined,
    },
    orderBy,
  });

  return (
    <>
      <Navbar />

      <main className="fade-up site-page">
        <div className="site-container">
          <section className="site-card" style={{ marginBottom: "34px" }}>
            <p style={{ color: "#B08401", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
              Explore Properties
            </p>

            <h1 className="site-title">Find a place that feels like home.</h1>

            <p className="site-text">
              Browse active listings and filter by city, price, bedrooms, bathrooms, and property type.
            </p>

            <form
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
                marginTop: "26px",
              }}
            >
              <input name="location" placeholder="Location" defaultValue={location} />
              <input name="minPrice" type="number" placeholder="Min Price" defaultValue={params.minPrice || ""} />
              <input name="maxPrice" type="number" placeholder="Max Price" defaultValue={params.maxPrice || ""} />
              <input name="bedrooms" type="number" placeholder="Min Bedrooms" defaultValue={params.bedrooms || ""} />
              <input name="bathrooms" type="number" placeholder="Min Bathrooms" defaultValue={params.bathrooms || ""} />

              <select name="propertyType" defaultValue={propertyType} style={{ padding: "16px" }}>
                <option value="">All Property Types</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Land">Land</option>
              </select>

              <select name="sort" defaultValue={sort} style={{ padding: "16px" }}>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="views">Most Viewed</option>
              </select>

              <button type="submit" className="site-button site-button-primary">
                Search
              </button>

              <Link href="/listings" className="site-button site-button-light">
                Clear Filters
              </Link>
            </form>
          </section>

          {listings.length === 0 && (
            <section className="site-card" style={{ textAlign: "center" }}>
              <p className="site-text">No active listings found.</p>
            </section>
          )}

          <div className="site-grid">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
