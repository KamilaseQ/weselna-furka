import { Suspense } from "react";
import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";

export const metadata: Metadata = {
  title: "Konfigurator — Weselna Furka",
  description:
    "Cztery kroki: data, trasa na mapie, samochód i dodatki. Cena widoczna na każdym kroku, kierowca w cenie.",
};

export default function KonfiguratorPage() {
  return (
    <Suspense fallback={<div className="site-container py-20 text-center text-ink-muted">Ładowanie konfiguratora…</div>}>
      <Configurator />
    </Suspense>
  );
}
