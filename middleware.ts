import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.cookies.set("__origin", request.nextUrl.origin);
  return response;
}

export const config = {
  matcher: "/:path*",
};
