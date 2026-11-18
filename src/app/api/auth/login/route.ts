import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  createAdminToken,
} from "../../../../lib/auth";
import { limitRequest } from "../../../../lib/rate-limit";
import { safeEqual } from "../../../../lib/security";
import { readJson } from "../../../../lib/validation";

const PLACEHOLDER_PASSWORDS = ["choose-a-strong-password"];

export async function POST(req: Request) {
  // 10 attempts per 15 minutes per IP.
  const limited = limitRequest(req, "login", 10, 15 * 60 * 1000);
  if (limited) return limited;

  const expected = process.env.ADMIN_PASSWORD;

  if (
    !expected ||
    (process.env.NODE_ENV === "production" &&
      PLACEHOLDER_PASSWORDS.includes(expected))
  ) {
    console.error("ADMIN_PASSWORD is missing or still the example value.");
    return Response.json(
      { success: false, message: "Admin login is not configured." },
      { status: 503 }
    );
  }

  const body = (await readJson(req)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || !safeEqual(password, expected)) {
    return Response.json(
      { success: false, message: "Wrong password" },
      { status: 401 }
    );
  }

  let token: string;
  try {
    token = await createAdminToken();
  } catch (error) {
    console.error("Could not create admin session:", error);
    return Response.json(
      { success: false, message: "Admin login is not configured." },
      { status: 503 }
    );
  }

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `${ADMIN_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${ADMIN_SESSION_SECONDS}; SameSite=Lax${secure}`,
      "Content-Type": "application/json",
    },
  });
}
