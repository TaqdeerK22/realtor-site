import NewListingForm from "../../../../components/NewListingForm";

import Link from "next/link";

export default function NewListingPage() {
  return (
    <main style={{ padding: "40px", maxWidth: "700px" }}>
      <Link href="/dashboard/listings">← Back to Manage Listings</Link>
      <h1>Add New Listing</h1>
      <NewListingForm />
    </main>
  );
}
