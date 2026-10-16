import "server-only";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyPassword } from "./password";
import { generateJwtToken, generateRefreshToken } from "./jwt";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export async function login(input: unknown) {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      status: 400,
      message: "Invalid login or password",
    };
  }

  const { email, password } = parsed.data;

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user || !(await verifyPassword(user.password_hash, password))) {
    return {
      ok: false as const,
      status: 401,
      message: "Invalid login or password",
    };
  }

  const tokenUser = {
    id: String(user.id),
    email: user.email,
  };

  return {
    ok: true as const,
    jwtToken: generateJwtToken(tokenUser),
    refreshToken: generateRefreshToken(tokenUser),
    user: {
      id: String(user.id),
      email: user.email,
    },
  };
}
