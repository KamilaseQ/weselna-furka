import Link from "next/link";
import { poradnikLandingPages } from "@/data/seo-landings";
import { buildPageMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { SectionHeading } from "@/components/SectionHeading";
import { SeoLinkCluster } from "@/components/SeoLinkCluster";
import { ArrowRight } from "@/components/icons";

export const metadata = buildPageMetadata({
  title: "Poradnik auta do ślubu Warszawa",
  description:
    "Praktyczny poradnik dla par: wybór samochodu do ślubu, cena, kierowca, dekoracje, terminy i sesja ślubna z autem.",
  path: "/poradnik",
  keywords: [
    "poradnik auto do ślubu",
    "jaki samochód do ślubu",
    "ile kosztuje auto do ślubu",
  ],
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Strona główna", path: "/" },
  { name: "Poradnik", path: "/poradnik" },
]);

const poradnikItemList = itemListJsonLd(
  "Poradniki o autach do ślubu",
  poradnikLandingPages.map((page) => ({
    name: page.h1,
    path: page.path,
    description: page.description,
  }))
);

export default function PoradnikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(poradnikItemList) }}
      />
      <section className="site-container py-16">
        <SectionHeading
          as="h1"
          eyebrow="Poradnik"
          title="Jak wybrać auto do ślubu w Warszawie."
          subtitle="Konkretne odpowiedzi o cenie, czasie wynajmu, kierowcy, dekoracjach i wyborze modelu."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {poradnikLandingPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="group rounded-2xl border border-ink/10 bg-white/55 p-6 transition hover:border-gold/40 hover:bg-white"
            >
              <p className="text-xs font-medium uppercase tracking-wider2 text-gold">
                {page.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl text-ink">{page.h1}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {page.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-wine">
                Czytaj poradnik
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SeoLinkCluster
        className="pt-8"
        title="Po poradniku przejdźcie do ceny, modeli i trasy."
        subtitle="Poradniki odpowiadają na pytania, a kolejne strony pomagają przejść do konkretnego auta i terminu."
      />
    </>
  );
}
