import { prisma } from "../../../lib/prisma";
import { Resend } from "resend";

export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(listings);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const listing = await prisma.listing.create({
      data: {
        title: body.title,
        price: Number(body.price),
        location: body.location,
        image: body.image,
        images: body.images || [body.image],
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        sqft: Number(body.sqft),
        description: body.description,
        propertyType: body.propertyType || "House",
        status: "active",
        views: 0,
      },
    });

    const subscribers = await prisma.subscriber.findMany();

    if (process.env.RESEND_API_KEY && subscribers.length > 0) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await Promise.all(
        subscribers.map((subscriber) =>
          resend.emails.send({
            from: process.env.FROM_EMAIL || "onboarding@resend.dev",
            to: subscriber.email,
            subject: `New listing: ${listing.title}`,
            html: `
              <h1>New Listing Available</h1>
              <p><strong>${listing.title}</strong></p>
              <p>${listing.location}</p>
              <p>$${listing.price.toLocaleString()}</p>
              <p>${listing.bedrooms} beds • ${listing.bathrooms} baths • ${listing.sqft} sqft</p>
              <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/listings/${listing.id}">View Listing</a></p>
            `,
          })
        )
      );
    }

    return Response.json(listing);
  } catch (e) {
    console.error("Create listing error:", e);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
