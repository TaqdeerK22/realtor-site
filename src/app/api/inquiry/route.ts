import { prisma } from "../../../lib/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  const listingId =
    typeof body.listingId === "string" && body.listingId.length > 0
      ? body.listingId
      : null;

  if (!name || !email || !phone) {
    return Response.json(
      { success: false, message: "Name, email, and phone are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return Response.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (name.length > 100 || phone.length > 30 || message.length > 2000) {
    return Response.json(
      { success: false, message: "One or more fields are too long." },
      { status: 400 }
    );
  }

  try {
    const inquiry = await prisma.inquiry.create({
      data: { listingId, name, email, phone, message },
    });

    return Response.json({ success: true, inquiry });
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
