import { z } from "zod";

export const reservationStatuses = ["new", "confirmed", "declined"] as const;
export type ReservationStatus = (typeof reservationStatuses)[number];

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Nieprawidlowy format daty.");

export const reservationInputSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(180),
    phone: z.string().trim().min(6).max(40),
    pickup: z.string().trim().max(300).optional().default(""),
    date: isoDateSchema,
    notes: z.string().trim().max(2000).optional().default(""),
    consent: z.literal(true),
    website: z.string().trim().max(0).optional().default(""),
    title: z.string().trim().min(1).max(180),
    carSlug: z.string().trim().max(80).optional(),
    stops: z.array(z.string().trim().max(300)).max(8).optional().default([]),
    km: z.coerce.number().int().min(0).max(2000).optional(),
    addons: z.array(z.string().trim().max(120)).max(20).optional().default([]),
    total: z.coerce.number().int().min(0).max(100000).optional(),
    custom: z.coerce.boolean().optional().default(false),
  })
  .superRefine((value, ctx) => {
    const date = new Date(`${value.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(date.getTime()) || date < today) {
      ctx.addIssue({
        code: "custom",
        path: ["date"],
        message: "Termin nie moze byc z przeszlosci.",
      });
    }
  });

export type ReservationInput = z.infer<typeof reservationInputSchema>;

export function isReservationStatus(value: string): value is ReservationStatus {
  return reservationStatuses.includes(value as ReservationStatus);
}
