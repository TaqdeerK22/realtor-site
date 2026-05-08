"use client";

import { useState } from "react";

export default function ShareListingButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div>
      <button
        onClick={handleShare}
        style={{
          padding: "10px 16px",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Share Listing
      </button>

      {copied && (
        <p style={{ color: "green", marginTop: "6px" }}>
          Link copied!
        </p>
      )}
    </div>
  );
}
