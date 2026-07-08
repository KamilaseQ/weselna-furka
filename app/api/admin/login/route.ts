import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_TTL_MS,
  createAdminSessionValue,
} from "@/lib/admin-auth";
import { hashClientIp } from "@/lib/request";
import { verifyAdminPasswordHash } from "@/lib/security";
import {
  isAdminLoginRateLimited,
  recordAdminLoginAttempt,
} from "@/lib/reservation-store";

function redirectTo(request: Request, path: string): NextResponse {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function POST(request: Request) {
  const ipHash = hashClientIp(request);

  try {
    if (await isAdminLoginRateLimited(ipHash)) {
      return redirectTo(request, "/admin/login?error=limited");
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    if (!storedHash) {
      await recordAdminLoginAttempt(ipHash, false);
      return redirectTo(request, "/admin/login?error=config");
    }

    const form = await request.formData();
    const password = String(form.get("password") || "");
    const ok = verifyAdminPasswordHash(password, storedHash);

    await recordAdminLoginAttempt(ipHash, ok);

    if (!ok) {
      return redirectTo(request, "/admin/login?error=invalid");
    }

    const response = redirectTo(request, "/admin");
    response.cookies.set(ADMIN_COOKIE, createAdminSessionValue(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TTL_MS / 1000,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("[admin-login] failed", error);
    return redirectTo(request, "/admin/login?error=config");
  }
}
