import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { aboutImage, carImageSets } from "@/data/images";
import { TrustBadges } from "@/components/TrustBadges";
import { PremiumPoints } from "@/components/PremiumPoints";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Weselna Furka - auto do ślubu Warszawa",
  description:
    "Poznaj Weselną Furkę: wynajem luksusowych aut do ślubu w Warszawie, kierowca w cenie, jasna rezerwacja i spokojna logistyka dnia.",
  path: "/o-nas",
  keywords: ["Weselna Furka", "wynajem aut do ślubu Warszawa", "auto do ślubu z kierowcą"],
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Strona główna", path: "/" },
  { name: "O nas", path: "/o-nas" },
]);

const steps = [
  {
    n: "01",
    title: "Prośba o rezerwację",
    desc: "Wybieracie auto, termin, trasę i dodatki online. Zgłoszenie wysyłacie bez zobowiązań.",
  },
  {
    n: "02",
    title: "Potwierdzenie terminu",
    desc: "Odzywa się do Was bezpośrednio kierowca, który będzie z Wami w dniu ślubu — i zostaje w kontakcie do końca.",
  },
  {
    n: "03",
    title: "Przygotowanie auta",
    desc: "Mycie, detailing i dekoracje zakładane dzień przed trasą — według Waszej konfiguracji.",
  },
  {
    n: "04",
    title: "Dzień ślubu",
    desc: "Kierowca melduje się z buforem czasu. Wy macie myśleć wyłącznie o sobie.",
  },
];

export default function ONasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* hero */}
      <section className="site-container py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">O nas</p>
            <h1 className="mt-3 text-5xl leading-[1.05] text-ink sm:text-6xl">
              Weselna Furka: auto do ślubu w Warszawie bez chaosu.
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-muted">
              Rezerwacja ma być prosta, a dzień ślubu spokojny. Zbudowaliśmy
              Weselną Furkę, bo wynajem auta na wesele nie powinien oznaczać
              wymiany piętnastu maili i niepewności co do ceny.
            </p>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-muted">
              Wybieracie auto, uzupełniacie trasę, a kontaktuje się z Wami
              bezpośrednio kierowca, który będzie z Wami w dniu ślubu. Chcemy,
              żebyście czuli się zaopiekowani — i mogli myśleć wyłącznie o sobie.
            </p>
            <Link href="/flota" className="btn-primary mt-7">
              Poznaj flotę
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <div className="arch frame-offset relative mx-auto aspect-[4/5] max-w-[440px] overflow-hidden shadow-card">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                fill
                priority
                placeholder="blur"
                blurDataURL={aboutImage.blurDataURL}
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover"
                style={{ objectPosition: aboutImage.objectPosition ?? "center" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* how we work */}
      <section className="bg-cream-50/60 py-20">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Jak pracujemy"
              title="Od rezerwacji po dzień ślubu."
            />
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="relative border-t border-ink/10 pt-5">
                  <p className="font-serif text-5xl italic text-gold/60">{s.n}</p>
                  <h3 className="mt-3 font-serif text-xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* detail strip */}
      <section className="site-container py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="frame-offset relative aspect-[16/11] overflow-hidden rounded-3xl shadow-card">
              <Image
                src={carImageSets["mercedes-s-klasa"].gallery[1].src}
                alt={carImageSets["mercedes-s-klasa"].gallery[1].alt}
                fill
                placeholder="blur"
                blurDataURL={carImageSets["mercedes-s-klasa"].gallery[1].blurDataURL}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{
                  objectPosition:
                    carImageSets["mercedes-s-klasa"].gallery[1].objectPosition ??
                    "center",
                }}
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">Detale</p>
            <h2 className="mt-3 text-4xl leading-[1.05] text-ink sm:text-5xl">
              Auto gotowe w najmniejszym szczególe.
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-muted">
              Każde auto przechodzi mycie i detailing przed trasą, a dekoracje
              zakładamy według Waszej konfiguracji. W środku czekają woda
              i chusteczki — drobiazgi, które robią różnicę.
            </p>
          </Reveal>
        </div>
      </section>

      {/* premium standard */}
      <section className="site-container py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Nasz standard"
            title="Premium widać w szczegółach."
            subtitle="Nie idziemy na skróty — bo ten dzień zdarza się raz."
          />
        </Reveal>
        <div className="mt-14">
          <PremiumPoints />
        </div>
      </section>

      {/* why us */}
      <section className="bg-cream-50/60 py-20">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Dlaczego my"
              title="Mniej formalności. Większa pewność."
            />
          </Reveal>
          <div className="mt-12">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* reviews — temporarily hidden */}

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
