import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";
import { handleNotFound } from "../../../../lib/api";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    await prisma.testimonial.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    return handleNotFound(error);
  }
}
