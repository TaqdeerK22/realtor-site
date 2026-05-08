"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditListingForm({ listing }: { listing: any }) {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const existingImages = listing.images && listing.images.length > 0
    ? listing.images
    : [listing.image];

  const [imagePreview, setImagePreview] = useState(existingImages[0] || "");
  const [imagePreview2, setImagePreview2] = useState(existingImages[1] || "");
  const [imagePreview3, setImagePreview3] = useState(existingImages[2] || "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      title: formData.get("title"),
      price: formData.get("price"),
      location: formData.get("location"),
      propertyType: formData.get("propertyType"),
      image: formData.get("image"),
      images: [
        formData.get("image"),
        formData.get("image2"),
        formData.get("image3"),
      ].filter(Boolean),
      bedrooms: formData.get("bedrooms"),
      bathrooms: formData.get("bathrooms"),
      sqft: formData.get("sqft"),
      description: formData.get("description"),
    };

    const res = await fetch(`/api/listings/${listing.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/dashboard/listings");
      router.refresh();
    } else {
      setStatus("Update failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <label>Title
        <input name="title" defaultValue={listing.title} required style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Price
        <input name="price" type="number" defaultValue={listing.price} required style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Location
        <input name="location" defaultValue={listing.location} required style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Property Type
        <select name="propertyType" defaultValue={listing.propertyType} required style={{ width: "100%", padding: "12px" }}>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Land">Land</option>
        </select>
      </label>

      <label>Main Image URL
        <input name="image" defaultValue={existingImages[0] || ""} required onChange={(e) => setImagePreview(e.target.value)} style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Second Image URL
        <input name="image2" defaultValue={existingImages[1] || ""} onChange={(e) => setImagePreview2(e.target.value)} style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Third Image URL
        <input name="image3" defaultValue={existingImages[2] || ""} onChange={(e) => setImagePreview3(e.target.value)} style={{ width: "100%", padding: "12px" }} />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
        {[imagePreview, imagePreview2, imagePreview3].filter(Boolean).map((image) => (
          <img key={image} src={image} alt="Preview" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px" }} />
        ))}
      </div>

      <label>Bedrooms
        <input name="bedrooms" type="number" defaultValue={listing.bedrooms} required style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Bathrooms
        <input name="bathrooms" type="number" defaultValue={listing.bathrooms} required style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Square Feet
        <input name="sqft" type="number" defaultValue={listing.sqft} required style={{ width: "100%", padding: "12px" }} />
      </label>

      <label>Description
        <textarea name="description" defaultValue={listing.description} required style={{ width: "100%", padding: "12px", minHeight: "120px" }} />
      </label>

      <button type="submit" style={{ padding: "14px", background: "black", color: "white" }}>
        Update Listing
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
