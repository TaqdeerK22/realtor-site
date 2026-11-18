import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/auth";
import { handleNotFound } from "../../../../../lib/api";
import {
  invalid,
  listingStatusSchema,
  readJson,
} from "../../../../../lib/validation";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;

  const parsed = listingStatusSchema.safeParse(await readJson(req));
  if (!parsed.success) return invalid(parsed.error);

  try {
    const listing = await prisma.listing.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return Response.json({ success: true, listing });
  } catch (error) {
    return handleNotFound(error);
  }
}
