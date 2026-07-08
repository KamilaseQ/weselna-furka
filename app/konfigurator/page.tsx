import { Suspense } from "react";
import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Konfigurator auta do ślubu Warszawa",
  description:
    "Skonfiguruj auto do ślubu w Warszawie: data, trasa, Mercedes lub Maserati, dodatki i cena widoczna na każdym kroku.",
  path: "/konfigurator",
  keywords: [
    "konfigurator auta do ślubu",
    "auto do ślubu Warszawa cena",
    "wynajem auta do ślubu Warszawa",
  ],
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Strona główna", path: "/" },
  { name: "Konfigurator", path: "/konfigurator" },
]);

export default function KonfiguratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <h1 className="sr-only">
        Konfigurator auta do ślubu w Warszawie
      </h1>
      <Suspense fallback={<div className="site-container py-20 text-center text-ink-muted">Ładowanie konfiguratora…</div>}>
        <Configurator />
      </Suspense>
    </>
  );
}
