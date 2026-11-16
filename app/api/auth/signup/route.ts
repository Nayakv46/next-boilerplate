import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/features/auth/password";
import { generateJwtToken, generateRefreshToken } from "@/features/auth/jwt";

const signupSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  first_name: z.string().trim().optional(),
  last_name: z.string().trim().optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  const validation = signupSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { email, password, first_name, last_name } = validation.data;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        email,
        password_hash: passwordHash,
        first_name: first_name || null,
        last_name: last_name || null,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });
    const tokenUser = {
      id: String(user.id),
      email: user.email,
    };

    const jwtToken = generateJwtToken(tokenUser);
    const refreshToken = generateRefreshToken(tokenUser);

    const response = NextResponse.json({ user }, { status: 201 });

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("jwt_token", jwtToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);

    // Prisma unique constraint violation
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }
}
