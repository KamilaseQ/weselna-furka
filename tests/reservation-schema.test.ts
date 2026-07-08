import { describe, expect, it } from "vitest";
import { reservationInputSchema } from "../lib/reservation-schema";

const validInput = {
  name: "Anna Kowalska",
  email: "anna@example.com",
  phone: "+48 500 100 200",
  date: "2999-06-12",
  title: "Mercedes-Benz S-Klasa",
  consent: true,
  stops: ["Warszawa", "Konstancin"],
  addons: ["Tablica slubna"],
  total: 2500,
  custom: false,
};

describe("reservationInputSchema", () => {
  it("accepts a valid reservation request", () => {
    const result = reservationInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("requires consent", () => {
    const result = reservationInputSchema.safeParse({
      ...validInput,
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a past date", () => {
    const result = reservationInputSchema.safeParse({
      ...validInput,
      date: "2020-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("rejects the honeypot field", () => {
    const result = reservationInputSchema.safeParse({
      ...validInput,
      website: "spam",
    });
    expect(result.success).toBe(false);
  });
});
