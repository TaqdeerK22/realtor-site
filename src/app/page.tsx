import Navbar from "../components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            padding: "0 7vw",
            background: "#FAF6F2",
          }}
        >
          <div className="hero-bg" />

          <div
            className="drift"
            style={{
              position: "absolute",
              right: "10%",
              top: "18%",
              width: "340px",
              height: "340px",
              borderRadius: "40px",
              background:
                "linear-gradient(135deg,#D49E8D,#FAF6F2,#683B2B)",
              opacity: 0.9,
              transform: "rotate(12deg)",
            }}
          />

          <div
            className="floaty"
            style={{
              position: "absolute",
              right: "20%",
              bottom: "18%",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#683B2B",
              opacity: 0.95,
            }}
          />

          <div
            className="fade-up"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "760px",
            }}
          >
            <p
              style={{
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#B08401",
                fontWeight: 700,
              }}
            >
              Find Your Place
            </p>

            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(64px,9vw,120px)",
                lineHeight: "0.92",
                margin: "10px 0 24px",
                color: "#683B2B",
              }}
            >
              Belonging has
              <br />
              <span style={{ color: "#D49E8D" }}>
                a doorstep.
              </span>
            </h1>

            <p
              style={{
                fontSize: "24px",
                lineHeight: "1.7",
                maxWidth: "620px",
                color: "#4d3c36",
                marginBottom: "36px",
              }}
            >
              Real estate is more than a transaction —
              it’s the start of your next chapter.
            </p>

            <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
              <Link href="/listings">
                <button className="luxury-button">
                  Explore Properties
                </button>
              </Link>

              <Link href="/contact">
                <button
                  style={{
                    padding: "16px 32px",
                    borderRadius: "999px",
                    background: "#683B2B",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Schedule Consultation
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
