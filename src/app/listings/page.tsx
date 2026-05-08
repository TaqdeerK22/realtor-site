import Navbar from "../../components/Navbar";
import ListingCard from "../../components/ListingCard";
import { prisma } from "../../lib/prisma";

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
      location: {
        contains: location,
        mode: "insensitive",
      },
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      bedrooms: {
        gte: bedrooms,
      },
      bathrooms: {
        gte: bathrooms,
      },
      propertyType: propertyType
        ? {
            equals: propertyType,
          }
        : undefined,
    },
    orderBy,
  });

  return (
    <>
      <Navbar />

      <main style={{ padding: "40px" }}>
        <h1>Listings</h1>

        <form style={{ display: "flex", gap: "12px", marginBottom: "30px", flexWrap: "wrap" }}>
          <input name="location" placeholder="Location" defaultValue={location} style={{ padding: "12px" }} />
          <input name="minPrice" type="number" placeholder="Min Price" defaultValue={params.minPrice || ""} style={{ padding: "12px" }} />
          <input name="maxPrice" type="number" placeholder="Max Price" defaultValue={params.maxPrice || ""} style={{ padding: "12px" }} />
          <input name="bedrooms" type="number" placeholder="Min Bedrooms" defaultValue={params.bedrooms || ""} style={{ padding: "12px" }} />
          <input name="bathrooms" type="number" placeholder="Min Bathrooms" defaultValue={params.bathrooms || ""} style={{ padding: "12px" }} />

          <select name="propertyType" defaultValue={propertyType} style={{ padding: "12px" }}>
            <option value="">All Property Types</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Land">Land</option>
          </select>

          <select name="sort" defaultValue={sort} style={{ padding: "12px" }}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="views">Most Viewed</option>
          </select>

          <button type="submit" style={{ padding: "12px 20px" }}>
            Search
          </button>

          <a href="/listings" style={{ padding: "12px 20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            Clear Filters
          </a>

          <a href="/listings" style={{ padding: "12px 20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            Clear Filters
          </a>
        </form>

        {listings.length === 0 && <p>No active listings found.</p>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
    </>
  );
}
