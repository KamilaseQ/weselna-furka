import { Suspense } from "react";
import type { Metadata } from "next";
import { ReservationForm } from "@/components/ReservationForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Prośba o rezerwację — Weselna Furka",
  description:
    "Zostawcie dane, a my potwierdzimy termin. Płatność dopiero po potwierdzeniu rezerwacji.",
  path: "/rezerwacja",
  robots: { index: false, follow: true },
});

export default function RezerwacjaPage() {
  return (
    <>
      <h1 className="sr-only">Prośba o rezerwację auta do ślubu</h1>
      <Suspense
        fallback={
          <div className="site-container py-20 text-center text-ink-muted">
            Ładowanie…
          </div>
        }
      >
        <ReservationForm />
      </Suspense>
    </>
  );
}
