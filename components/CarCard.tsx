import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/data/types";
import { availabilityMeta } from "@/data/cars";
import { getCarImages } from "@/data/images";
import { formatPLNShort } from "@/lib/format";
import { ArrowRight } from "./icons";

export function CarCard({ car }: { car: Car }) {
  const meta = availabilityMeta[car.availability];
  const cover = getCarImages(car.slug).cover;

  return (
    <div className="group surface-card flex flex-col overflow-hidden p-4 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-float">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        {car.recommended && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-[11px] font-medium uppercase tracking-wider2 text-cream-50">
            Nasza rekomendacja
          </span>
        )}
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          placeholder="blur"
          blurDataURL={cover.blurDataURL}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]"
          style={{ objectPosition: cover.objectPosition ?? "center" }}
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5">
        <p className="text-xs uppercase tracking-wider2 text-ink-faint">
          {car.tagline}
        </p>
        <h3 className="mt-1 text-2xl text-ink">{car.name}</h3>

        <div className="mt-2.5 flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
            <span className={meta.text}>{meta.label}</span>
          </span>
          <span className="whitespace-nowrap text-ink-muted">
            od <span className="font-medium text-ink">{formatPLNShort(car.basePrice)}</span>
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-ink/8 pb-1 pt-4">
          <Link
            href={`/flota/${car.slug}`}
            className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            {car.name} do ślubu
          </Link>
          <Link
            href={`/konfigurator?car=${car.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            Konfiguruj
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
