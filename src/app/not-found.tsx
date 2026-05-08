import Link from "next/link";
import Navbar from "../components/Navbar";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "80px 40px", textAlign: "center" }}>
        <h1>Page Not Found</h1>

        <p>The page you are looking for does not exist.</p>

        <Link href="/">
          <button style={{ padding: "12px 20px", background: "black", color: "white", border: "none", borderRadius: "8px" }}>
            Go Home
          </button>
        </Link>
      </main>
    </>
  );
}
