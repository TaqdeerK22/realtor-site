import Navbar from "../../components/Navbar";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="fade-up site-page">
        <div className="site-container">
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px",
              alignItems: "start",
            }}
          >
            <div className="site-card">
              <p style={{ color: "#B08401", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
                Contact Realtor
              </p>

              <h1 className="site-title">Let’s talk about your next move.</h1>

              <p className="site-text">
                Whether you are buying, selling, or just exploring your options, Lovepreet Singh is ready to help you move forward with clarity and confidence.
              </p>

              <blockquote
                style={{
                  marginTop: "30px",
                  padding: "24px",
                  borderLeft: "5px solid #B08401",
                  background: "#FAF6F2",
                  borderRadius: "18px",
                  color: "#683B2B",
                  fontFamily: "var(--font-serif)",
                  fontSize: "24px",
                  lineHeight: "1.5",
                }}
              >
                “The right home is not just found — it is felt.”
              </blockquote>
            </div>

            <div className="site-card">
              <h2 className="site-heading">Send a Message</h2>
              <ContactForm />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
