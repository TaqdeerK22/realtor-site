import { prisma } from "../../../../../lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const testimonial = await prisma.testimonial.update({
    where: { id: params.id },
    data: { approved: true },
  });

  return Response.json({ success: true, testimonial });
}
