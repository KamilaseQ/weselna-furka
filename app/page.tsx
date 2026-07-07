import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustBadges } from "@/components/TrustBadges";
import { PremiumPoints } from "@/components/PremiumPoints";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FleetShowcase } from "@/components/FleetShowcase";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Fleet — editorial spreads */}
      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Flota"
            title="Poznajcie auta z bliska."
            subtitle="Każdy model przygotowujemy tak samo starannie — umyty, wydetailowany, z kierowcą w cenie."
          />
        </Reveal>
        <div className="mt-16">
          <FleetShowcase />
        </div>
      </section>

      {/* Premium standard — what sets us apart */}
      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Nasz standard"
            title="Dopracowane w każdym calu."
            subtitle="Detale, które sprawiają, że dzień jest naprawdę wyjątkowy — i o które nie musicie się martwić."
          />
        </Reveal>
        <div className="mt-14">
          <PremiumPoints />
        </div>
      </section>

      {/* Promises */}
      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading eyebrow="Nasze obietnice" title="Co gwarantujemy." />
        </Reveal>
        <div className="mt-12">
          <TrustBadges />
        </div>
      </section>

      {/* Reviews — temporarily hidden */}

      {/* CTA band */}
      <section className="pt-24">
        <Reveal>
          <CtaBand />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading eyebrow="Pytania" title="Dobrze wiedzieć przed rezerwacją." />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12">
            <FaqAccordion />
          </div>
        </Reveal>
      </section>

      {/* Contact teaser — typographic, no box */}
      <section className="site-container pt-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow-rules mb-6">Kontakt</p>
            <h2 className="text-3xl text-ink sm:text-4xl">
              Macie pytanie? Jesteśmy pod telefonem.
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-8">
              <a
                href="tel:+48501747490"
                className="inline-block font-serif text-3xl text-ink transition-colors hover:text-wine sm:text-4xl"
              >
                +48 501 747 490
              </a>
              <a
                href="tel:+48728561373"
                className="inline-block font-serif text-3xl text-ink transition-colors hover:text-wine sm:text-4xl"
              >
                +48 728 561 373
              </a>
            </div>
            <Link
              href="/kontakt"
              className="mt-6 inline-block text-sm font-medium text-wine underline underline-offset-4 transition-colors hover:text-wine-deep"
            >
              Inne formy kontaktu
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
