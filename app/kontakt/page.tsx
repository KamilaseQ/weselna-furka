import type { Metadata } from "next";
import Link from "next/link";
import { contactImage } from "@/data/images";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, ArrowRight } from "@/components/icons";
import { faq } from "@/data/faq";
import { buildPageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SECONDARY_PHONE,
  SECONDARY_PHONE_HREF,
  SERVICE_AREA,
} from "@/lib/contact";

export const metadata: Metadata = buildPageMetadata({
  title: "Kontakt - auto do ślubu Warszawa",
  description:
    "Kontakt w sprawie wynajmu auta do ślubu w Warszawie. Telefon, e-mail, obszar obsługi, godziny i szybkie przejście do konfiguratora.",
  path: "/kontakt",
  keywords: ["auto do ślubu Warszawa kontakt", "Weselna Furka kontakt"],
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Strona główna", path: "/" },
  { name: "Kontakt", path: "/kontakt" },
]);
const contactFaqSchema = faqJsonLd(faq);

const channels = [
  {
    icon: PhoneIcon,
    label: "Telefon",
    value: CONTACT_PHONE,
    href: CONTACT_PHONE_HREF,
  },
  {
    icon: PhoneIcon,
    label: "Telefon",
    value: SECONDARY_PHONE,
    href: SECONDARY_PHONE_HREF,
  },
  {
    icon: MailIcon,
    label: "E-mail",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: PinIcon,
    label: "Obszar",
    value: SERVICE_AREA,
  },
  {
    icon: ClockIcon,
    label: "Godziny",
    value: "Codziennie 9:00 – 21:00",
  },
];

export default function KontaktPage() {
  return (
    <section className="site-container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }}
      />
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Kontakt</p>
          <h1 className="mt-3 text-5xl leading-[1.05] text-ink sm:text-6xl">
            Kontakt: auto do ślubu Warszawa.
          </h1>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-muted">
            Najszybciej poprosicie o rezerwację w konfiguratorze: data, trasa,
            auto i dodatki w jednym miejscu. A jeśli wolicie usłyszeć drugą osobę, po prostu
            zadzwońcie. Jesteśmy tu, żeby ten dzień był Waszym najspokojniejszym.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {channels.map((c) => {
              const inner = (
                <div className="surface-card flex h-full items-start gap-3 p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-white/50">
                    <c.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider2 text-ink-faint">
                      {c.label}
                    </p>
                    <p className="mt-1 font-medium text-ink">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={`${c.label}-${c.value}`} href={c.href} className="block transition hover:-translate-y-0.5">
                  {inner}
                </a>
              ) : (
                <div key={`${c.label}-${c.value}`}>{inner}</div>
              );
            })}
          </div>

          <Link href="/konfigurator" className="btn-primary mt-8">
            Poproś o rezerwację
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={150} className="h-full">
          <div className="frame-offset h-full rounded-2xl">
            <PlaceholderImage
              src={contactImage.src}
              alt={contactImage.alt}
              objectPosition={contactImage.objectPosition}
              blurDataURL={contactImage.blurDataURL}
              variant="studio"
              className="aspect-[4/5] lg:aspect-auto lg:h-full"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-20">
        <Reveal>
          <SectionHeading eyebrow="Pytania" title="Najczęstsze pytania." />
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
