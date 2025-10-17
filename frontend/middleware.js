import { NextResponse } from "next/server";

const AUTH_PATH = ["/login", "/register"];

export default async function middleware(request) {
  try {
    const token = request.cookies.get("token");
    const { pathname } = request.nextUrl;

    if (!token && !AUTH_PATH.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && AUTH_PATH.includes(pathname)) {
      return NextResponse.redirect(new URL("/task", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/task/:path*"],
};
