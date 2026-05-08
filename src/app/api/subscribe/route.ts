import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const subscriber = await prisma.subscriber.create({
      data: {
        email: String(body.email),
      },
    });

    return Response.json({ success: true, subscriber });
  } catch (error) {
    return Response.json(
      { success: false, message: "Subscription failed" },
      { status: 500 }
    );
  }
}
