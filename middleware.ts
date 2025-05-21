import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Require authentication for all routes except sign-in, Next.js internals, API routes, and static files
export const config = {
  matcher: [
    "/((?!_next|api|auth/signin|favicon.ico|robots.txt|images|public).*)",
  ],
}; 