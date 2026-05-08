import Navbar from "../../components/Navbar";
import TestimonialForm from "../../components/TestimonialForm";

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />

      <main className="fade-up page-motion" style={{ padding: "60px 40px", maxWidth: "760px", margin: "0 auto" }}>
        <h1 style={{ color: "#683B2B", fontFamily: "var(--font-serif)", fontSize: "48px" }}>
          Share Your Experience
        </h1>

        <p style={{ lineHeight: "1.7", color: "#5b4a43" }}>
          Your testimonial will be reviewed by the realtor before it appears on the website.
        </p>

        <div className="site-card" style={{ padding: "30px", marginTop: "24px" }}>
          <TestimonialForm />
        </div>
      </main>
    </>
  );
}
