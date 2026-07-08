import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hmacSha256, safeEqual } from "./security";

export const ADMIN_COOKIE = "wf_admin_session";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

interface AdminSessionPayload {
  role: "admin";
  exp: number;
}

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be configured and at least 32 characters.");
  }
  return secret;
}

export function createAdminSessionValue(now = Date.now()): string {
  const payload: AdminSessionPayload = {
    role: "admin",
    exp: now + SESSION_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = hmacSha256(encoded, getAuthSecret());
  return `${encoded}.${signature}`;
}

export function verifyAdminSessionValue(value: string | undefined): boolean {
  if (!value) return false;

  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return false;

  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    return false;
  }

  if (payload.role !== "admin" || payload.exp < Date.now()) return false;

  const expected = hmacSha256(encoded, getAuthSecret());
  return safeEqual(signature, expected);
}

export function setAdminSessionCookie(): void {
  cookies().set(ADMIN_COOKIE, createAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_MS / 1000,
    path: "/",
  });
}

export function clearAdminSessionCookie(): void {
  cookies().delete(ADMIN_COOKIE);
}

export function isAdminAuthenticated(): boolean {
  const value = cookies().get(ADMIN_COOKIE)?.value;
  try {
    return verifyAdminSessionValue(value);
  } catch {
    return false;
  }
}

export function requireAdmin(): void {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }
}
