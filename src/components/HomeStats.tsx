export default function HomeStats() {
  const stats = [
    {
      number: "250+",
      label: "Properties Sold",
    },
    {
      number: "$120M+",
      label: "Sales Volume",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
    },
    {
      number: "10+",
      label: "Years Experience",
    },
  ];

  return (
    <section
      style={{
        padding: "60px 40px",
        background: "#111",
        color: "white",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "24px",
          textAlign: "center",
        }}
      >
        {stats.map((stat, index) => (
          <div key={index}>
            <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>
              {stat.number}
            </h2>

            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
