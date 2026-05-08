import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="fade-up page-motion" style={{ padding: "70px 0" }}>
        <div className="page-container">
          <section
            className="site-card"
            style={{
              padding: "60px",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                color: "#B08401",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              About Your Realtor
            </p>

            <h1 className="page-title">Lovepreet Singh</h1>

            <p className="lead-text">
              Lovepreet Singh is passionate about helping people find more than
              just a property — he helps them find confidence, comfort, and a
              place where their next chapter can begin.
            </p>

            <p className="lead-text">
              With a people-first approach, Lovepreet focuses on clear
              communication, honest guidance, and making the buying or selling
              process feel less stressful and more meaningful.
            </p>

            <blockquote
              style={{
                margin: "32px 0",
                padding: "26px",
                borderLeft: "5px solid #B08401",
                background: "#FAF6F2",
                borderRadius: "18px",
                color: "#683B2B",
                fontFamily: "var(--font-serif)",
                fontSize: "26px",
                lineHeight: "1.5",
              }}
            >
              “A home is not just where you live — it is where your future
              starts to feel possible.”
            </blockquote>

            <p className="lead-text">
              Whether you are buying your first home, selling your current
              property, or simply exploring your options, Lovepreet is ready to
              listen, guide, and help you move forward with clarity.
            </p>

            <div style={{ marginTop: "36px" }}>
              <Link href="/contact">
                <button className="site-button site-button-primary">
                  Contact Lovepreet
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
