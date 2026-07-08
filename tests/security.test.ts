import { describe, expect, it } from "vitest";
import {
  hashAdminPassword,
  hashIdentifier,
  verifyAdminPasswordHash,
} from "../lib/security";

describe("admin password hashing", () => {
  it("verifies the correct password and rejects a wrong one", () => {
    const hash = hashAdminPassword("very-secure-password");

    expect(verifyAdminPasswordHash("very-secure-password", hash)).toBe(true);
    expect(verifyAdminPasswordHash("wrong-password", hash)).toBe(false);
  });
});

describe("identifier hashing", () => {
  it("is stable and keyed by secret", () => {
    expect(hashIdentifier("127.0.0.1", "secret-a")).toBe(
      hashIdentifier("127.0.0.1", "secret-a")
    );
    expect(hashIdentifier("127.0.0.1", "secret-a")).not.toBe(
      hashIdentifier("127.0.0.1", "secret-b")
    );
  });
});
