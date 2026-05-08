import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "./src/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isValid = await verifyAdminToken(token);

  if (!isValid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
