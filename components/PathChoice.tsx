import Link from "next/link";
import Image from "next/image";
import { pathChoiceImages } from "@/data/images";
import { ArrowRight } from "./icons";

interface PathChoiceProps {
  className?: string;
}

const cards = [
  {
    href: "/konfigurator",
    index: "01",
    title: "Konfigurator przejazdu",
    desc: "Data, trasa, samochód i dodatki. Wszystko w jednym miejscu.",
    cta: "Otwórz konfigurator",
    imageKey: "configurator" as const,
  },
  {
    href: "/flota",
    index: "02",
    title: "Zobacz auta",
    desc: "Porównaj Mercedesa S-Klasę i Maserati Ghibli przed wyborem.",
    cta: "Przejdź do floty",
    imageKey: "fleet" as const,
  },
];

/** Two clear entry points: configure the route or compare the fleet. */
export function PathChoice({ className = "" }: PathChoiceProps) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${className}`}>
      {cards.map((c) => {
        const image = pathChoiceImages[c.imageKey];
        return (
          <Link
            key={c.href}
            href={c.href}
            className="group overflow-hidden rounded-3xl border border-ink/10 bg-white/60 shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-float"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
              />
              <span className="absolute left-5 top-5 rounded-full bg-ink/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider2 text-cream-50 backdrop-blur-sm">
                {c.index}
              </span>
            </div>
            <div className="flex items-end justify-between gap-6 p-7 sm:p-8">
              <div>
                <h3 className="font-serif text-2xl text-ink sm:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                  {c.desc}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-wine">
                  {c.cta}
                </span>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:border-wine group-hover:bg-wine group-hover:text-cream-50">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
