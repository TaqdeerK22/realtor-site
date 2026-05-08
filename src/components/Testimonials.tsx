export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "Amazing experience buying our first home. Very professional and responsive.",
    },
    {
      name: "Daniel K.",
      text: "Helped us sell quickly and above asking price. Highly recommended.",
    },
    {
      name: "Priya S.",
      text: "Made the process simple and stress-free from start to finish.",
    },
  ];

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "36px", marginBottom: "24px" }}>
        Client Testimonials
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ lineHeight: "1.7" }}>
              "{testimonial.text}"
            </p>

            <p
              style={{
                marginTop: "16px",
                fontWeight: "bold",
              }}
            >
              — {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
