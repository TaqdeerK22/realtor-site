import { Resend } from "resend";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";
import { escapeHtml } from "../../../lib/security";
import {
  invalid,
  listingSchema,
  readJson,
} from "../../../lib/validation";

// Public: active listings only (suspended ones stay private).
export async function GET() {
  const listings = await prisma.listing.findMany({
    where: { status: "active" },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(listings);
}

// Admin only: create a listing and notify subscribers.
export async function POST(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const body = await readJson(req);
  const parsed = listingSchema.safeParse(body);

  if (!parsed.success) return invalid(parsed.error);

  const { images, ...data } = parsed.data;

  try {
    const listing = await prisma.listing.create({
      data: {
        ...data,
        images: images && images.length > 0 ? images : [data.image],
        status: "active",
        views: 0,
      },
    });

    // Email problems must never block a listing from being created.
    await notifySubscribers(listing).catch((error) =>
      console.error("Subscriber notification failed:", error)
    );

    return Response.json(listing);
  } catch (error) {
    console.error("Create listing error:", error);
    return Response.json(
      { success: false, message: "Could not create listing." },
      { status: 500 }
    );
  }
}

async function notifySubscribers(listing: {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const subscribers = await prisma.subscriber.findMany({
    select: { email: true },
  });
  if (subscribers.length === 0) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

  const html = `
    <h1>New Listing Available</h1>
    <p><strong>${escapeHtml(listing.title)}</strong></p>
    <p>${escapeHtml(listing.location)}</p>
    <p>$${listing.price.toLocaleString("en-CA")}</p>
    <p>${listing.bedrooms} beds • ${listing.bathrooms} baths • ${listing.sqft} sqft</p>
    <p><a href="${siteUrl}/listings/${listing.id}">View Listing</a></p>
  `;

  // Resend accepts up to 100 emails per batch call.
  for (let i = 0; i < subscribers.length; i += 100) {
    const chunk = subscribers.slice(i, i + 100);

    await resend.batch.send(
      chunk.map((subscriber) => ({
        from,
        to: subscriber.email,
        subject: `New listing: ${listing.title}`,
        html,
      }))
    );
  }
}
