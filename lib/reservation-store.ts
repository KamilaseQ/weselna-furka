import { getDb } from "./db";
import type { ReservationInput, ReservationStatus } from "./reservation-schema";

export interface ReservationRecord {
  id: string;
  status: ReservationStatus;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  event_date: string;
  pickup: string | null;
  notes: string | null;
  title: string;
  car_slug: string | null;
  route_stops: string[];
  addons: string[];
  km: number | null;
  quoted_total: number | null;
  is_custom: boolean;
  mail_owner_status: string;
  mail_customer_status: string;
  mail_error: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarBlock {
  id: string;
  event_date: string;
  car_slug: string | null;
  reason: string;
  created_at: string;
}

export async function createReservation(
  input: ReservationInput
): Promise<ReservationRecord> {
  const sql = getDb();
  const rows = (await sql`
    insert into reservations (
      customer_name,
      customer_email,
      customer_phone,
      event_date,
      pickup,
      notes,
      title,
      car_slug,
      route_stops,
      addons,
      km,
      quoted_total,
      is_custom,
      consent
    ) values (
      ${input.name},
      ${input.email},
      ${input.phone},
      ${input.date},
      ${input.pickup || null},
      ${input.notes || null},
      ${input.title},
      ${input.carSlug || null},
      ${JSON.stringify(input.stops)}::jsonb,
      ${JSON.stringify(input.addons)}::jsonb,
      ${input.km ?? null},
      ${input.total ?? null},
      ${input.custom},
      ${input.consent}
    )
    returning *
  `) as unknown as ReservationRecord[];

  return rows[0] as ReservationRecord;
}

export async function updateReservationMailState(
  id: string,
  ownerStatus: "sent" | "failed",
  customerStatus: "sent" | "failed",
  error?: string
): Promise<void> {
  const sql = getDb();
  await sql`
    update reservations
    set
      mail_owner_status = ${ownerStatus},
      mail_customer_status = ${customerStatus},
      mail_error = ${error || null},
      updated_at = now()
    where id = ${id}
  `;
}

export async function listReservations(): Promise<ReservationRecord[]> {
  const sql = getDb();
  const rows = (await sql`
    select *
    from reservations
    order by created_at desc
    limit 200
  `) as unknown as ReservationRecord[];
  return rows;
}

export async function listCalendarBlocks(): Promise<CalendarBlock[]> {
  const sql = getDb();
  const rows = (await sql`
    select *
    from calendar_blocks
    order by event_date asc, created_at desc
    limit 200
  `) as unknown as CalendarBlock[];
  return rows;
}

export async function updateReservationAdminFields(params: {
  id: string;
  status: ReservationStatus;
  adminNotes: string;
}): Promise<void> {
  const sql = getDb();
  await sql`
    update reservations
    set status = ${params.status},
        admin_notes = ${params.adminNotes || null},
        updated_at = now()
    where id = ${params.id}
  `;
}

export async function addCalendarBlock(params: {
  eventDate: string;
  carSlug?: string;
  reason: string;
}): Promise<void> {
  const sql = getDb();
  await sql`
    insert into calendar_blocks (event_date, car_slug, reason)
    values (${params.eventDate}, ${params.carSlug || null}, ${params.reason})
  `;
}

export async function deleteCalendarBlock(id: string): Promise<void> {
  const sql = getDb();
  await sql`delete from calendar_blocks where id = ${id}`;
}

export async function listUnavailableDates(params: {
  from: string;
  to: string;
  carSlug?: string;
}): Promise<{ date: string; carSlug: string | null; source: string; label: string }[]> {
  const sql = getDb();
  const carSlug = params.carSlug || null;
  const rows = (await sql`
    select event_date::text as date, car_slug, 'reservation' as source, title as label
    from reservations
    where status = 'confirmed'
      and event_date between ${params.from} and ${params.to}
      and (${carSlug}::text is null or car_slug = ${carSlug} or car_slug is null)
    union all
    select event_date::text as date, car_slug, 'block' as source, reason as label
    from calendar_blocks
    where event_date between ${params.from} and ${params.to}
      and (${carSlug}::text is null or car_slug = ${carSlug} or car_slug is null)
    order by date asc
  `) as unknown as {
    date: string;
    carSlug: string | null;
    source: string;
    label: string;
  }[];

  return rows;
}

export async function isReservationRateLimited(ipHash: string): Promise<boolean> {
  const sql = getDb();
  const rows = (await sql`
    select count(*)::int as count
    from reservation_attempts
    where ip_hash = ${ipHash}
      and created_at > now() - interval '1 hour'
  `) as unknown as { count: number }[];
  return Number(rows[0]?.count || 0) >= 10;
}

export async function recordReservationAttempt(
  ipHash: string,
  success: boolean
): Promise<void> {
  const sql = getDb();
  await sql`
    insert into reservation_attempts (ip_hash, success)
    values (${ipHash}, ${success})
  `;
}

export async function isAdminLoginRateLimited(ipHash: string): Promise<boolean> {
  const sql = getDb();
  const rows = (await sql`
    select count(*)::int as count
    from admin_login_attempts
    where ip_hash = ${ipHash}
      and success = false
      and created_at > now() - interval '15 minutes'
  `) as unknown as { count: number }[];
  return Number(rows[0]?.count || 0) >= 5;
}

export async function recordAdminLoginAttempt(
  ipHash: string,
  success: boolean
): Promise<void> {
  const sql = getDb();
  await sql`
    insert into admin_login_attempts (ip_hash, success)
    values (${ipHash}, ${success})
  `;
}
