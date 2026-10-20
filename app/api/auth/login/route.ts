import { NextResponse } from "next/server";
import { login } from "@/features/auth/auth.service";

export const runtine = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  try {
    const result = await login(body);

    if (!result.ok) {
      return NextResponse.json(
        {
          message: result.message,
        },
        { status: result.status },
      );
    }

    const response = NextResponse.json({
      user: result.user,
    });

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("jwt_token", result.jwtToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    response.cookies.set("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
