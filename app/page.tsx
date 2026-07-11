import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FleetShowcase } from "@/components/FleetShowcase";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { faq } from "@/data/faq";
import { buildPageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { CalendarIcon, CarIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = buildPageMetadata({
  title: "Auto do ślubu Warszawa",
  description:
    "Luksusowe auto do ślubu w Warszawie z kierowcą. Mercedes S-Klasa i Maserati, konfigurator trasy, daty i dodatków.",
  path: "/",
  keywords: [
    "auto do ślubu Warszawa",
    "samochód do ślubu Warszawa",
    "wynajem auta do ślubu Warszawa",
    "samochód na wesele Warszawa",
  ],
});

const breadcrumb = breadcrumbJsonLd([{ name: "Strona główna", path: "/" }]);
const homeFaqSchema = faqJsonLd(faq);

const steps = [
  {
    title: "Wybieracie datę",
    text: "Od razu sprawdzacie termin i przechodzicie dalej bez wymiany kilku wiadomości.",
    icon: CalendarIcon,
  },
  {
    title: "Układacie plan dnia",
    text: "Odbiór, ceremonia, sala i sesja zgodnie z Waszą koncepcją.",
    icon: PinIcon,
  },
  {
    title: "Wybieracie auto",
    text: "Porównujecie dostępne modele i wybieracie samochód pasujący do stylu uroczystości.",
    icon: CarIcon,
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <Hero />

      <section className="site-container pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Flota"
            title="Dwa auta. Jeden prosty wybór."
            subtitle="Mercedes-Benz S-Klasa i Maserati Ghibli. Oba w ślubnym kolorze, z kierowcą i przygotowaniem pod uroczystość."
          />
        </Reveal>
        <div className="mt-12">
          <FleetShowcase />
        </div>
      </section>

      <section className="site-container pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Konfigurator"
            title="Wszystko zgodnie z Waszą koncepcją."
            subtitle="Podajecie realny plan dnia, wybieracie auto i prosicie o potwierdzenie terminu bez sztywnego pakietu."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 80}>
                <div className="border-t border-ink/10 pt-5">
                  <Icon className="h-6 w-6 text-gold" />
                  <h2 className="mt-4 text-2xl text-ink">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="site-container pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Pytania"
            title="Najważniejsze przed rezerwacją."
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </Reveal>
      </section>

      <section className="pt-20">
        <Reveal>
          <CtaBand />
        </Reveal>
      </section>
    </>
  );
}
