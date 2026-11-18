import { ADMIN_COOKIE } from "../../../../lib/auth";

export async function POST() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `${ADMIN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`,
      "Content-Type": "application/json",
    },
  });
}
