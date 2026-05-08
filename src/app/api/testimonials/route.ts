import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const testimonial = await prisma.testimonial.create({
    data: {
      name: String(body.name),
      message: String(body.message),
    },
  });

  return Response.json({ success: true, testimonial });
}
