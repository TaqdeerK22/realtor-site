export default function ListingBadge({
  views,
  createdAt,
}: {
  views: number;
  createdAt: string | Date;
}) {
  const createdDate = new Date(createdAt);
  const daysOld =
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);

  if (views >= 10) {
    return (
      <span
        style={{
          background: "orange",
          color: "white",
          padding: "6px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        POPULAR
      </span>
    );
  }

  if (daysOld <= 7) {
    return (
      <span
        style={{
          background: "green",
          color: "white",
          padding: "6px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        NEW
      </span>
    );
  }

  return (
    <span
      style={{
        background: "black",
        color: "white",
        padding: "6px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      FEATURED
    </span>
  );
}
