import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import DeleteListingButton from "../../../components/DeleteListingButton";
import ToggleListingStatusButton from "../../../components/ToggleListingStatusButton";

export const dynamic = "force-dynamic";

export default async function DashboardListingsPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { views: "desc" },
  });

  return (
    <main className="fade-up" className="page-motion" style={{ padding: "40px" }}>
      <Link href="/dashboard">← Back to Dashboard</Link>

      <h1>Manage Listings</h1>

      <Link href="/dashboard/listings/new">+ Add New Listing</Link>

      <div style={{ marginTop: "30px", display: "grid", gap: "20px" }}>
        {listings.map((listing) => (
          <div key={listing.id} style={{ border: "1px solid #ddd", padding: "20px" }}>
            <h2>{listing.title}</h2>
            <p>${listing.price.toLocaleString()}</p>
            <p>{listing.location}</p>
            <p><strong>Status:</strong> {listing.status}</p>
            <p><strong>Views:</strong> {listing.views}</p>

            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <Link href={`/listings/${listing.id}`}>View</Link>
              <Link href={`/dashboard/listings/${listing.id}/edit`}>Edit</Link>
              <ToggleListingStatusButton id={listing.id} status={listing.status} />
              <DeleteListingButton id={listing.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
