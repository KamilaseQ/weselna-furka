import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { visibleCars } from "@/data/cars";
import {
  addCalendarBlockAction,
  deleteCalendarBlockAction,
  updateReservationAction,
} from "./actions";
import {
  listCalendarBlocks,
  listReservations,
  type CalendarBlock,
  type ReservationRecord,
} from "@/lib/reservation-store";
import type { ReservationStatus } from "@/lib/reservation-schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Weselna Furka",
  robots: { index: false, follow: false },
};

const statusLabels: Record<ReservationStatus, string> = {
  new: "Nowe",
  confirmed: "Potwierdzone",
  declined: "Odrzucone",
};

function dateLabel(value: string | Date) {
  const date =
    value instanceof Date
      ? value
      : new Date(`${String(value).slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function carName(slug?: string | null) {
  if (!slug) return "Wszystkie auta";
  return visibleCars.find((car) => car.slug === slug)?.name ?? slug;
}

export default async function AdminPage() {
  requireAdmin();
  const [reservations, blocks] = await Promise.all([
    listReservations(),
    listCalendarBlocks(),
  ]);

  const confirmedCount = reservations.filter(
    (reservation) => reservation.status === "confirmed"
  ).length;

  return (
    <section className="site-container py-10">
      <div className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-3 font-serif text-5xl text-ink">Rezerwacje</h1>
          <p className="mt-2 text-sm text-ink-muted">
            {reservations.length} zgłoszeń, {confirmedCount} potwierdzonych.
          </p>
        </div>
        <form action="/admin/logout" method="post">
          <button className="btn-ghost" type="submit">
            Wyloguj
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {reservations.length === 0 ? (
            <div className="surface-card p-6 text-sm text-ink-muted">
              Brak zgłoszeń.
            </div>
          ) : (
            reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-[96px] lg:h-fit">
          <div className="surface-card p-5">
            <h2 className="font-serif text-2xl text-ink">Dodaj blokade</h2>
            <form action={addCalendarBlockAction} className="mt-5 space-y-4">
              <div>
                <label className="field-label" htmlFor="eventDate">
                  Data
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  className="field"
                  required
                />
              </div>
              <div>
                <label className="field-label" htmlFor="carSlug">
                  Auto
                </label>
                <select id="carSlug" name="carSlug" className="field">
                  <option value="all">Wszystkie auta</option>
                  {visibleCars.map((car) => (
                    <option key={car.slug} value={car.slug}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="reason">
                  Powód
                </label>
                <input
                  id="reason"
                  name="reason"
                  className="field"
                  placeholder="np. rezerwacja telefoniczna"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Zablokuj termin
              </button>
            </form>
          </div>

          <CalendarBlocks blocks={blocks} />
        </aside>
      </div>
    </section>
  );
}

function ReservationCard({ reservation }: { reservation: ReservationRecord }) {
  return (
    <article className="surface-card p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-cream-50">
              {statusLabels[reservation.status]}
            </span>
            <span className="text-xs text-ink-faint">
              {new Date(reservation.created_at).toLocaleString("pl-PL")}
            </span>
          </div>
          <h2 className="mt-3 font-serif text-2xl text-ink">
            {reservation.customer_name}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {reservation.title} - {dateLabel(reservation.event_date)}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a className="text-wine underline underline-offset-4" href={`mailto:${reservation.customer_email}`}>
              {reservation.customer_email}
            </a>
            <a className="text-wine underline underline-offset-4" href={`tel:${reservation.customer_phone}`}>
              {reservation.customer_phone}
            </a>
          </div>
        </div>

        <div className="text-sm text-ink-muted md:text-right">
          <p>{carName(reservation.car_slug)}</p>
          {reservation.quoted_total ? <p>{reservation.quoted_total} zł netto</p> : null}
          {reservation.is_custom ? <p>Wycena indywidualna</p> : null}
        </div>
      </div>

      <dl className="mt-5 grid gap-3 border-t border-ink/8 pt-4 text-sm sm:grid-cols-2">
        {reservation.pickup ? <Info label="Adres" value={reservation.pickup} /> : null}
        {reservation.route_stops?.length ? (
          <Info label="Trasa" value={reservation.route_stops.join(" -> ")} />
        ) : null}
        {reservation.addons?.length ? (
          <Info label="Dodatki" value={reservation.addons.join(", ")} />
        ) : null}
        {reservation.notes ? <Info label="Wiadomość" value={reservation.notes} /> : null}
        {reservation.mail_error ? (
          <Info label="Blad maila" value={reservation.mail_error} />
        ) : null}
      </dl>

      <form action={updateReservationAction} className="mt-5 grid gap-4 md:grid-cols-[180px_1fr_auto]">
        <input type="hidden" name="id" value={reservation.id} />
        <select name="status" defaultValue={reservation.status} className="field">
          <option value="new">Nowe</option>
          <option value="confirmed">Potwierdzone</option>
          <option value="declined">Odrzucone</option>
        </select>
        <input
          name="adminNotes"
          defaultValue={reservation.admin_notes || ""}
          className="field"
          placeholder="Notatka admina"
        />
        <button type="submit" className="btn-primary">
          Zapisz
        </button>
      </form>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider2 text-ink-faint">
        {label}
      </dt>
      <dd className="mt-1 text-ink-soft">{value}</dd>
    </div>
  );
}

function CalendarBlocks({ blocks }: { blocks: CalendarBlock[] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-2xl text-ink">Blokady</h2>
        <Link href="/konfigurator" className="text-sm text-wine underline underline-offset-4">
          Podglad
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        {blocks.length === 0 ? (
          <p className="text-sm text-ink-muted">Brak recznych blokad.</p>
        ) : (
          blocks.map((block) => (
            <div key={block.id} className="rounded-xl border border-ink/10 bg-white/60 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{dateLabel(block.event_date)}</p>
                  <p className="text-sm text-ink-muted">{carName(block.car_slug)}</p>
                  <p className="mt-1 text-xs text-ink-faint">{block.reason}</p>
                </div>
                <form action={deleteCalendarBlockAction}>
                  <input type="hidden" name="id" value={block.id} />
                  <button type="submit" className="text-xs text-wine underline underline-offset-4">
                    Usuń
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
