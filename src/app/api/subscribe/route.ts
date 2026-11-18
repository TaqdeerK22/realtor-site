import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { limitRequest } from "../../../lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // 5 signups per 10 minutes per IP.
  const limited = limitRequest(req, "subscribe", 5, 10 * 60 * 1000);
  if (limited) return limited;

  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = String(body.email ?? "").trim().toLowerCase();

  if (!EMAIL_REGEX.test(email)) {
    return Response.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    await prisma.subscriber.create({
      data: { email },
    });

    return Response.json({ success: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return Response.json(
        { success: false, message: "You're already subscribed!" },
        { status: 409 }
      );
    }

    console.error("Failed to create subscriber:", error);
    return Response.json(
      { success: false, message: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
