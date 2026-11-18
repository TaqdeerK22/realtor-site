import { SignJWT, jwtVerify } from "jose";

// NOTE: this file is imported by middleware (Edge runtime),
// so it must only use Edge-compatible APIs (no node:crypto).

export const ADMIN_COOKIE = "admin_session";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 8; // 8 hours

const MIN_SECRET_LENGTH = 32;

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `AUTH_SECRET must be set to a random string of at least ${MIN_SECRET_LENGTH} characters.`
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminToken(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_SECONDS}s`)
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const verified = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    return verified.payload.role === "admin";
  } catch {
    return false;
  }
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;

  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=") || null;
  }

  return null;
}

/** True when the request carries a valid admin session cookie. */
export async function isAdminRequest(req: Request): Promise<boolean> {
  const token = readCookie(req.headers.get("cookie"), ADMIN_COOKIE);
  return token ? verifyAdminToken(token) : false;
}

/**
 * Guard for admin-only API routes.
 * Returns a 401 response when not signed in, or null when access is allowed:
 *
 *   const denied = await requireAdmin(req);
 *   if (denied) return denied;
 */
export async function requireAdmin(req: Request): Promise<Response | null> {
  if (await isAdminRequest(req)) return null;

  return Response.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}
