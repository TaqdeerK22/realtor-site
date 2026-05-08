import { prisma } from "../../../../lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.listing.delete({
    where: { id },
  });

  return Response.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const listing = await prisma.listing.update({
    where: { id },
    data: {
      title: String(body.title),
      price: Number(body.price),
      location: String(body.location),
      image: String(body.image),
      images: body.images || [body.image],
      bedrooms: Number(body.bedrooms),
      bathrooms: Number(body.bathrooms),
      sqft: Number(body.sqft),
      description: String(body.description),
      propertyType: String(body.propertyType || "House"),
    },
  });

  return Response.json({ success: true, listing });
}
