"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { visibleCars } from "@/data/cars";
import { getCarImages } from "@/data/images";
import { DateField } from "./DateField";
import { todayISO } from "./Calendar";
import { ArrowRight } from "./icons";

const ROTATE_MS = 6000;

const STEPS = [
  "Wybierzcie datę i trasę",
  "Zobaczcie dostępność i cenę",
  "Poproście o rezerwację",
];

/**
 * Full-bleed hero: the car photo IS the backdrop, washed with a cream
 * gradient on the left for readability. The brand in the headline rotates
 * together with the photo; the sub-copy is a three-node step list.
 */
export function Hero() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState(todayISO);
  const [calOpen, setCalOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (calOpen || pinned) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % visibleCars.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [calOpen, pinned]);

  const car = visibleCars[index];

  const goNext = () => {
    router.push(`/konfigurator?date=${date}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* photographic backdrop */}
      <div className="absolute inset-0" aria-hidden>
        {visibleCars.map((c, i) => {
          const img = getCarImages(c.slug).cover;
          const active = i === index;
          return (
            <Image
              key={c.slug}
              src={img.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover object-[65%_center] transition-all duration-[1600ms] ease-out-expo ${
                active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
              }`}
            />
          );
        })}
        {/* cream wash: readable text on the left, car crisp on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100 from-10% via-cream-100/60 via-40% to-transparent to-80%" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream-100/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream-100 to-transparent" />
      </div>

      <div className="site-container relative grid min-h-[560px] items-center gap-10 py-16 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1fr_360px] lg:py-20">
        {/* left: rotating brand headline + steps */}
        <div className="max-w-2xl">
          {/* Explicit line breaks keep the headline at exactly three lines for
              every brand: the fixed part is forced onto two lines and the brand
              phrase stays on one (nowrap on desktop). The desktop size is tuned
              so the longest brand — "Mercedes-Benz" — still fits that one line. */}
          <h1
            className="text-5xl leading-[1.04] text-ink opacity-0 animate-fadeUp sm:text-6xl lg:text-[56px]"
            style={{ animationDelay: "120ms" }}
          >
            Auto do ślubu
            <br />
            w Warszawie.
            <br />
            <span className="lg:whitespace-nowrap">
              <span
                key={car.slug}
                className="inline-block animate-fadeUp italic text-wine"
              >
                {car.brand}
              </span>
              {" "}z kierowcą.
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft opacity-0 animate-fadeUp"
            style={{ animationDelay: "220ms" }}
          >
            Luksusowy samochód na ślub i wesele: przejrzysta cena,
            przygotowane auto, kierowca w cenie i konfiguracja trasy online.
          </p>

          {/* three-node step list */}
          <ol
            className="mt-8 opacity-0 animate-fadeUp"
            style={{ animationDelay: "280ms" }}
          >
            {STEPS.map((label, i) => (
              <li key={label} className="relative flex gap-4">
                <span className="flex flex-col items-center">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-wine/40 bg-white/80 font-serif text-sm italic text-wine shadow-card backdrop-blur-sm">
                    {i + 1}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="my-1 h-6 w-px bg-gradient-to-b from-wine/35 to-gold/30" />
                  )}
                </span>
                <span className="pt-1.5 text-[16px] text-ink-soft">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* right: date panel */}
        <aside
          className="w-full opacity-0 animate-fadeUp lg:justify-self-end"
          style={{ animationDelay: "400ms" }}
        >
          {/* solid card — the panel sits on a photo, translucency hurt it */}
          <div className="w-full rounded-2xl border border-ink/8 bg-white p-7 shadow-float">
            <p className="field-label">Data ślubu</p>
            <DateField
              value={date}
              onChange={setDate}
              onOpenChange={setCalOpen}
            />
            <button onClick={goNext} className="btn-primary mt-4 w-full">
              Poproś o rezerwację
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-5 flex items-center gap-2 border-t border-ink/8 pt-4 text-sm">
              <span className="h-2 w-2 rounded-full bg-avail" />
              <span className="text-avail">Dostępny — {car.name}</span>
            </div>
          </div>
        </aside>
      </div>

      {/* carousel dots + current model — pinned to the section's bottom edge */}
      <div className="absolute inset-x-0 bottom-6">
        <div className="site-container flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            {visibleCars.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => {
                  setIndex(i);
                  setPinned(true);
                }}
                aria-pressed={i === index}
                aria-label={c.name}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-7 bg-wine" : "w-2.5 bg-ink/25 hover:bg-ink/45"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium uppercase tracking-wider2 text-ink-muted">
            {car.name}
          </span>
        </div>
      </div>
    </section>
  );
}
