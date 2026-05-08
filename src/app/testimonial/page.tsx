import Navbar from "../../components/Navbar";
import TestimonialForm from "../../components/TestimonialForm";

export default function TestimonialPage() {
  return (
    <>
      <Navbar />

      <main className="fade-up" style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
        <h1>Share Your Experience</h1>
        <p>Your testimonial will be reviewed before appearing on the website.</p>

        <TestimonialForm />
      </main>
    </>
  );
}
