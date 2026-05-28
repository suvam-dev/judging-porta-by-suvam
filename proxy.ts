import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function roleFromRequest(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = await roleFromRequest(request);

  // Gate each area by required role
  const rules = [
    { prefix: "/admin", role: "admin" },
    { prefix: "/judge", role: "judge" },
    { prefix: "/participant", role: "participant" },
  ];
  
  const rule = rules.find((r) => pathname.startsWith(r.prefix));
  
  if (rule && role !== rule.role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/judge/:path*", "/participant/:path*"],
};
