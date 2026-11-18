import { prisma } from "../../../lib/prisma";
import { limitRequest } from "../../../lib/rate-limit";
import {
  invalid,
  readJson,
  testimonialSchema,
} from "../../../lib/validation";

// Public: visitors submit testimonials, which stay hidden until approved.
export async function POST(req: Request) {
  // 3 submissions per hour per IP.
  const limited = limitRequest(req, "testimonial", 3, 60 * 60 * 1000);
  if (limited) return limited;

  const parsed = testimonialSchema.safeParse(await readJson(req));
  if (!parsed.success) return invalid(parsed.error);

  try {
    await prisma.testimonial.create({
      data: { ...parsed.data, approved: false },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
