import Link from "next/link";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #f7f7f7, #e9e9e9)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "white",
          padding: "36px",
          borderRadius: "18px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
        }}
      >
        <Link href="/">← Back to Website</Link>

        <h1 style={{ marginTop: "24px" }}>Realtor Login</h1>

        <div
          style={{
            background: "#fff4e5",
            border: "1px solid #ffd89b",
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "20px",
            lineHeight: "1.6",
          }}
        >
          <strong>Authorized Access Only</strong>
          <p style={{ margin: "8px 0 0" }}>
            This login area is only for authorized realtors and staff members of the firm.
            If you are a client or visitor, please return to the main website or use the contact page.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
