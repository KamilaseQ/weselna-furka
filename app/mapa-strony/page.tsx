import Link from "next/link";
import { visibleCars } from "@/data/cars";
import {
  footerLandingGroups,
  poradnikLandingPages,
  rootLandingPages,
} from "@/data/seo-landings";
import { primarySeoLinks } from "@/data/seo-links";
import { buildPageMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight } from "@/components/icons";

export const metadata = buildPageMetadata({
  title: "Mapa strony - auto do ślubu Warszawa",
  description:
    "Mapa strony Weselna Furka: auta do ślubu w Warszawie, konfigurator, flota, poradniki i lokalne strony wynajmu samochodu z kierowcą.",
  path: "/mapa-strony",
  keywords: [
    "mapa strony Weselna Furka",
    "auto do ślubu Warszawa",
    "konfigurator auta do ślubu",
  ],
});

const coreLinks = [
  ...primarySeoLinks,
  {
    href: "/poradnik",
    label: "Poradnik auta do ślubu",
    description: "Wybór auta, czas wynajmu, dekoracje, kierowca i terminy.",
  },
  {
    href: "/kontakt",
    label: "Kontakt",
    description: "Telefon, e-mail i szybki kontakt w sprawie terminu.",
  },
];

const fleetLinks = visibleCars.map((car) => ({
  href: `/flota/${car.slug}`,
  label: `${car.name} do ślubu`,
  description: `${car.type}, kierowca w cenie, cena od ${car.basePrice} zł.`,
}));

const breadcrumb = breadcrumbJsonLd([
  { name: "Strona główna", path: "/" },
  { name: "Mapa strony", path: "/mapa-strony" },
]);

const itemList = itemListJsonLd("Mapa strony Weselna Furka", [
  ...coreLinks.map((link) => ({
    name: link.label,
    path: link.href,
    description: link.description,
  })),
  ...fleetLinks.map((link) => ({
    name: link.label,
    path: link.href,
    description: link.description,
  })),
  ...rootLandingPages.map((page) => ({
    name: page.h1,
    path: page.path,
    description: page.description,
  })),
  ...poradnikLandingPages.map((page) => ({
    name: page.h1,
    path: page.path,
    description: page.description,
  })),
]);

function LinkList({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; description?: string }[];
}) {
  return (
    <section className="border-t border-ink/10 pt-6">
      <h2 className="text-3xl text-ink">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white/45 p-4 text-sm transition hover:border-gold/40 hover:bg-white"
            >
              <span>
                <span className="font-medium text-ink">{link.label}</span>
                {link.description && (
                  <span className="mt-1 block leading-relaxed text-ink-muted">
                    {link.description}
                  </span>
                )}
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MapaStronyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <main className="site-container py-16">
        <SectionHeading
          as="h1"
          eyebrow="Mapa strony"
          title="Wszystkie ważne strony w jednym miejscu."
          subtitle="Szybkie przejście do konfiguratora, floty, poradników, lokalizacji i najważniejszych stron o wynajmie auta do ślubu w Warszawie."
        />

        <div className="mt-14 space-y-14">
          <LinkList title="Najważniejsze" links={coreLinks} />
          <LinkList title="Flota" links={fleetLinks} />
          {footerLandingGroups.map((group) => (
            <LinkList
              key={group.title}
              title={group.title}
              links={group.links.map((link) => ({
                href: link.href,
                label: link.label,
              }))}
            />
          ))}
        </div>
      </main>
    </>
  );
}
