import { createAdminToken } from "../../../../lib/auth";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return Response.json(
      { success: false, message: "Wrong password" },
      { status: 401 }
    );
  }

  const token = await createAdminToken();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `admin_session=${token}; HttpOnly; Path=/; Max-Age=28800; SameSite=Lax; ${
        process.env.NODE_ENV === "production" ? "Secure;" : ""
      }`,
      "Content-Type": "application/json",
    },
  });
}
