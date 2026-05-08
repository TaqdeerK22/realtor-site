import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const inquiry = await prisma.inquiry.create({
    data: {
      listingId: body.listingId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message || "",
    },
  });

  return Response.json({
    success: true,
    inquiry,
  });
}
