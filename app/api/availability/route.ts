import { NextResponse } from "next/server";
import { z } from "zod";
import { listUnavailableDates } from "@/lib/reservation-store";

const availabilityQuerySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  carSlug: z.string().trim().max(80).optional(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = availabilityQuerySchema.safeParse({
    from: url.searchParams.get("from"),
    to: url.searchParams.get("to"),
    carSlug: url.searchParams.get("carSlug") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Nieprawidlowy zakres dat." },
      { status: 400 }
    );
  }

  try {
    const unavailable = await listUnavailableDates(parsed.data);
    return NextResponse.json({
      ok: true,
      unavailable,
      dates: Array.from(new Set(unavailable.map((item) => item.date))),
    });
  } catch (error) {
    console.error("[availability] failed", error);
    return NextResponse.json(
      { ok: false, error: "Nie udało się pobrać dostępności." },
      { status: 500 }
    );
  }
}
