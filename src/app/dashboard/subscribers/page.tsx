import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import DeleteSubscriberButton from "../../../components/DeleteSubscriberButton";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="fade-up page-motion" style={{ padding: "40px" }}>
      <Link href="/dashboard">← Back to Dashboard</Link>

      <h1>Subscribers</h1>

      {subscribers.length === 0 && <p>No subscribers yet.</p>}

      <div style={{ marginTop: "30px", display: "grid", gap: "15px" }}>
        {subscribers.map((subscriber) => (
          <div key={subscriber.id} style={{ border: "1px solid #ddd", padding: "16px" }}>
            <p><strong>Email:</strong> {subscriber.email}</p>
            <p>{new Date(subscriber.createdAt).toLocaleString()}</p>
            <DeleteSubscriberButton id={subscriber.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
