import { Prisma } from "@prisma/client";

/** Map "record not found" from Prisma to a 404; rethrow anything else. */
export function handleNotFound(error: unknown): Response {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return Response.json(
      { success: false, message: "Not found." },
      { status: 404 }
    );
  }

  console.error("API error:", error);

  return Response.json(
    { success: false, message: "Something went wrong." },
    { status: 500 }
  );
}
