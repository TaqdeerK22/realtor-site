"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewListingForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imagePreview2, setImagePreview2] = useState("");
  const [imagePreview3, setImagePreview3] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

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

    const res = await fetch("/api/listings", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      form.reset();
      router.push("/listings");
      router.refresh();
    } else {
      setStatus("Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input name="title" placeholder="Title" required style={{ padding: "12px" }} />
      <input name="price" type="number" placeholder="Price" required style={{ padding: "12px" }} />
      <input name="location" placeholder="Location" required style={{ padding: "12px" }} />

      <select name="propertyType" required style={{ padding: "12px" }}>
        <option value="House">House</option>
        <option value="Condo">Condo</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Land">Land</option>
      </select>

      <input
        name="image"
        placeholder="Main Image URL"
        required
        onChange={(e) => setImagePreview(e.target.value)}
        style={{ padding: "12px" }}
      />

      <input
        name="image2"
        placeholder="Second Image URL"
        onChange={(e) => setImagePreview2(e.target.value)}
        style={{ padding: "12px" }}
      />

      <input
        name="image3"
        placeholder="Third Image URL"
        onChange={(e) => setImagePreview3(e.target.value)}
        style={{ padding: "12px" }}
      />

      {(imagePreview || imagePreview2 || imagePreview3) && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          {[imagePreview, imagePreview2, imagePreview3].filter(Boolean).map((image) => (
            <img
              key={image}
              src={image}
              alt="Preview"
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ))}
        </div>
      )}

      <input name="bedrooms" type="number" placeholder="Bedrooms" required style={{ padding: "12px" }} />
      <input name="bathrooms" type="number" placeholder="Bathrooms" required style={{ padding: "12px" }} />
      <input name="sqft" type="number" placeholder="Square Feet" required style={{ padding: "12px" }} />
      <textarea name="description" placeholder="Description" required style={{ padding: "12px" }} />

      <button type="submit" style={{ padding: "14px", background: "black", color: "white" }}>
        Create Listing
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
