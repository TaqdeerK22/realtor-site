export default function MapSection({ location }: { location: string }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <section style={{ marginTop: "40px", padding: "24px", background: "white", borderRadius: "12px" }}>
      <h2>Location</h2>
      <p>{location}</p>

      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        <button style={{ padding: "12px 20px", background: "black", color: "white", border: "none", borderRadius: "8px" }}>
          Open in Google Maps
        </button>
      </a>
    </section>
  );
}
