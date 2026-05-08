import Link from "next/link";
import { prisma } from "../../../../../lib/prisma";
import EditListingForm from "../../../../../components/EditListingForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) {
    return <h1>Listing not found</h1>;
  }

  return (
    <main style={{ padding: "40px", maxWidth: "700px" }}>
      <Link href="/dashboard/listings">← Back to Manage Listings</Link>
      <h1>Edit Listing</h1>
      <EditListingForm listing={listing} />
    </main>
  );
}
