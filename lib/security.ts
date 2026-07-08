import {
  createHmac,
  pbkdf2Sync,
  randomBytes,
  timingSafeEqual,
} from "crypto";

const HASH_ALGORITHM = "sha256";
const DEFAULT_ITERATIONS = 310000;
const KEY_LENGTH = 32;

export function hashAdminPassword(password: string): string {
  const salt = randomBytes(16).toString("base64");
  const derived = pbkdf2Sync(
    password,
    salt,
    DEFAULT_ITERATIONS,
    KEY_LENGTH,
    HASH_ALGORITHM
  ).toString("base64");

  return `pbkdf2_sha256$${DEFAULT_ITERATIONS}$${salt}$${derived}`;
}

export function verifyAdminPasswordHash(
  password: string,
  storedHash: string
): boolean {
  const [scheme, iterationsRaw, salt, expected] = storedHash.split("$");
  if (scheme !== "pbkdf2_sha256" || !iterationsRaw || !salt || !expected) {
    return false;
  }

  const iterations = Number(iterationsRaw);
  if (!Number.isInteger(iterations) || iterations < 100000) return false;

  const expectedBuffer = Buffer.from(expected, "base64");
  const actualBuffer = pbkdf2Sync(
    password,
    salt,
    iterations,
    expectedBuffer.length,
    HASH_ALGORITHM
  );

  return safeEqual(actualBuffer, expectedBuffer);
}

export function hmacSha256(value: string, secret: string): string {
  return createHmac(HASH_ALGORITHM, secret).update(value).digest("base64url");
}

export function safeEqual(a: string | Buffer, b: string | Buffer): boolean {
  const aBuffer = Buffer.isBuffer(a) ? a : Buffer.from(a);
  const bBuffer = Buffer.isBuffer(b) ? b : Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}

export function hashIdentifier(value: string, secret: string): string {
  return hmacSha256(value.trim().toLowerCase() || "unknown", secret);
}
