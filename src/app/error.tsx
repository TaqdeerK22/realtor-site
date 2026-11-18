"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="site-page">
      <div className="site-container" style={{ textAlign: "center" }}>
        <h1 className="site-title">Something went wrong</h1>
        <p className="site-text">
          We hit an unexpected problem. Please try again, or head back home.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button className="site-button" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="site-button site-button-secondary">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
