"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { visibleCars } from "@/data/cars";
import { addons } from "@/data/addons";
import { getCarImages } from "@/data/images";
import type { GeneratedImage } from "@/data/images";
import { DateField } from "./DateField";
import { formatPolishDate } from "./Calendar";
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/contact";
import { formatPLNShort } from "@/lib/format";
import {
  CheckIcon,
  PhoneIcon,
  LockIcon,
  ArrowRight,
  ShareIcon,
} from "./icons";

interface ResolvedConfig {
  title: string;
  carSlug?: string;
  date: string;
  /** ordered route stops from the configurator */
  stops: string[];
  km?: number;
  addonNames: string[];
  total: number;
  priceLabel: string;
  /** custom route / other → priced individually, no fixed total shown */
  individual: boolean;
  image?: GeneratedImage;
}

function useResolved(): ResolvedConfig {
  const p = useSearchParams();

  const car = visibleCars.find((c) => c.slug === p.get("car")) ?? visibleCars[0];
  const addonIds = (p.get("addons") || "").split(",").filter(Boolean);
  const individual = p.get("custom") === "1";

  return {
    title: car.name,
    carSlug: car.slug,
    date: p.get("date") || "",
    stops: (p.get("stops") || "").split("|").filter(Boolean),
    km: Number(p.get("km") || 0),
    addonNames: addonIds
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[],
    total: Number(p.get("total") || car.basePrice),
    priceLabel: "",
    individual,
    image: getCarImages(car.slug).cover,
  };
}

type Stage = "form" | "review" | "sent";

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
    website: "",
  });
  const [stage, setStage] = useState<Stage>("form");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [shareCopied, setShareCopied] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  useEffect(() => {
    if (!cfg.carSlug || !form.date) {
      setUnavailableDates([]);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      from: form.date,
      to: form.date,
      carSlug: cfg.carSlug,
    });

    fetch(`/api/availability?${params.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) =>
        setUnavailableDates(Array.isArray(data?.dates) ? data.dates : [])
      )
      .catch(() => {
        if (!controller.signal.aborted) setUnavailableDates([]);
      });

    return () => controller.abort();
  }, [cfg.carSlug, form.date]);

  const dateUnavailable = Boolean(
    form.date && unavailableDates.includes(form.date)
  );
  const valid =
    form.name.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    form.date.trim() &&
    form.consent &&
    !dateUnavailable;

  /** copy the full request link so a partner can review the same configuration */
  const shareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2200);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const submitRequest = async () => {
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          title: cfg.title,
          stops: cfg.stops,
          km: cfg.km,
          addons: cfg.addonNames,
          total: cfg.total,
          custom: cfg.individual,
          carSlug: cfg.carSlug,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStage("sent");
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSendError(
        "Nie udało się wysłać zgłoszenia. Spróbujcie ponownie lub zadzwońcie do nas."
      );
    } finally {
      setSending(false);
    }
  };

  /* ——— sent: thank-you + call ——— */
  if (stage === "sent") {
    return (
      <div className="site-container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-avail/15 text-avail">
            <CheckIcon className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-4xl text-ink sm:text-5xl">
            Dziękujemy — zgłoszenie wysłane!
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
            Właśnie dotarła do nas Wasza prośba o rezerwację. Niedługo się
            odezwiemy i potwierdzimy termin. Nic już nie musicie robić — my
            zajmujemy się resztą. Płatność dopiero po potwierdzeniu.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={CONTACT_PHONE_HREF} className="btn-primary w-full sm:w-auto">
              <PhoneIcon className="h-4 w-4" />
              Zadzwoń: {CONTACT_PHONE}
            </a>
            <Link href="/" className="btn-ghost w-full sm:w-auto">
              Wróć na stronę główną
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-faint">
            Chcecie coś dopowiedzieć od razu? Zadzwońcie — odbierze osoba, która
            poprowadzi Waszą rezerwację.
          </p>
        </div>
      </div>
    );
  }

  const editing = stage === "form";

  return (
    <div className="site-container py-14">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Rezerwacja</p>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">
          {editing ? "Dane do rezerwacji" : "Wszystko gotowe"}
        </h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <LockIcon className="h-4 w-4 text-avail" />
          {editing
            ? "Płatność dopiero po potwierdzeniu terminu."
            : "Sprawdźcie swoje dane i wyślijcie zgłoszenie."}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          {/* left column */}
          <div>
            {editing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (valid) {
                    setStage("review");
                    if (typeof window !== "undefined")
                      window.scrollTo({ top: 0, behavior: "smooth" });
                  }
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
                      <label className="field-label">Data ślubu *</label>
                      <DateField
                        value={form.date}
                        onChange={(iso) => set("date", iso)}
                        disabledDates={unavailableDates}
                      />
                      {dateUnavailable && (
                        <p className="mt-2 text-sm text-wine">
                          Ten termin jest już zablokowany dla wybranego auta.
                        </p>
                      )}
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
                      Dodatkowa wiadomość{" "}
                      <span className="text-ink-faint">(opcjonalnie)</span>
                    </label>
                    <textarea
                      className="field min-h-[110px] resize-y"
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Cokolwiek chcecie nam przekazać — życzenia, wskazówki, pytania…"
                    />
                  </div>

                  {/* share-link option lives here, at data entry */}
                  <div className="rounded-2xl border border-ink/10 bg-white/50 p-5">
                    <p className="text-sm font-medium text-ink">
                      Chcecie skonsultować to z drugą osobą?
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Wyślijcie link do tego zgłoszenia — otworzy się z całą
                      Waszą konfiguracją.
                    </p>
                    <button
                      type="button"
                      onClick={shareLink}
                      className="btn-ghost mt-3 w-full sm:w-auto"
                    >
                      <ShareIcon className="h-4 w-4" />
                      {shareCopied ? "Link skopiowany" : "Skopiuj link do zgłoszenia"}
                    </button>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-ink-soft">
                    <input
                      type="text"
                      value={form.website}
                      onChange={(e) => set("website", e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-0.5 h-5 w-5 accent-wine"
                    />
                    <span>
                      Akceptuję{" "}
                      <Link
                        href="/zasady-rezerwacji"
                        className="underline underline-offset-2"
                      >
                        zasady zgłoszenia
                      </Link>{" "}
                      i zapoznałem/am się z{" "}
                      <Link
                        href="/polityka-prywatnosci"
                        className="underline underline-offset-2"
                      >
                        polityką prywatności
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!valid}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Dalej — sprawdź dane
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-ink-faint">
                    Zapytanie jest niezobowiązujące — płacicie dopiero po
                    potwierdzeniu terminu.
                  </p>
                </div>
              </form>
            ) : (
              /* review stage — recap of contact data + one send button */
              <div>
                <div className="surface-card p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-wider2 text-ink-faint">
                    Wasze dane
                  </p>
                  <dl className="mt-4 space-y-4">
                    <ReviewRow label="Imię i nazwisko" value={form.name} />
                    <ReviewRow label="E-mail" value={form.email} />
                    <ReviewRow label="Telefon" value={form.phone} />
                    {form.date && (
                      <ReviewRow
                        label="Data ślubu"
                        value={formatPolishDate(form.date) || form.date}
                      />
                    )}
                    {form.pickup && (
                      <ReviewRow label="Adres odbioru" value={form.pickup} />
                    )}
                    {form.notes && (
                      <ReviewRow label="Dodatkowa wiadomość" value={form.notes} />
                    )}
                  </dl>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={submitRequest}
                    disabled={sending}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {sending ? "Wysyłamy…" : "Wyślij zgłoszenie"}
                    {!sending && <ArrowRight className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStage("form")}
                    className="btn-ghost w-full"
                  >
                    Wróć i popraw dane
                  </button>
                  {sendError && (
                    <p className="text-center text-sm text-wine">{sendError}</p>
                  )}
                  <p className="text-center text-xs text-ink-faint">
                    Po wysłaniu potwierdzimy termin. Płatność dopiero po
                    potwierdzeniu.
                  </p>
                </div>
              </div>
            )}
          </div>

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
                <p className="mt-1 text-sm text-ink-muted">
                  Biała perła · kierowca w cenie
                </p>

                <dl className="mt-7 space-y-6">
                  {form.date && (
                    <SummaryBlock label="Termin">
                      {formatPolishDate(form.date) || form.date}
                    </SummaryBlock>
                  )}
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
                      {cfg.individual ? (
                        <p className="mt-2 text-xs text-ink-faint">
                          Trasa niestandardowa — wycena indywidualna
                        </p>
                      ) : cfg.km ? (
                        <p className="mt-2 text-xs text-ink-faint">
                          ok. {cfg.km} km
                        </p>
                      ) : null}
                    </SummaryBlock>
                  )}
                  {cfg.addonNames.length > 0 && (
                    <SummaryBlock label="Dodatki">
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
                    <p className="text-xs text-ink-faint">
                      kierowca w cenie · ceny netto
                    </p>
                  </div>
                  <p
                    className={`font-serif text-ink ${
                      cfg.individual ? "text-2xl" : "text-4xl"
                    }`}
                  >
                    {cfg.individual ? (
                      "Wycena indyw."
                    ) : (
                      <>
                        {cfg.priceLabel && (
                          <span className="text-base text-ink-muted">
                            {cfg.priceLabel}{" "}
                          </span>
                        )}
                        {formatPLNShort(cfg.total)}
                      </>
                    )}
                  </p>
                </div>

                {editing && (
                  <Link
                    href={
                      cfg.carSlug
                        ? `/konfigurator?car=${cfg.carSlug}`
                        : "/konfigurator"
                    }
                    className="mt-5 block text-center text-sm text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    Zmień konfigurację
                  </Link>
                )}
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

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-t border-ink/8 pt-3 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <dt className="text-[11px] font-medium uppercase tracking-wider2 text-ink-faint">
        {label}
      </dt>
      <dd className="text-[15px] text-ink sm:text-right">{value}</dd>
    </div>
  );
}
