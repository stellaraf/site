import { NextResponse } from "next/server";
import { v4 as uuid4 } from "uuid";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.cookies.set("__origin", request.nextUrl.origin);

  let cookie = request.cookies.get("st-session-id");

  if (typeof cookie === "undefined") {
    response.cookies.set("st-session-id", uuid4());
  }

  cookie = response.cookies.get("st-session-id");
  return response;
}

export const config = {
  matcher: "/:path*",
};
