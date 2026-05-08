import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import DeleteInquiryButton from "../../../components/DeleteInquiryButton";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="fade-up page-motion" style={{ padding: "40px" }}>
      <Link href="/dashboard">← Back to Dashboard</Link>

      <h1>Customer Inquiries</h1>

      {inquiries.length === 0 && <p>No inquiries yet.</p>}

      <div style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} style={{ border: "1px solid #ddd", padding: "20px" }}>
            <h2>{inquiry.name}</h2>

            <p><strong>Email:</strong> {inquiry.email}</p>
            <p><strong>Phone:</strong> {inquiry.phone}</p>

            <p>
              <strong>Listing:</strong>{" "}
              {inquiry.listing ? inquiry.listing.title : "General Contact Message"}
            </p>

            <p><strong>Message:</strong> {inquiry.message}</p>

            <p style={{ color: "gray" }}>
              <strong>Received:</strong> {new Date(inquiry.createdAt).toLocaleString()}
            </p>

            <DeleteInquiryButton id={inquiry.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
