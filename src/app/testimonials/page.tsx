import Navbar from "../../components/Navbar";
import TestimonialForm from "../../components/TestimonialForm";

export default function TestimonialsPage() {
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
                Client Stories
              </p>

              <h1 className="site-title">Share your experience.</h1>

              <p className="site-text">
                Your testimonial helps future clients understand what it feels like to work with Lovepreet Singh.
                Every message is reviewed before appearing on the website.
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
                “A good realtor does more than close a deal — they help people feel at home.”
              </blockquote>
            </div>

            <div className="site-card">
              <h2 className="site-heading">Submit Testimonial</h2>
              <TestimonialForm />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
