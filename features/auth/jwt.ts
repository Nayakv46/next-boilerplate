import "server-only";
import jwt, { type JwtPayload } from "jsonwebtoken";

type AuthUser = {
  id: string;
  email: string;
};

type TokenPayload = JwtPayload & AuthUser;

function getSecret(name: string): string {
  const secret = process.env[name];

  if (!secret) {
    throw new Error(`${name} is not defined in the environment variables`);
  }

  return secret;
}

export function generateJwtToken(user: AuthUser): string {
  return jwt.sign({ id: user.id, email: user.email }, getSecret("JWT_SECRET"), {
    algorithm: "HS256",
    expiresIn: "15m",
  });
}

export function generateRefreshToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    getSecret("REFRESH_SECRET"),
    {
      algorithm: "HS256",
      expiresIn: "7d",
    },
  );
}

export function verifyJwtToken(token: string): TokenPayload {
  const payload = jwt.verify(token, getSecret("JWT_SECRET"), {
    algorithms: ["HS256"],
  }) as TokenPayload;

  if (
    typeof payload === "string" ||
    typeof payload.id !== "string" ||
    typeof payload.email !== "string"
  ) {
    throw new Error("Invalid jwt token payload");
  }

  return payload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  const payload = jwt.verify(token, getSecret("REFRESH_SECRET"), {
    algorithms: ["HS256"],
  }) as TokenPayload;

  if (
    typeof payload === "string" ||
    typeof payload.id !== "string" ||
    typeof payload.email !== "string"
  ) {
    throw new Error("Invalid refresh token payload");
  }

  return payload;
}
