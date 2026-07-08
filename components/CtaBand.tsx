import Image from "next/image";
import Link from "next/link";
import { carImageSets } from "@/data/images";
import { ArrowRight } from "./icons";

interface CtaBandProps {
  title?: React.ReactNode;
  subtitle?: string;
}

const bandImage = carImageSets["maserati-ghibli"].gallery[2];

export function CtaBand({
  title = (
    <>
      Sprawdźcie dostępność{" "}
      <em className="italic text-gold-soft">w konfiguratorze.</em>
    </>
  ),
  subtitle = "Wybierzcie datę, trasę i samochód. Cena zależy od realnego planu przejazdu, a po konfiguracji możemy potwierdzić termin.",
}: CtaBandProps) {
  return (
    <section className="site-container">
      <div className="relative overflow-hidden rounded-[2rem] text-cream-50">
        <Image
          src={bandImage.src}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-gold/30 sm:inset-4"
        />

        <div className="relative px-6 py-20 text-center sm:px-12 sm:py-24">
          <p className="text-[11px] font-medium uppercase tracking-wider2 text-gold-soft">
            Konfigurator
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl leading-[1.08] text-cream-50 sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream-200/75">{subtitle}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/konfigurator" className="btn-light w-full sm:w-auto">
              Skonfiguruj przejazd
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-7 text-xs text-cream-200/55">
            Płatność dopiero po potwierdzeniu terminu.
          </p>
        </div>
      </div>
    </section>
  );
}
