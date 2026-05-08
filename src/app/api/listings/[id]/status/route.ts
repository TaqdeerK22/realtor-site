import { prisma } from "../../../../../lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const listing = await prisma.listing.update({
    where: { id },
    data: {
      status: body.status,
    },
  });

  return Response.json({ success: true, listing });
}
