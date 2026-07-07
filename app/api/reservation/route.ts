import { NextResponse } from "next/server";

/**
 * Reservation request endpoint. Receives the completed configuration + contact
 * details and (in production) fires the confirmation e-mail to the team and the
 * couple. Wiring to a real mail provider (Resend / SMTP) is a drop-in here —
 * for now we validate the payload and acknowledge so the UI flow works
 * end-to-end.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const name = String(data?.name || "").trim();
    const phone = String(data?.phone || "").trim();
    const email = String(data?.email || "").trim();

    if (!name || !phone || !email) {
      return NextResponse.json(
        { ok: false, error: "Brak wymaganych danych." },
        { status: 400 }
      );
    }

    // TODO: send confirmation e-mail via mail provider using `data`.
    // Logged server-side until the provider is connected.
    console.info("[reservation] new request", {
      name,
      email,
      phone,
      title: data?.title,
      date: data?.date,
      total: data?.total,
      custom: data?.custom,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Nie udało się przetworzyć zgłoszenia." },
      { status: 400 }
    );
  }
}
