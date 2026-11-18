import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";
import { handleNotFound } from "../../../../lib/api";
import {
  invalid,
  listingSchema,
  readJson,
} from "../../../../lib/validation";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(req: Request, { params }: Context) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    await prisma.listing.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    return handleNotFound(error);
  }
}

export async function PUT(req: Request, { params }: Context) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;

  const parsed = listingSchema.safeParse(await readJson(req));
  if (!parsed.success) return invalid(parsed.error);

  const { images, ...data } = parsed.data;

  try {
    const listing = await prisma.listing.update({
      where: { id },
      data: {
        ...data,
        images: images && images.length > 0 ? images : [data.image],
      },
    });

    return Response.json({ success: true, listing });
  } catch (error) {
    return handleNotFound(error);
  }
}
