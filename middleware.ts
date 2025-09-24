import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.NEXTAUTH_SECRET;

// Paths that require authentication
const protectedPaths = ["/dashboard", "/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths (login, api routes, etc.)
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Only check protected paths
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = await getToken({ req, secret: SECRET });
    if (!token) {
      // Redirect to login if no session
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // User is authenticated or path is public
  return NextResponse.next();
}

// Apply middleware to all routes you want
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
