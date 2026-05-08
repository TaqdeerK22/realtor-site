import Navbar from "../../components/Navbar";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="fade-up" className="page-motion" style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
        <h1>Contact Realtor</h1>
        <p>Send a message and the realtor will get back to you.</p>

        <ContactForm />
      </main>
    </>
  );
}
