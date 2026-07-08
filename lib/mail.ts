import nodemailer from "nodemailer";
import { CONTACT_EMAIL, EMAIL_FROM, OWNER_EMAIL, SITE_URL } from "./contact";
import type { ReservationInput } from "./reservation-schema";
import type { ReservationRecord } from "./reservation-store";

function getTransport() {
  const user = process.env.GMAIL_USER || CONTACT_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!pass) {
    throw new Error("GMAIL_APP_PASSWORD is not configured.");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

function escapeHtml(value: string | number | null | undefined): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rows(items: { label: string; value?: string | number | null }[]): string {
  return items
    .filter((item) => item.value !== undefined && item.value !== null && item.value !== "")
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;color:#766b62;font-size:13px">${escapeHtml(
            item.label
          )}</td>
          <td style="padding:10px 0;color:#221915;font-size:14px;text-align:right;font-weight:600">${escapeHtml(
            item.value
          )}</td>
        </tr>`
    )
    .join("");
}

function shell(content: string): string {
  return `
    <div style="margin:0;background:#f6f0e8;padding:32px 16px;font-family:Inter,Arial,sans-serif;color:#221915">
      <div style="max-width:640px;margin:0 auto;background:#fffaf4;border:1px solid #e7dacc;border-radius:16px;overflow:hidden">
        <div style="padding:28px 32px;border-bottom:1px solid #eadfd4;background:#fff">
          <div style="font-family:Georgia,serif;font-size:28px;color:#6e1e2c">Weselna Furka</div>
          <div style="margin-top:4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#b88a44">Auta z kierowcą na wesele</div>
        </div>
        <div style="padding:30px 32px">${content}</div>
        <div style="padding:20px 32px;background:#221915;color:#f6f0e8;font-size:13px">
          Kontakt: <a href="mailto:${CONTACT_EMAIL}" style="color:#f6f0e8">${CONTACT_EMAIL}</a>
        </div>
      </div>
    </div>`;
}

function ownerHtml(record: ReservationRecord, input: ReservationInput): string {
  return shell(`
    <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:32px;font-weight:500;color:#221915">Nowe zgłoszenie rezerwacji</h1>
    <p style="margin:0 0 24px;color:#5c514a;font-size:15px;line-height:1.6">Klient wysłał formularz ze strony. Odpowiedz bezpośrednio na tego maila - adres klienta jest ustawiony jako Reply-To.</p>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #eadfd4;border-bottom:1px solid #eadfd4">
      ${rows([
        { label: "Imię i nazwisko", value: input.name },
        { label: "E-mail", value: input.email },
        { label: "Telefon", value: input.phone },
        { label: "Termin", value: formatDate(input.date) },
        { label: "Oferta", value: input.title },
        { label: "Adres odbioru", value: input.pickup },
        { label: "Szacowana kwota", value: input.total ? `${input.total} zł netto` : null },
        { label: "Trasa", value: input.stops.join(" -> ") },
        { label: "Dodatki", value: input.addons.join(", ") },
        { label: "Wycena indywidualna", value: input.custom ? "tak" : "nie" },
      ])}
    </table>
    ${
      input.notes
        ? `<p style="margin:24px 0 0;color:#221915;font-size:14px;line-height:1.6"><strong>Wiadomość:</strong><br>${escapeHtml(
            input.notes
          )}</p>`
        : ""
    }
    <p style="margin:24px 0 0;color:#766b62;font-size:13px">ID zgłoszenia: ${escapeHtml(record.id)}</p>
  `);
}

function customerHtml(input: ReservationInput): string {
  return shell(`
    <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:32px;font-weight:500;color:#221915">Dziękujemy za zgłoszenie</h1>
    <p style="margin:0 0 24px;color:#5c514a;font-size:15px;line-height:1.6">Otrzymaliśmy prośbę o rezerwację. Sprawdzimy termin i odezwiemy się mailowo albo telefonicznie. Zgłoszenie nie wymaga płatności i nie jest jeszcze potwierdzoną rezerwacją.</p>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #eadfd4;border-bottom:1px solid #eadfd4">
      ${rows([
        { label: "Termin", value: formatDate(input.date) },
        { label: "Wybór", value: input.title },
        { label: "Adres odbioru", value: input.pickup },
        { label: "Szacowana kwota", value: input.total ? `${input.total} zł netto` : null },
      ])}
    </table>
    <p style="margin:24px 0 0;color:#766b62;font-size:13px;line-height:1.6">Potwierdzenie rezerwacji następuje dopiero po indywidualnym kontakcie z naszej strony. Zasady zgłoszenia znajdziesz tutaj: <a href="${SITE_URL}/zasady-rezerwacji" style="color:#6e1e2c">${SITE_URL}/zasady-rezerwacji</a>.</p>
  `);
}

export async function sendReservationEmails(
  record: ReservationRecord,
  input: ReservationInput
): Promise<void> {
  const transport = getTransport();

  await transport.sendMail({
    from: EMAIL_FROM,
    to: OWNER_EMAIL,
    replyTo: input.email,
    subject: `Nowe zgłoszenie: ${input.name} - ${formatDate(input.date)}`,
    text: [
      `Nowe zgłoszenie rezerwacji`,
      `Imię i nazwisko: ${input.name}`,
      `E-mail: ${input.email}`,
      `Telefon: ${input.phone}`,
      `Termin: ${formatDate(input.date)}`,
      `Oferta: ${input.title}`,
      `Adres odbioru: ${input.pickup || "-"}`,
      `Trasa: ${input.stops.join(" -> ") || "-"}`,
      `Dodatki: ${input.addons.join(", ") || "-"}`,
      `Wiadomość: ${input.notes || "-"}`,
      `ID: ${record.id}`,
    ].join("\n"),
    html: ownerHtml(record, input),
  });

  await transport.sendMail({
    from: EMAIL_FROM,
    to: input.email,
    replyTo: OWNER_EMAIL,
    subject: "Otrzymaliśmy Wasze zgłoszenie - Weselna Furka",
    text: [
      "Dziękujemy za zgłoszenie.",
      "Sprawdzimy termin i odezwiemy się mailowo albo telefonicznie.",
      `Termin: ${formatDate(input.date)}`,
      `Wybór: ${input.title}`,
      "Zgłoszenie nie jest jeszcze potwierdzoną rezerwacją.",
    ].join("\n"),
    html: customerHtml(input),
  });
}
