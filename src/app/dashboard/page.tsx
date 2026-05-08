import Link from "next/link";
import { prisma } from "../../lib/prisma";
import LogoutButton from "../../components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const totalListings = await prisma.listing.count();
  const activeListings = await prisma.listing.count({ where: { status: "active" } });
  const suspendedListings = await prisma.listing.count({ where: { status: "suspended" } });
  const totalInquiries = await prisma.inquiry.count();
  const totalSubscribers = await prisma.subscriber.count();

  return (
    <main className="fade-up" className="page-motion" style={{ padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Dashboard</h1>
        <LogoutButton />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px", marginTop: "30px" }}>
        <div><h2>{totalListings}</h2><p>Total Listings</p></div>
        <div><h2>{activeListings}</h2><p>Active Listings</p></div>
        <div><h2>{suspendedListings}</h2><p>Suspended</p></div>
        <div><h2>{totalInquiries}</h2><p>Inquiries</p></div>
        <div><h2>{totalSubscribers}</h2><p>Subscribers</p></div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "30px" }}>
        <Link href="/dashboard/listings">Manage Listings</Link>
        <Link href="/dashboard/listings/new">Add New Listing</Link>
        <Link href="/dashboard/inquiries">View Inquiries</Link>
        <Link href="/dashboard/subscribers">View Subscribers</Link>
        <Link href="/dashboard/testimonials">Manage Testimonials</Link>
        <Link href="/listings">View Public Website</Link>
      </div>
    </main>
  );
}
