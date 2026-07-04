import { Suspense } from "react";
import type { Metadata } from "next";
import { ReservationForm } from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Prośba o rezerwację — Weselna Furka",
  description:
    "Zostawcie dane, a my potwierdzimy termin. Płatność dopiero po potwierdzeniu rezerwacji.",
};

export default function RezerwacjaPage() {
  return (
    <Suspense
      fallback={
        <div className="site-container py-20 text-center text-ink-muted">
          Ładowanie…
        </div>
      }
    >
      <ReservationForm />
    </Suspense>
  );
}
