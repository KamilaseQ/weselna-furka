import Link from "next/link";
import Image from "next/image";
import { visibleCars } from "@/data/cars";
import { getCarImages } from "@/data/images";
import { formatPLNShort } from "@/lib/format";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

/**
 * The two cars as alternating magazine spreads: a large framed photo with
 * an overlapping info plate, numbered like editorial features.
 */
export function FleetShowcase() {
  return (
    <div className="space-y-20 lg:space-y-24">
      {visibleCars.map((car, i) => {
        const cover = getCarImages(car.slug).cover;
        const reversed = i % 2 === 1;

        return (
          <Reveal key={car.slug}>
            <article
              className={`grid items-center gap-8 lg:grid-cols-12 ${
                reversed ? "" : ""
              }`}
            >
              {/* photo plate */}
              <div
                className={`relative lg:col-span-7 ${
                  reversed ? "lg:order-2 lg:col-start-6" : "lg:col-start-1"
                }`}
              >
                <div className="frame-offset relative aspect-[16/11] overflow-hidden rounded-3xl shadow-card">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out-expo hover:scale-[1.04]"
                  />
                </div>
                {/* vertical caption on the photo edge */}
                <span
                  className={`caption-vert absolute top-4 hidden lg:block ${
                    reversed ? "-right-6" : "-left-6"
                  }`}
                >
                  {car.tagline} · {car.year}
                </span>
              </div>

              {/* overlapping info plate */}
              <div
                className={`relative z-10 lg:col-span-5 ${
                  reversed
                    ? "lg:order-1 lg:col-start-1 lg:row-start-1 lg:-mr-16"
                    : "lg:col-start-8 lg:-ml-16"
                }`}
              >
                <div className="surface-card p-8 sm:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-4xl italic leading-none text-gold/50">
                      0{i + 1}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider2 text-ink-faint">
                      Biała perła · {car.seats} miejsca
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
                    {car.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {car.blurb}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-5">
                    <p className="text-sm text-ink-muted">
                      od{" "}
                      <span className="font-serif text-2xl text-ink">
                        {formatPLNShort(car.basePrice)}
                      </span>
                    </p>
                    <div className="flex items-center gap-5">
                      <Link
                        href={`/flota/${car.slug}`}
                        className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                      >
                        Szczegóły
                      </Link>
                      <Link
                        href={`/konfigurator?car=${car.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-wine transition-colors hover:text-wine-deep"
                      >
                        Wybierz
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
