"use client";

import { useState } from "react";

export default function ImageUploader({
  name,
  label,
  required = false,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setImageUrl(data.secure_url);
    setUploading(false);
  }

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      <label>{label}</label>

      <input type="file" accept="image/*" onChange={handleUpload} />

      <input
        name={name}
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL will appear here after upload"
        required={required}
        style={{ padding: "12px" }}
      />

      {uploading && <p>Uploading...</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      )}
    </div>
  );
}
