import { prisma } from "../../../lib/prisma";

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

    return Response.json(listing);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
