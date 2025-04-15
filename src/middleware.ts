import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, allow all requests to pass through
    return NextResponse.next();
  }

  /**
   * Middleware to protect routes and check authentication
   * This middleware checks if the user is authenticated by verifying the presence of a cookie named "password".
   */

  const path = request.nextUrl.pathname;

  /**
   * Public routes that do not require authentication
   */

  // If path is "/login", allow access to the login page without authentication
  if (path.startsWith("/login")) {
    return NextResponse.next(); // Redirect to requested page
  }

  /**
   * Protected routes that require authentication
   */

  const cookies = request.cookies;
  const password = cookies.get("password");

  const { USER_SECRET } = process.env;

  if (password?.value === USER_SECRET) {
    // User is authenticated, allow access to the requested page
    return NextResponse.next();
  }

  // User is not authenticated, redirect to login page
  const response = NextResponse.redirect(
    new URL(`/login?redirect=${path}`, request.url)
  );

  response.cookies.set("password", "", {
    expires: new Date(0),
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
