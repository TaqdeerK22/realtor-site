import Link from "next/link";
import ListingBadge from "./ListingBadge";

export default function ListingCard({ listing }: { listing: any }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
          }}
        >
          <ListingBadge
            views={listing.views}
            createdAt={listing.createdAt}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            color: "white",
          }}
        >
          <h2 style={{ margin: 0 }}>{listing.title}</h2>

          <p
            style={{
              margin: "6px 0",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            ${listing.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <p>{listing.location}</p>

        <p
          style={{
            display: "inline-block",
            background: "#eee",
            padding: "6px 10px",
            borderRadius: "999px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          {listing.propertyType}
        </p>

        <p>
          {listing.bedrooms} beds • {listing.bathrooms} baths •{" "}
          {listing.sqft} sqft
        </p>

        <Link href={`/listings/${listing.id}`}>
          <button
            style={{
              marginTop: "12px",
              padding: "12px 18px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
