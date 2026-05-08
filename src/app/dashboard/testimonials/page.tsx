import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import ApproveTestimonialButton from "../../../components/ApproveTestimonialButton";
import DeleteTestimonialButton from "../../../components/DeleteTestimonialButton";

export const dynamic = "force-dynamic";

export default async function DashboardTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="fade-up" className="page-motion" style={{ padding: "40px" }}>
      <Link href="/dashboard">← Back to Dashboard</Link>

      <h1>Manage Testimonials</h1>

      {testimonials.length === 0 && <p>No testimonials yet.</p>}

      <div style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} style={{ border: "1px solid #ddd", padding: "20px" }}>
            <h2>{testimonial.name}</h2>
            <p>{testimonial.message}</p>
            <p><strong>Status:</strong> {testimonial.approved ? "Approved" : "Pending"}</p>

            <div style={{ display: "flex", gap: "12px" }}>
              {!testimonial.approved && <ApproveTestimonialButton id={testimonial.id} />}
              <DeleteTestimonialButton id={testimonial.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
