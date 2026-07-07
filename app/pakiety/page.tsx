import type { Metadata } from "next";
import Link from "next/link";
import { packageTiers, compareRows } from "@/data/packages";
import { CheckIcon, ArrowRight } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { formatPLNShort } from "@/lib/format";

export const metadata: Metadata = {
  title: "Gotowe pakiety — Weselna Furka",
  description:
    "Basic, Standard i Premium w jednej tabeli — porównajcie punkt po punkcie, co dostajecie. Kierowca w cenie, bez dopłat na miejscu.",
  // packages are temporarily hidden from the flow — keep the route working but
  // out of search results
  robots: { index: false, follow: false },
};

/** cell content for the comparison matrix */
function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <CheckIcon className="mx-auto h-5 w-5 text-wine" aria-label="w pakiecie" />;
  if (value === false)
    return (
      <span className="text-ink-faint" aria-label="brak">
        —
      </span>
    );
  return <span className="text-sm font-medium text-ink-soft">{value}</span>;
}

export default function PakietyPage() {
  return (
    <>
      <section className="site-container py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Gotowe pakiety"
            title="Porównanie pakietów."
            subtitle="Trzy warianty w stałych cenach. W tabeli widać dokładnie, co zawiera każdy z nich."
          />
        </Reveal>

        <Reveal delay={120}>
          {/* pt-4 gives the floating "Najczęściej wybierany" badge room inside the scroll clip */}
          <div className="mt-10 overflow-x-auto px-1 pb-2 pt-4">
            <table className="w-full min-w-[760px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-[26%] align-bottom" aria-label="Cecha" />
                  {packageTiers.map((t) => (
                    <th
                      key={t.id}
                      scope="col"
                      className={`relative rounded-t-3xl px-6 pb-6 pt-8 text-center align-bottom font-normal ${
                        t.highlight
                          ? "border-x border-t border-wine/25 bg-white shadow-card"
                          : ""
                      }`}
                    >
                      {t.badge && (
                        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-wine px-4 py-1 text-[10px] font-medium uppercase tracking-wider2 text-cream-50">
                          {t.badge}
                        </span>
                      )}
                      <p className="font-serif text-3xl text-ink">{t.name}</p>
                      <p className="mt-4 font-serif text-ink">
                        <span className="text-sm text-ink-muted">od </span>
                        <span className="text-3xl">
                          {formatPLNShort(t.priceFrom)}
                        </span>
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-wider2 text-ink-faint">
                        {t.duration} · kierowca w cenie
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, ri) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="border-t border-ink/8 py-4 pr-6 text-left text-sm font-normal text-ink-muted"
                    >
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={`border-t border-ink/8 px-6 py-4 text-center ${
                          packageTiers[i].highlight
                            ? "border-x border-x-wine/25 bg-white"
                            : ""
                        }`}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
                {/* CTA row */}
                <tr>
                  <td className="border-t border-ink/8" />
                  {packageTiers.map((t) => (
                    <td
                      key={t.id}
                      className={`rounded-b-3xl border-t border-ink/8 px-6 pb-7 pt-6 text-center ${
                        t.highlight
                          ? "border-x border-b border-wine/25 bg-white shadow-card"
                          : ""
                      }`}
                    >
                      <Link
                        href={`/rezerwacja?package=${t.id}`}
                        className={`w-full ${t.highlight ? "btn-primary" : "btn-ghost"}`}
                      >
                        Wybierz {t.name}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-10 text-center text-ink-muted">
            Potrzebujecie innego zestawu?{" "}
            <Link
              href="/konfigurator"
              className="inline-flex items-center gap-1.5 font-medium text-wine underline underline-offset-4 transition-colors hover:text-wine-deep"
            >
              Skonfigurujcie własny
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="site-container pb-8 pt-8">
        <Reveal>
          <SectionHeading eyebrow="Pytania" title="Dobrze wiedzieć." />
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </Reveal>
      </section>
    </>
  );
}
