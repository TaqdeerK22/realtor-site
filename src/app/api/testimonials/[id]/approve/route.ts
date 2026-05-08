import { prisma } from "../../../../../lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: { approved: true },
  });

  return Response.json({ success: true, testimonial });
}
