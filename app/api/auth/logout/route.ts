import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  // response.cookies.delete("jwt_token");
  // response.cookies.delete("refresh_token");
  const secure = process.env.NODE_ENV === "production";

  // Explicitly expire the cookies by setting their values to empty strings and maxAge to 0
  response.cookies.set("jwt_token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/api/auth",
    maxAge: 0, // Expire immediately
  });

  return response;
}
