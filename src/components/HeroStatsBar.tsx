export default function HeroStatsBar() {
  return (
    <section
      style={{
        marginTop: "-50px",
        position: "relative",
        zIndex: 10,
        padding: "0 40px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "24px",
          textAlign: "center",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>500+</h2>
          <p>Active Buyers</p>
        </div>

        <div>
          <h2 style={{ margin: 0 }}>250+</h2>
          <p>Homes Sold</p>
        </div>

        <div>
          <h2 style={{ margin: 0 }}>20+</h2>
          <p>Communities Served</p>
        </div>

        <div>
          <h2 style={{ margin: 0 }}>98%</h2>
          <p>Client Satisfaction</p>
        </div>
      </div>
    </section>
  );
}
