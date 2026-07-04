import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { PathChoice } from "@/components/PathChoice";
import { TrustBadges } from "@/components/TrustBadges";
import { ReviewsStrip } from "@/components/ReviewsStrip";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FleetShowcase } from "@/components/FleetShowcase";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Two paths */}
      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Rezerwacja"
            title={
              <>
                Gotowy pakiet albo <em>własna konfiguracja.</em>
              </>
            }
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12">
            <PathChoice />
          </div>
        </Reveal>
      </section>

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

      {/* Promises */}
      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading eyebrow="Nasze obietnice" title="Co gwarantujemy." />
        </Reveal>
        <div className="mt-12">
          <TrustBadges />
        </div>
      </section>

      {/* Reviews */}
      <section className="pt-24">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="Opinie par" title="Co mówią pary." />
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="mt-12">
            <ReviewsStrip />
          </div>
        </Reveal>
      </section>

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
            <a
              href="tel:+48555123456"
              className="mt-6 inline-block font-serif text-4xl text-ink transition-colors hover:text-wine sm:text-5xl"
            >
              +48 555 123 456
            </a>
            <p className="mt-4 text-sm text-ink-muted">
              Codziennie 9:00–21:00 · jedna osoba prowadzi Was od pierwszej
              wiadomości aż po dzień ślubu.
            </p>
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
