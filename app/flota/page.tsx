import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { visibleCars, availabilityMeta } from "@/data/cars";
import { getCarImages } from "@/data/images";
import { formatPLNShort } from "@/lib/format";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Flota — Weselna Furka",
  description:
    "Luksusowe samochody na wesele w Warszawie — poznaj każdy model z bliska: wnętrze, detale, specyfikację i cennik.",
};

export default function FlotaPage() {
  return (
    <>
      <section className="site-container pb-4 pt-16">
        <Reveal>
          <SectionHeading
            eyebrow="Nasza flota"
            title="Poznajcie auta z bliska."
            subtitle="Każdy model przygotowujemy tak samo starannie. Wybierzcie ten, który pasuje do Waszego dnia."
          />
        </Reveal>
      </section>

      {visibleCars.map((car, i) => {
        const images = getCarImages(car.slug);
        const meta = availabilityMeta[car.availability];
        const reversed = i % 2 === 1;

        return (
          <section key={car.slug} className="site-container pt-20">
            <div
              className={`grid items-center gap-10 lg:gap-14 ${
                reversed
                  ? "lg:grid-cols-[0.95fr_1.05fr]"
                  : "lg:grid-cols-[1.05fr_0.95fr]"
              }`}
            >
              {/* photos */}
              <Reveal className={reversed ? "lg:order-2" : ""}>
                <div className="frame-offset group relative aspect-[16/11] overflow-hidden rounded-3xl shadow-card">
                  <Image
                    src={images.cover.src}
                    alt={images.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {images.gallery.slice(1).map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[16/10] overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out-expo hover:scale-[1.05]"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* info */}
              <Reveal delay={120} className={reversed ? "lg:order-1" : ""}>
                <p className="eyebrow">
                  <span className="font-serif text-lg italic text-gold/70">
                    No. 0{i + 1}
                  </span>{" "}
                  · {car.tagline}
                </p>
                <h2 className="mt-2 text-4xl text-ink sm:text-5xl">{car.name}</h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-muted">
                  <span>{car.type}</span>
                  <span className="text-ink/20">·</span>
                  <span>Rocznik {car.year}</span>
                  <span className="text-ink/20">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                    <span className={meta.text}>{car.availabilityNote}</span>
                  </span>
                </div>

                <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-soft">
                  {car.description}
                </p>

                {/* specs */}
                <div className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {car.specs.slice(0, 4).map((s) => (
                    <div
                      key={s.label}
                      className="flex justify-between gap-4 border-b border-ink/8 py-2 text-sm"
                    >
                      <span className="text-ink-faint">{s.label}</span>
                      <span className="text-right font-medium text-ink-soft">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/konfigurator?car=${car.slug}`}
                    className="btn-primary"
                  >
                    Konfiguruj od {formatPLNShort(car.basePrice)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/flota/${car.slug}`}
                    className="text-sm font-medium text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    Pełne szczegóły
                  </Link>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
                  <CheckIcon className="h-3.5 w-3.5 text-avail" />
                  Kierowca w garniturze i przygotowanie auta w cenie.
                </p>
              </Reveal>
            </div>

            {i < visibleCars.length - 1 && (
              <div className="hairline mt-20" />
            )}
          </section>
        );
      })}

      <section className="pt-24">
        <CtaBand
          title="Nie wiecie, które auto wybrać?"
          subtitle="Wejdźcie w konfigurator i zobaczcie każdy model z dekoracjami na żywo."
        />
      </section>
    </>
  );
}
