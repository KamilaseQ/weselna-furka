"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { visibleCars, availabilityMeta } from "@/data/cars";
import { addons } from "@/data/addons";
import { getCarImages } from "@/data/images";
import { calculatePrice, INCLUDED_KM, KM_RATE } from "@/lib/pricing";
import { formatPLNShort } from "@/lib/format";
import { Calendar, formatPolishDate, todayISO, toISODate } from "./Calendar";
import { RouteMap, type MapStop } from "./RouteMap";
import {
  searchAddress,
  reverseGeocode,
  fetchDrivingRoute,
  isOutsideRadius,
  SERVICE_RADIUS_KM,
  type GeoResult,
  type DrivingRoute,
} from "@/lib/geo";
import {
  CalendarIcon,
  CheckIcon,
  DriverIcon,
  ArrowRight,
  ShareIcon,
  CloseIcon,
  SearchIcon,
  RouteIcon,
} from "./icons";

const STEPS = [
  { id: 1, label: "Data" },
  { id: 2, label: "Trasa" },
  { id: 3, label: "Samochód" },
  { id: 4, label: "Dodatki" },
] as const;

const MAX_STOPS = 6;
const GALLERY_LABELS = ["Zewnętrze", "Wnętrze", "Detal"] as const;

/** share-link format: lat~lng~name, stops joined with | */
function parseStopsParam(raw: string | null, nextId: () => string): MapStop[] {
  if (!raw) return [];
  return raw
    .split("|")
    .map((part) => {
      const [lat, lng, ...name] = part.split("~");
      const la = Number(lat);
      const ln = Number(lng);
      if (!Number.isFinite(la) || !Number.isFinite(ln)) return null;
      return { id: nextId(), name: name.join("~"), lat: la, lng: ln };
    })
    .filter((s): s is MapStop => s !== null)
    .slice(0, MAX_STOPS);
}

export function Configurator() {
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");

  /* 1 — date */
  const [date, setDate] = useState(params.get("date") || todayISO());

  /* 2 — route */
  const stopId = useRef(0);
  const nextStopId = () => `stop-${stopId.current++}`;
  const [stops, setStops] = useState<MapStop[]>(() =>
    parseStopsParam(params.get("stops"), nextStopId)
  );
  const [route, setRoute] = useState<DrivingRoute | null>(null);
  const [routing, setRouting] = useState(false);
  /* opt-in for routes reaching beyond the 100 km standard radius —
     these are always priced individually after the request */
  const [customRoute, setCustomRoute] = useState(false);
  const [radiusWarn, setRadiusWarn] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [searching, setSearching] = useState(false);

  /* 3 — car */
  const [carSlug, setCarSlug] = useState(() => {
    const c = params.get("car");
    return visibleCars.some((x) => x.slug === c) ? (c as string) : visibleCars[0].slug;
  });
  const car = visibleCars.find((c) => c.slug === carSlug)!;
  const gallery = getCarImages(carSlug).gallery;
  const [photoIdx, setPhotoIdx] = useState(0);

  /* 4 — addons (rental time is no longer chosen here — standard day service) */
  const hours = 6;
  const [activeAddons, setActiveAddons] = useState<string[]>(() => {
    const fromUrl = (params.get("addons") || "")
      .split(",")
      .filter((id) => addons.some((a) => a.id === id));
    return fromUrl.length
      ? fromUrl
      : addons.filter((a) => a.defaultOn).map((a) => a.id);
  });

  const [copied, setCopied] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  /* driving route follows the pins — keyed by coordinates so renaming
     a stop doesn't refetch */
  const coordsKey = stops
    .map((s) => `${s.lat.toFixed(5)},${s.lng.toFixed(5)}`)
    .join(";");
  const stopsRef = useRef(stops);
  stopsRef.current = stops;
  useEffect(() => {
    if (stopsRef.current.length < 2) {
      setRoute(null);
      return;
    }
    let cancelled = false;
    setRouting(true);
    fetchDrivingRoute(stopsRef.current).then((r) => {
      if (cancelled) return;
      setRoute(r);
      setRouting(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordsKey]);

  /* debounced address search */
  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const t = setTimeout(async () => {
      const found = await searchAddress(q);
      setResults(found);
      setSearching(false);
    }, 450);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    const from = todayISO();
    const toDate = new Date();
    toDate.setMonth(toDate.getMonth() + 18);
    const params = new URLSearchParams({
      from,
      to: toISODate(toDate),
      carSlug,
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
  }, [carSlug]);

  const go = (next: number) => {
    setDir(next > step ? "fwd" : "back");
    setStep(next);
    setMaxStep((m) => Math.max(m, next));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* route helpers */

  /** guard: a point beyond the 100 km radius is only allowed once the couple
      opts into a custom (individually priced) route */
  const allowPoint = (lat: number, lng: number) => {
    if (!customRoute && isOutsideRadius(lat, lng)) {
      setRadiusWarn(true);
      return false;
    }
    setRadiusWarn(false);
    return true;
  };

  const addStop = (lat: number, lng: number, name: string) =>
    setStops((prev) =>
      prev.length >= MAX_STOPS ? prev : [...prev, { id: nextStopId(), name, lat, lng }]
    );

  const addStopFromMap = (lat: number, lng: number) => {
    if (stops.length >= MAX_STOPS) return;
    if (!allowPoint(lat, lng)) return;
    const id = nextStopId();
    setStops((prev) => [...prev, { id, name: "", lat, lng }]);
    // fill the address in the background; keep anything the user typed meanwhile
    reverseGeocode(lat, lng).then((label) => {
      if (!label) return;
      setStops((prev) =>
        prev.map((s) => (s.id === id && s.name === "" ? { ...s, name: label } : s))
      );
    });
  };

  const addStopFromResult = (r: GeoResult) => {
    if (!allowPoint(r.lat, r.lng)) return;
    addStop(r.lat, r.lng, r.label);
    setQuery("");
    setResults([]);
  };

  const moveStop = (id: string, lat: number, lng: number) =>
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, lat, lng } : s)));
  const renameStop = (id: string, name: string) =>
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
  const removeStop = (id: string) =>
    setStops((prev) => prev.filter((s) => s.id !== id));

  const toggleAddon = (id: string) =>
    setActiveAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const km = route?.km ?? 0;
  const price = useMemo(
    () => calculatePrice({ carSlug, hours, addonIds: activeAddons, extraKm: km }),
    [carSlug, hours, activeAddons, km]
  );

  /* a route beyond the radius (opted-in or dragged there) makes the *route*
     individually priced; a selected "wycena indywidualna" add-on makes the
     whole *total* individual too */
  const hasFarStop = stops.some((s) => isOutsideRadius(s.lat, s.lng));
  const individualRoute = customRoute || hasFarStop;
  const hasQuoteAddon = activeAddons.some(
    (id) => addons.find((a) => a.id === id)?.quote
  );
  const individualQuote = individualRoute || hasQuoteAddon;
  const dateUnavailable = unavailableDates.includes(date);

  const goCheckout = () => {
    if (dateUnavailable) return;

    const q = new URLSearchParams({
      car: carSlug,
      date,
      km: String(individualRoute ? 0 : km),
      stops: stops.map((s) => s.name.trim()).filter(Boolean).join("|"),
      addons: activeAddons.join(","),
      total: String(price.total),
    });
    if (individualQuote) q.set("custom", "1");
    router.push(`/rezerwacja?${q.toString()}`);
  };

  const shareLink = async () => {
    try {
      const q = new URLSearchParams({
        car: carSlug,
        date,
        stops: stops
          .map((s) => `${s.lat.toFixed(5)}~${s.lng.toFixed(5)}~${s.name.trim()}`)
          .join("|"),
        addons: activeAddons.join(","),
      });
      const url = `${window.location.origin}/konfigurator?${q.toString()}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    // -mb-24 cancels the footer's global mt-24, so the sticky action bar
    // sits flush against the footer with no stray cream band below it
    <div className="-mb-24">
      {/* ——— sticky progress bar ——— */}
      <div className="sticky top-[72px] z-30 border-b border-ink/10 bg-cream-50/90 backdrop-blur-md">
        <div className="site-container flex items-center justify-between gap-4 py-3">
          <ol className="flex items-center gap-0" aria-label="Kroki konfiguratora">
            {STEPS.map((s, i) => {
              const done = step > s.id;
              const current = step === s.id;
              const reachable = s.id <= maxStep;
              return (
                <li key={s.id} className="flex items-center">
                  {i > 0 && (
                    <span
                      className={`mx-1.5 h-px w-5 transition-colors duration-500 sm:mx-2 sm:w-9 ${
                        step >= s.id ? "bg-wine" : "bg-ink/15"
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => reachable && go(s.id)}
                    disabled={!reachable}
                    aria-current={current ? "step" : undefined}
                    title={s.label}
                    className={`group flex items-center gap-2 ${
                      reachable ? "" : "cursor-default"
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full border text-xs transition-all duration-300 ${
                        current
                          ? "border-wine bg-wine text-cream-50 shadow-card"
                          : done
                            ? "border-wine/60 bg-white text-wine"
                            : "border-ink/20 text-ink-faint"
                      }`}
                    >
                      {done ? <CheckIcon className="h-3.5 w-3.5" /> : s.id}
                    </span>
                    <span
                      className={`hidden text-xs transition-colors lg:block ${
                        current
                          ? "font-medium text-ink"
                          : done
                            ? "text-ink-muted"
                            : "text-ink-faint"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(1)}
              className="hidden items-center gap-2 rounded-full border border-ink/12 bg-white/70 px-4 py-2 text-sm text-ink-soft transition-all hover:border-ink/30 sm:inline-flex"
            >
              <CalendarIcon className="h-4 w-4 text-ink-muted" />
              {formatPolishDate(date)}
            </button>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider2 text-ink-faint">
                Cena
              </p>
              <p className="font-serif text-2xl leading-none text-ink">
                {step < 3
                  ? "— — —"
                  : individualQuote
                    ? "Indywidualna"
                    : formatPLNShort(price.total)}
              </p>
            </div>
          </div>
        </div>
        <div className="h-0.5 w-full bg-ink/8">
          <div
            className="h-full bg-wine transition-all duration-700 ease-out-expo"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ——— step content ——— */}
      <div
        key={step}
        className={`site-container py-10 lg:py-14 ${
          dir === "fwd" ? "animate-stepIn" : "animate-stepBack"
        }`}
      >
        {step === 1 && (
          <StepShell
            title="Data"
            subtitle="Wybierzcie datę ślubu."
            width="max-w-lg"
          >
            <div className="surface-card p-5 sm:p-7">
              <Calendar
                value={date}
                onChange={setDate}
                disabledDates={unavailableDates}
              />
              <p className="mt-5 border-t border-ink/8 pt-4 text-center font-serif text-2xl text-ink">
                {formatPolishDate(date)}
              </p>
              {dateUnavailable && (
                <p className="mt-3 text-center text-sm text-wine">
                  Ten termin jest już zablokowany dla wybranego auta.
                </p>
              )}
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            title="Trasa"
            subtitle="Zaznaczcie punkty Waszego dnia — a my zajmiemy się resztą."
            width="max-w-6xl"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              {/* map */}
              <div>
                {/* concise how-to — two clear ways to add a point */}
                <div className="mb-3 flex flex-col gap-1.5 rounded-xl border border-wine/20 bg-wine/5 px-4 py-3 text-sm text-ink-soft sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex items-center gap-2">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-wine text-[11px] font-semibold text-cream-50">
                      1
                    </span>
                    Kliknij punkt na mapie
                  </span>
                  <span className="hidden text-ink-faint sm:inline">albo</span>
                  <span className="flex items-center gap-2">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-wine text-[11px] font-semibold text-cream-50">
                      2
                    </span>
                    wpisz dokładny adres obok
                  </span>
                </div>
                <div className="overflow-hidden rounded-3xl border border-ink/10 shadow-card">
                  <RouteMap
                    stops={stops}
                    route={route?.geometry ?? null}
                    onAdd={addStopFromMap}
                    onMove={moveStop}
                    className="h-[420px] w-full lg:h-[540px]"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-ink-faint">
                  Pinezkę przesuniesz palcem lub myszką — także na telefonie.
                  Kolejność punktów = kolejność listy.
                </p>
              </div>

              {/* stops panel */}
              <div className="flex flex-col gap-5">
                {/* address search */}
                <div>
                  <p className="field-label">Dodaj punkt</p>
                  <div className="relative">
                    <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Wpiszcie adres, np. Wilanowska 5, Warszawa"
                      className="field pl-12"
                      disabled={stops.length >= MAX_STOPS}
                      aria-label="Szukaj adresu"
                    />
                  </div>
                  {(results.length > 0 || searching) && (
                    <div className="mt-2 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-card">
                      {searching && (
                        <p className="px-4 py-3 text-sm text-ink-faint">
                          Szukamy…
                        </p>
                      )}
                      {!searching &&
                        results.map((r) => (
                          <button
                            key={`${r.lat}-${r.lng}`}
                            type="button"
                            onClick={() => addStopFromResult(r)}
                            className="flex w-full items-center gap-3 border-b border-ink/5 px-4 py-3 text-left text-sm text-ink-soft transition-colors last:border-0 hover:bg-cream-100"
                          >
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-wine/10 text-xs font-semibold text-wine">
                              +
                            </span>
                            {r.label}
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* stops list */}
                {stops.length > 0 && (
                  <div>
                    <p className="field-label">Punkty trasy</p>
                    <div className="space-y-2">
                      {stops.map((s, i) => (
                        <div
                          key={s.id}
                          className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white/60 px-3 py-2"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-wine text-xs font-semibold text-cream-50">
                            {i + 1}
                          </span>
                          <input
                            value={s.name}
                            onChange={(e) => renameStop(s.id, e.target.value)}
                            placeholder="Ustalamy adres…"
                            className="w-full flex-1 bg-transparent py-1.5 text-[15px] text-ink placeholder:text-ink-faint outline-none"
                            aria-label={`Punkt ${i + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeStop(s.id)}
                            aria-label={`Usuń punkt ${i + 1}`}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink"
                          >
                            <CloseIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* distance */}
                <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-ink-soft">
                      <RouteIcon className="h-4 w-4 text-ink-muted" />
                      Długość trasy
                    </span>
                    <span className="font-serif text-2xl text-ink">
                      {individualRoute
                        ? "indyw."
                        : stops.length < 2
                          ? "—"
                          : routing
                            ? "…"
                            : `${km} km`}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-ink-faint">
                    {individualRoute
                      ? "Trasa niestandardowa — dokładną cenę ustalimy indywidualnie po zgłoszeniu."
                      : stops.length < 2
                        ? "Dodajcie co najmniej dwa punkty, aby policzyć trasę."
                        : route?.geometry
                          ? "Dystans po drogach, według kolejności punktów."
                          : "Dystans szacunkowy."}{" "}
                    {!individualRoute &&
                      `Pierwsze ${INCLUDED_KM} km w cenie, każdy kolejny +${KM_RATE} zł.`}
                  </p>
                </div>

                {/* far-point warning */}
                {radiusWarn && !customRoute && (
                  <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-xs leading-relaxed text-ink-soft">
                    Ten punkt jest dalej niż {SERVICE_RADIUS_KM} km od centrum
                    Warszawy. Zaznaczcie „Trasa niestandardowa”, aby go dodać — taką
                    trasę wyceniamy indywidualnie.
                  </p>
                )}

                {/* custom-route opt-in */}
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4 text-sm text-ink-soft transition-colors hover:border-ink/25">
                  <input
                    type="checkbox"
                    checked={customRoute}
                    onChange={(e) => {
                      setCustomRoute(e.target.checked);
                      if (e.target.checked) setRadiusWarn(false);
                    }}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-wine"
                  />
                  <span>
                    <span className="font-medium text-ink">
                      Trasa niestandardowa (poza {SERVICE_RADIUS_KM} km od Warszawy)
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-muted">
                      Odblokowuje dowolne punkty na mapie. Cena za taką trasę jest
                      wyceniana indywidualnie po wypełnieniu formularza.
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            title="Samochód"
            subtitle="Wybierzcie model z listy."
            width="max-w-6xl"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              {/* model list */}
              <div className="space-y-3 lg:order-1">
                {visibleCars.map((c) => {
                  const selected = c.slug === carSlug;
                  const m = availabilityMeta[c.availability];
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => {
                        setCarSlug(c.slug);
                        setPhotoIdx(0);
                      }}
                      aria-pressed={selected}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                        selected
                          ? "border-wine bg-white shadow-card"
                          : "border-ink/10 bg-white/40 hover:border-ink/30"
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          selected
                            ? "border-wine bg-wine text-cream-50"
                            : "border-ink/25"
                        }`}
                      >
                        {selected && <CheckIcon className="h-3.5 w-3.5" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-xl text-ink">
                          {c.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-muted">
                          Rocznik {c.year} · {c.seats} miejsca · biała perła
                        </span>
                        <span className="mt-1.5 flex items-center gap-1.5 text-xs">
                          <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                          <span className={m.text}>{c.availabilityNote}</span>
                        </span>
                      </span>
                      <span className="shrink-0 text-right text-sm text-ink-muted">
                        od{" "}
                        <span className="block font-serif text-xl leading-tight text-ink">
                          {formatPLNShort(c.basePrice)}
                        </span>
                      </span>
                    </button>
                  );
                })}

                <div className="rounded-2xl bg-cream-200/60 px-4 py-4 text-sm text-ink-soft">
                  <p className="flex items-center gap-2 font-medium text-ink">
                    <DriverIcon className="h-5 w-5 shrink-0 text-gold" />
                    W cenie, razem z autem:
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {[
                      "Prywatny kierowca w garniturze",
                      "Ślubna tablica rejestracyjna",
                      "Woda i chusteczki dla pary młodej",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-wine" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* photos of the selected model */}
              <div className="lg:order-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
                  <Image
                    key={`${carSlug}-${photoIdx}`}
                    src={gallery[photoIdx].src}
                    alt={gallery[photoIdx].alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="animate-fadeIn object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/60 to-transparent px-6 pb-4 pt-10 text-[11px] font-medium uppercase tracking-wider2 text-cream-50">
                    <span>{car.name}</span>
                    <span>{GALLERY_LABELS[photoIdx]}</span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setPhotoIdx(i)}
                      aria-label={GALLERY_LABELS[i]}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                        photoIdx === i
                          ? "border-wine"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell
            title="Dodatki"
            subtitle="Dopieść szczegóły — resztą zajmiemy się my."
            width="max-w-3xl"
          >
            <div className="space-y-9">
              <div>
                <p className="field-label">Dodatki</p>
                <div className="space-y-2">
                  {addons.map((a) => {
                    const checked = activeAddons.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleAddon(a.id)}
                        className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                          checked
                            ? "border-wine/50 bg-white"
                            : "border-ink/10 bg-white/40 hover:border-ink/25"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all duration-200 ${
                            checked
                              ? "border-wine bg-wine text-cream-50"
                              : "border-ink/25"
                          }`}
                        >
                          {checked && <CheckIcon className="h-3.5 w-3.5" />}
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-medium text-ink">{a.name}</span>
                            <span className="text-sm font-medium text-ink-soft">
                              {a.quote ? "wycena indyw." : `+${formatPLNShort(a.price)}`}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs text-ink-muted">
                            {a.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-end justify-between border-t border-ink/10 pt-5">
                  <span className="text-ink-muted">Razem</span>
                  <span className="font-serif text-4xl text-ink">
                    {individualQuote ? "Wycena indywidualna" : formatPLNShort(price.total)}
                  </span>
                </div>
                <p className="mt-1.5 text-right text-xs text-ink-faint">
                  {individualRoute
                    ? "Trasę niestandardową wyceniamy po zgłoszeniu"
                    : hasQuoteAddon
                      ? "Wybrane pozycje wyceniamy indywidualnie"
                      : `Kierowca w cenie${km > INCLUDED_KM ? ` · trasa ${km} km` : ""}`}
                </p>
                <p className="mt-0.5 text-right text-[11px] text-ink-faint">
                  Ceny netto.
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-avail" />
                  Płatność dopiero po potwierdzeniu terminu.
                </p>
              </div>
            </div>
          </StepShell>
        )}
      </div>

      {/* ——— sticky action bar: the primary CTA is always in view ——— */}
      <div className="sticky bottom-0 z-30 border-t border-ink/10 bg-cream-50/95 backdrop-blur-md">
        <div className="site-container flex items-center justify-between gap-3 py-3.5">
          {step > 1 ? (
            <button onClick={() => go(step - 1)} className="btn-ghost">
              Wstecz
            </button>
          ) : (
            <span className="text-sm text-ink-muted">Krok 1 z 4</span>
          )}
          <div className="flex items-center gap-3">
            {step === 4 ? (
              <>
                <button onClick={shareLink} className="btn-ghost hidden sm:inline-flex">
                  <ShareIcon className="h-4 w-4" />
                  {copied ? "Link skopiowany" : "Wyślij partnerowi"}
                </button>
                <button
                  onClick={goCheckout}
                  disabled={dateUnavailable}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Poproś o rezerwację
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => !dateUnavailable && go(step + 1)}
                disabled={dateUnavailable}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Dalej — {STEPS[step].label.toLowerCase()}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— small building blocks ——— */

function StepShell({
  title,
  subtitle,
  width,
  children,
}: {
  title: string;
  subtitle: string;
  width: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto ${width}`}>
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
      <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

