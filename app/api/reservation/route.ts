import { NextResponse } from "next/server";
import { hashClientIp } from "@/lib/request";
import { sendReservationEmails } from "@/lib/mail";
import { reservationInputSchema } from "@/lib/reservation-schema";
import {
  createReservation,
  isReservationRateLimited,
  recordReservationAttempt,
  updateReservationMailState,
} from "@/lib/reservation-store";

export async function POST(request: Request) {
  const ipHash = hashClientIp(request);

  try {
    if (await isReservationRateLimited(ipHash)) {
      return NextResponse.json(
        { ok: false, error: "Zbyt wiele prob. Sprobuj ponownie pozniej." },
        { status: 429 }
      );
    }

    const data = await request.json();
    const parsed = reservationInputSchema.safeParse(data);

    if (!parsed.success) {
      await recordReservationAttempt(ipHash, false);
      return NextResponse.json(
        { ok: false, error: "Sprawdzcie wymagane dane formularza." },
        { status: 400 }
      );
    }

    const reservation = await createReservation(parsed.data);
    await recordReservationAttempt(ipHash, true);

    try {
      await sendReservationEmails(reservation, parsed.data);
      await updateReservationMailState(reservation.id, "sent", "sent");
    } catch (error) {
      await updateReservationMailState(
        reservation.id,
        "failed",
        "failed",
        error instanceof Error ? error.message : "Unknown mail error"
      );
      console.error("[reservation] mail failed", error);
    }

    return NextResponse.json({ ok: true, id: reservation.id });
  } catch (error) {
    console.error("[reservation] failed", error);
    try {
      await recordReservationAttempt(ipHash, false);
    } catch {
      /* ignore secondary failure */
    }

    return NextResponse.json(
      { ok: false, error: "Nie udało się przetworzyć zgłoszenia." },
      { status: 500 }
    );
  }
}
