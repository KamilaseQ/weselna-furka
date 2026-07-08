import type { Metadata } from "next";
import Link from "next/link";
import { packageTiers, compareRows } from "@/data/packages";
import { buildPageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { formatPLNShort } from "@/lib/format";
import { CheckIcon, ArrowRight } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildPageMetadata({
  title: "Cennik auta do ślubu Warszawa",
  description:
    "Sprawdź ceny wynajmu auta do ślubu w Warszawie. Pakiety od 2500 zł, kierowca w cenie, dekoracje i dodatki jasno opisane.",
  path: "/cennik",
  keywords: [
    "auto do ślubu Warszawa cennik",
    "samochód do ślubu cena Warszawa",
    "wynajem auta do ślubu cena",
    "auto na wesele cena",
  ],
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Strona główna", path: "/" },
  { name: "Cennik", path: "/cennik" },
]);

const priceFaq = [
  {
    q: "Ile kosztuje wynajem auta do ślubu w Warszawie?",
    a: "Pakiety zaczynają się od 2500 zł. Dokładny koszt zależy od modelu, daty, czasu dyspozycji, trasy i dodatków.",
  },
  {
    q: "Czy kierowca jest w cenie wynajmu?",
    a: "Tak. W pakietach ślubnych kierowca w garniturze jest w cenie, razem z przygotowaniem auta przed trasą.",
  },
  {
    q: "Co najbardziej wpływa na końcową cenę?",
    a: "Największe znaczenie mają liczba godzin, liczba punktów przejazdu, odległość od Warszawy, wybrany model oraz dekoracje.",
  },
  {
    q: "Czy cena z konfiguratora jest ostateczna?",
    a: "Dla standardowych tras cena z konfiguratora jest punktem potwierdzenia. Trasy niestandardowe lub wyjazdy poza standardowy obszar potwierdzamy indywidualnie.",
  },
];

const faqSchema = faqJsonLd(priceFaq);

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <CheckIcon className="mx-auto h-5 w-5 text-wine" aria-label="w pakiecie" />;
  if (value === false)
    return (
      <span className="text-ink-faint" aria-label="brak">
        -
      </span>
    );
  return <span className="text-sm font-medium text-ink-soft">{value}</span>;
}

export default function CennikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="site-container py-16">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Cennik"
            title="Cennik wynajmu auta do ślubu w Warszawie."
            subtitle="Pakiety od 2500 zł. Kierowca, przygotowanie auta i podstawowe dekoracje opisane jasno, bez ukrywania najważniejszych kosztów."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 overflow-x-auto px-1 pb-2 pt-4">
            <table className="w-full min-w-[760px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-[26%] align-bottom" aria-label="Cecha" />
                  {packageTiers.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className={`relative rounded-t-3xl px-6 pb-6 pt-8 text-center align-bottom font-normal ${
                        tier.highlight
                          ? "border-x border-t border-wine/25 bg-white shadow-card"
                          : ""
                      }`}
                    >
                      {tier.badge && (
                        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-wine px-4 py-1 text-[10px] font-medium uppercase tracking-wider2 text-cream-50">
                          {tier.badge}
                        </span>
                      )}
                      <p className="font-serif text-3xl text-ink">{tier.name}</p>
                      <p className="mt-4 font-serif text-ink">
                        <span className="text-sm text-ink-muted">od </span>
                        <span className="text-3xl">
                          {formatPLNShort(tier.priceFrom)}
                        </span>
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-wider2 text-ink-faint">
                        {tier.duration} · kierowca w cenie
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="border-t border-ink/8 py-4 pr-6 text-left text-sm font-normal text-ink-muted"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.label}-${index}`}
                        className={`border-t border-ink/8 px-6 py-4 text-center ${
                          packageTiers[index].highlight
                            ? "border-x border-x-wine/25 bg-white"
                            : ""
                        }`}
                      >
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="border-t border-ink/8" />
                  {packageTiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={`rounded-b-3xl border-t border-ink/8 px-6 pb-7 pt-6 text-center ${
                        tier.highlight
                          ? "border-x border-b border-wine/25 bg-white shadow-card"
                          : ""
                      }`}
                    >
                      <Link
                        href={`/rezerwacja?package=${tier.id}`}
                        className={`w-full ${tier.highlight ? "btn-primary" : "btn-ghost"}`}
                      >
                        Wybierz {tier.name}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal>
            <div className="surface-card h-full p-6">
              <h2 className="text-2xl text-ink">Co jest w cenie</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Kierowca w garniturze, przygotowanie auta, detailing przed trasą,
                podstawowa dekoracja i kontakt przed uroczystością.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="surface-card h-full p-6">
              <h2 className="text-2xl text-ink">Co zmienia koszt</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Model auta, czas dyspozycji, liczba adresów, dojazd poza Warszawę,
                postoje na zdjęcia i dodatkowe dekoracje.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="surface-card h-full p-6">
              <h2 className="text-2xl text-ink">Najdokładniejsza wycena</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Najszybciej policzycie ją w konfiguratorze, podając datę, trasę,
                samochód i dodatki.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <Link href="/konfigurator" className="btn-primary">
              Skonfiguruj własny przejazd
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="site-container pb-8 pt-8">
        <Reveal>
          <SectionHeading eyebrow="Pytania" title="Najczęstsze pytania o cenę." />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink/10">
            {priceFaq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-serif text-2xl text-ink">
                  {item.q}
                  <span className="text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
