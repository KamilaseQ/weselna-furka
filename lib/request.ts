import { hashIdentifier } from "./security";

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function hashClientIp(request: Request): string {
  const secret = process.env.AUTH_SECRET || "development-only-auth-secret";
  return hashIdentifier(getClientIp(request), secret);
}
