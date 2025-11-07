import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.NEXTAUTH_SECRET;

// Public paths that don't require authentication
const publicPaths = ["/login", "/signup", "/api/auth"];
const protectedPaths = ["/client/my-projects", "/client"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the current path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path)
  );

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({ req, secret: SECRET });

  // If no token, redirect to login
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    // loginUrl.searchParams.set("callbackUrl", pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // Check if the current path is a protected path
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path)
  );

  // If it's a protected path, only allow CLIENT role
  if (isProtectedPath) {
    if (token.role === "CLIENT") {
      return NextResponse.next();
    } else {
      // Redirect non-CLIENT users to home or unauthorized page
      const unauthorizedUrl = req.nextUrl.clone();
      unauthorizedUrl.pathname = "/unauthorized"; // or "/" for home
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // User has token and path is not protected - allow access
  return NextResponse.next();
}

// Apply middleware to all routes except static files and API auth
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
