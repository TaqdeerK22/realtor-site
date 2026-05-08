import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import InquiryForm from "../../../components/InquiryForm";
import SaveListingButton from "../../../components/SaveListingButton";
import ShareListingButton from "../../../components/ShareListingButton";
import MapSection from "../../../components/MapSection";
import MortgageCalculator from "../../../components/MortgageCalculator";
import ImageGallery from "../../../components/ImageGallery";

export const dynamic = "force-dynamic";

export default async function ListingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listing = await prisma.listing.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  if (!listing) {
    return (
      <main style={{ padding: "40px" }}>
        <Link href="/listings">← Back to Listings</Link>
        <h1>Listing not found</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <Link href="/listings">← Back to Listings</Link>

      <div style={{ marginTop: "20px" }}>
        <ImageGallery images={listing.images && listing.images.length > 0 ? listing.images : [listing.image]} />
      </div>

      <h1>{listing.title}</h1>

      <h2>${listing.price.toLocaleString()}</h2>

      <p>{listing.location}</p>

      <p
        style={{
          display: "inline-block",
          background: "#eee",
          padding: "8px 12px",
          borderRadius: "999px",
          marginBottom: "12px",
        }}
      >
        {listing.propertyType}
      </p>

      <p>
        {listing.bedrooms} beds • {listing.bathrooms} baths •{" "}
        {listing.sqft} sqft
      </p>

      <p>{listing.description}</p>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <SaveListingButton id={listing.id} />
        <ShareListingButton />
      </div>

      <MapSection location={listing.location} />

      <MortgageCalculator price={listing.price} />

      <InquiryForm listingId={listing.id} />
    </main>
  );
}
