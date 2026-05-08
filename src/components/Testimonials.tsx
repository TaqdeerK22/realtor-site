import { prisma } from "../lib/prisma";

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "36px", marginBottom: "24px" }}>
        Client Testimonials
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} style={{ background: "white", padding: "24px", borderRadius: "12px" }}>
            <p style={{ lineHeight: "1.7" }}>"{testimonial.message}"</p>
            <p style={{ marginTop: "16px", fontWeight: "bold" }}>— {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
