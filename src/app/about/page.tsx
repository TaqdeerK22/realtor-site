import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main
        className="fade-up page-motion"
        style={{ padding: "clamp(20px, 3vw, 36px) 0" }}
      >
        <div className="page-container">
          <section
            className="site-card"
            style={{
              padding: "clamp(22px, 3vw, 36px)",
              maxWidth: "1080px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "clamp(20px, 3vw, 40px)",
                alignItems: "start",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#B08401",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontSize: "13px",
                    margin: "0 0 8px",
                  }}
                >
                  About Your Realtor
                </p>

                <h1
                  className="page-title"
                  style={{
                    fontSize: "clamp(30px, 3.6vw, 44px)",
                    margin: "0 0 14px",
                  }}
                >
                  Mark S
                </h1>

                <p className="lead-text" style={{ margin: "0 0 12px" }}>
                  Mark S is passionate about helping people find more than just
                  a property &mdash; he helps them find confidence, comfort, and
                  a place where their next chapter can begin.
                </p>

                <p className="lead-text" style={{ margin: 0 }}>
                  With a people-first approach, Mark focuses on clear
                  communication, honest guidance, and making the buying or
                  selling process feel less stressful and more meaningful.
                </p>
              </div>

              <div>
                <blockquote
                  style={{
                    margin: "0 0 16px",
                    padding: "clamp(14px, 2vw, 20px)",
                    borderLeft: "5px solid #B08401",
                    background: "#FAF6F2",
                    borderRadius: "18px",
                    color: "#683B2B",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(17px, 1.2vw + 9px, 21px)",
                    lineHeight: "1.5",
                  }}
                >
                  &ldquo;A home is not just where you live &mdash; it is where
                  your future starts to feel possible.&rdquo;
                </blockquote>

                <p className="lead-text" style={{ margin: "0 0 18px" }}>
                  Whether you are buying your first home, selling your current
                  property, or simply exploring your options, Mark is ready to
                  listen, guide, and help you move forward with clarity.
                </p>

                <Link
                  href="/contact"
                  className="site-button site-button-primary"
                >
                  Contact Mark
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}