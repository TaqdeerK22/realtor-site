import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/auth";
import { handleNotFound } from "../../../../../lib/api";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { approved: true },
    });

    return Response.json({ success: true, testimonial });
  } catch (error) {
    return handleNotFound(error);
  }
}
