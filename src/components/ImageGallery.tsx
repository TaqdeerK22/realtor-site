"use client";

import { useState } from "react";

export default function ImageGallery({
  images,
}: {
  images: string[];
}) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section>
      <img
        src={selectedImage}
        alt="Listing"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt="Thumbnail"
            onClick={() => setSelectedImage(image)}
            style={{
              width: "120px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
}
