import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Zasady rezerwacji - Weselna Furka",
  description:
    "Minimalne zasady wysyłania zgłoszeń rezerwacji auta na wesele przez stronę Weselna Furka.",
};

export default function BookingRulesPage() {
  return (
    <section className="site-container py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Zasady</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">
          Zasady rezerwacji
        </h1>
        <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-ink-muted">
          <p>
            Formularz na stronie służy do wysłania niezobowiązującego
            zgłoszenia rezerwacji samochodu na wesele.
          </p>
          <p>
            Wysłanie formularza nie oznacza zawarcia umowy ani gwarancji
            dostępności wybranego terminu. Rezerwacja jest ważna dopiero po
            indywidualnym potwierdzeniu przez Weselną Furkę mailowo lub
            telefonicznie.
          </p>
          <p>
            Ceny widoczne w konfiguratorze dotyczą standardowych warunków
            usługi. Trasy niestandardowe, terminy specjalne oraz dodatki
            oznaczone jako wycena indywidualna wymagają osobnego potwierdzenia.
          </p>
          <p>
            Na stronie nie pobieramy płatności online. Ewentualne warunki
            płatności są ustalane dopiero po potwierdzeniu terminu.
          </p>
          <p>
            Kontakt w sprawach rezerwacji:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-wine underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <p className="text-sm text-ink-faint">
            Ostatnia aktualizacja: 8 lipca 2026 r.
          </p>
        </div>
        <Link href="/konfigurator" className="btn-primary mt-8">
          Wróć do konfiguratora
        </Link>
      </div>
    </section>
  );
}
