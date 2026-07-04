"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cars, visibleCars } from "@/data/cars";
import { addons } from "@/data/addons";
import { packageTiers } from "@/data/packages";
import { packageImages, getCarImages } from "@/data/images";
import type { GeneratedImage } from "@/data/images";
import { DateField } from "./DateField";
import { formatPolishDate } from "./Calendar";
import { formatPLNShort } from "@/lib/format";
import {
  CheckIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  ArrowRight,
} from "./icons";

const CONTACT_EMAIL = "kontakt@weselnafurka.pl";
const CONTACT_WA = "48555123456";

interface ResolvedConfig {
  kind: "config" | "package";
  title: string;
  carSlug?: string;
  date: string;
  hours?: number;
  /** ordered route stops from the configurator */
  stops: string[];
  km?: number;
  addonNames: string[];
  total: number;
  priceLabel: string;
  image?: GeneratedImage;
}

function useResolved(): ResolvedConfig {
  const p = useSearchParams();

  const packageId = p.get("package");
  if (packageId) {
    const pkg = packageTiers.find((x) => x.id === packageId) ?? packageTiers[0];
    const image = packageImages[pkg.id as keyof typeof packageImages] ?? packageImages.basic;

    return {
      kind: "package",
      title: `Pakiet ${pkg.name}`,
      date: p.get("date") || "",
      stops: [],
      addonNames: pkg.summary,
      total: pkg.priceFrom,
      priceLabel: "od",
      image,
    };
  }

  const car = cars.find((c) => c.slug === p.get("car")) ?? visibleCars[0];
  const addonIds = (p.get("addons") || "").split(",").filter(Boolean);

  return {
    kind: "config",
    title: car.name,
    carSlug: car.slug,
    date: p.get("date") || "",
    hours: Number(p.get("hours") || 8),
    stops: (p.get("stops") || "").split("|").filter(Boolean),
    km: Number(p.get("km") || 0),
    addonNames: addonIds
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[],
    total: Number(p.get("total") || car.basePrice),
    priceLabel: "",
    image: getCarImages(car.slug).cover,
  };
}

export function ReservationForm() {
  const cfg = useResolved();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickup: cfg.stops[0] || "",
    date: cfg.date || "",
    notes: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const message = useMemo(() => {
    const L: string[] = [];
    L.push("Cześć! Chcielibyśmy poprosić o rezerwację auta na wesele.");
    L.push("");
    L.push(`• Auto / pakiet: ${cfg.title}`);
    if (form.date)
      L.push(`• Data ślubu: ${formatPolishDate(form.date) || form.date}`);
    if (cfg.hours) L.push(`• Czas wynajmu: ${cfg.hours} h`);
    if (cfg.stops.length)
      L.push(
        `• Trasa: ${cfg.stops
          .map((s, i) => `${i + 1}. ${s}`)
          .join(" → ")}${cfg.km ? ` (ok. ${cfg.km} km)` : ""}`
      );
    if (cfg.addonNames.length)
      L.push(`• Dodatki: ${cfg.addonNames.join(", ")}`);
    L.push(
      `• Cena: ${cfg.priceLabel ? `${cfg.priceLabel} ` : ""}${formatPLNShort(cfg.total)} (kierowca w cenie)`
    );
    L.push("");
    L.push("Dane kontaktowe:");
    L.push(`• Imię i nazwisko: ${form.name || "—"}`);
    L.push(`• E-mail: ${form.email || "—"}`);
    L.push(`• Telefon: ${form.phone || "—"}`);
    L.push(`• Adres odbioru: ${form.pickup || "—"}`);
    if (form.notes) L.push(`• Uwagi: ${form.notes}`);
    L.push("");
    L.push("Proszę o potwierdzenie dostępności. Dziękujemy!");
    return L.join("\n");
  }, [cfg, form]);

  const valid =
    form.name.trim() && form.phone.trim() && form.email.trim() && form.consent;

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Prośba o rezerwację — ${cfg.title}`
  )}&body=${encodeURIComponent(message)}`;
  const waHref = `https://wa.me/${CONTACT_WA}?text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      /* ignore */
    }
  };

  if (submitted) {
    return (
      <div className="site-container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-avail/15 text-avail">
            <CheckIcon className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-4xl text-ink sm:text-5xl">
            Prośba jest gotowa.
          </h1>
          <p className="mt-4 text-[17px] text-ink-muted">
            Wszystkie dane są zebrane. Wyślijcie wiadomość jednym z kanałów —
            potwierdzimy termin tego samego dnia. Płatność dopiero po
            potwierdzeniu.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={mailtoHref} className="btn-primary w-full">
              <MailIcon className="h-4 w-4" />
              Wyślij e-mailem
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn-dark w-full"
            >
              <PhoneIcon className="h-4 w-4" />
              Wyślij przez WhatsApp
            </a>
          </div>

          <div className="mt-6 rounded-2xl border border-ink/10 bg-white/60 p-5 text-left">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider2 text-ink-faint">
                Podgląd wiadomości
              </p>
              <button
                onClick={copy}
                className="text-sm font-medium text-ink underline underline-offset-4"
              >
                Skopiuj
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink-soft">
              {message}
            </pre>
          </div>

          <p className="mt-6 text-sm text-ink-faint">
            To wersja demonstracyjna — wiadomość przygotowujemy lokalnie i
            otwieramy w Twojej aplikacji pocztowej / WhatsApp.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm text-ink-muted underline underline-offset-4">
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-container py-14">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Rezerwacja</p>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">
          Dane do rezerwacji
        </h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <LockIcon className="h-4 w-4 text-avail" />
          Płatność dopiero po potwierdzeniu terminu.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          {/* form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setSubmitted(true);
            }}
          >
            <div className="space-y-6">
              <div>
                <label className="field-label">Imię i nazwisko *</label>
                <input
                  className="field"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Imię i nazwisko"
                  required
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="field-label">E-mail *</label>
                  <input
                    type="email"
                    className="field"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="adres@email.pl"
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Telefon *</label>
                  <input
                    type="tel"
                    className="field"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+48 123 456 789"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="field-label">Data ślubu</label>
                  <DateField
                    value={form.date}
                    onChange={(iso) => set("date", iso)}
                  />
                </div>
                <div>
                  <label className="field-label">Adres odbioru</label>
                  <input
                    className="field"
                    value={form.pickup}
                    onChange={(e) => set("pickup", e.target.value)}
                    placeholder="Wpisz adres odbioru"
                  />
                </div>
              </div>
              <div>
                <label className="field-label">
                  Uwagi <span className="text-ink-faint">(opcjonalnie)</span>
                </label>
                <textarea
                  className="field min-h-[110px] resize-y"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Dodatkowe informacje, życzenia, wskazówki…"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-5 w-5 accent-wine"
                />
                <span>
                  Akceptuję{" "}
                  <span className="underline underline-offset-2">Regulamin</span> i{" "}
                  <span className="underline underline-offset-2">
                    Politykę prywatności
                  </span>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={!valid}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                Poproś o rezerwację
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-xs text-ink-faint">
                Zapytanie jest niezobowiązujące — płacicie dopiero po
                potwierdzeniu terminu.
              </p>
            </div>
          </form>

          {/* order summary */}
          <aside className="lg:sticky lg:top-[96px] lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
              {cfg.image && (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={cfg.image.src}
                    alt={cfg.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 460px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-8">
                <h2 className="font-serif text-3xl text-ink">{cfg.title}</h2>
                {cfg.kind === "config" && (
                  <p className="mt-1 text-sm text-ink-muted">
                    Biała perła · kierowca w cenie
                  </p>
                )}

                <dl className="mt-7 space-y-6">
                  {form.date && (
                    <SummaryBlock label="Termin">
                      {formatPolishDate(form.date) || form.date}
                    </SummaryBlock>
                  )}
                  {cfg.hours ? (
                    <SummaryBlock label="Czas wynajmu">
                      {cfg.hours} godzin
                    </SummaryBlock>
                  ) : null}
                  {cfg.stops.length > 0 && (
                    <SummaryBlock label="Trasa">
                      <ol className="space-y-1.5">
                        {cfg.stops.map((s, i) => (
                          <li key={`${s}-${i}`} className="flex gap-2.5">
                            <span className="font-serif italic text-gold">
                              {i + 1}.
                            </span>
                            {s}
                          </li>
                        ))}
                      </ol>
                      {cfg.km ? (
                        <p className="mt-2 text-xs text-ink-faint">
                          ok. {cfg.km} km
                        </p>
                      ) : null}
                    </SummaryBlock>
                  )}
                  {cfg.addonNames.length > 0 && (
                    <SummaryBlock
                      label={cfg.kind === "package" ? "W pakiecie" : "Dodatki"}
                    >
                      <ul className="space-y-1.5">
                        {cfg.addonNames.map((a) => (
                          <li key={a} className="flex items-center gap-2.5">
                            <CheckIcon className="h-4 w-4 shrink-0 text-wine" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </SummaryBlock>
                  )}
                </dl>

                <div className="mt-8 flex items-end justify-between border-t border-ink/10 pt-6">
                  <div>
                    <p className="text-sm text-ink-muted">Razem</p>
                    <p className="text-xs text-ink-faint">kierowca w cenie</p>
                  </div>
                  <p className="font-serif text-4xl text-ink">
                    {cfg.priceLabel && (
                      <span className="text-base text-ink-muted">
                        {cfg.priceLabel}{" "}
                      </span>
                    )}
                    {formatPLNShort(cfg.total)}
                  </p>
                </div>

                <Link
                  href={cfg.carSlug ? `/konfigurator?car=${cfg.carSlug}` : "/konfigurator"}
                  className="mt-5 block text-center text-sm text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
                >
                  Zmień konfigurację
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SummaryBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-ink/8 pt-5 first:border-t-0 first:pt-0">
      <dt className="text-[11px] font-medium uppercase tracking-wider2 text-ink-faint">
        {label}
      </dt>
      <dd className="mt-2 text-[15px] leading-relaxed text-ink">{children}</dd>
    </div>
  );
}
