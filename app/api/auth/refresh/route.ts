import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import {
  generateJwtToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/features/auth/jwt";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Not authenticated" }, // No refresh token found
      { status: 401 },
    );
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    // Verify that the user still exists.
    const user = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user || String(user.id) !== payload.id) {
      const response = NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
      response.cookies.delete("jwt_token");
      response.cookies.delete("refresh_token");

      return response;
    }

    const tokenUser = {
      id: String(user.id),
      email: user.email,
    };

    const jwtToken = generateJwtToken(tokenUser);
    const newRefreshToken = generateRefreshToken(tokenUser);

    const response = NextResponse.json({ ok: true });
    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("jwt_token", jwtToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    const response = NextResponse.json(
      { message: "Invalid or expired refresh token" },
      { status: 401 },
    );

    response.cookies.delete("jwt_token");
    response.cookies.delete("refresh_token");

    return response;
  }
}
