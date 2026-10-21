import "server-only";

import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJwtToken } from "@/features/auth/jwt";

export const authenticateUser = async (): Promise<{ userId: string }> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const payload = verifyJwtToken(token) as { id?: string };
    if (!payload.id) {
      throw new Error("Not authenticated");
    }

    return { userId: payload.id };
  } catch {
    throw new Error("Not authenticated");
  }
};

export const authenticateUserAdmin = async (userId: string) => {
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const userData = await prisma.users.findUnique({
    where: { id: userId },
    select: { is_admin: true },
  });

  if (!userData?.is_admin) {
    throw new Error("Forbidden - Admin access required");
  }

  return { userId };
};
