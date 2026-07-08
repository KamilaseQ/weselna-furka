import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/contact";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Polityka prywatności",
  description:
    "Minimalna informacja o przetwarzaniu danych osobowych w formularzu rezerwacji Weselna Furka.",
  path: "/polityka-prywatnosci",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Strona główna", path: "/" },
  { name: "Polityka prywatności", path: "/polityka-prywatnosci" },
]);

export default function PrivacyPolicyPage() {
  return (
    <section className="site-container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Prywatność</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">
          Polityka prywatności
        </h1>
        <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-muted">
          <p>
            Administratorem danych jest właściciel serwisu Weselna Furka. Dane
            identyfikacyjne firmy zostaną uzupełnione po finalnym wyborze formy
            prowadzenia działalności. Kontakt:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-wine underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <p>
            Przetwarzamy dane podane w formularzu: imię i nazwisko, adres
            e-mail, numer telefonu, datę ślubu, trasę lub adres odbioru, wybrane
            auto albo pakiet, dodatki oraz treść dodatkowej wiadomości.
          </p>
          <p>
            Dane wykorzystujemy w celu obsługi zgłoszenia, kontaktu z osobą
            składającą zapytanie, potwierdzenia lub odmowy rezerwacji oraz
            obrony ewentualnych roszczeń.
          </p>
          <p>
            Podstawa przetwarzania to podjęcie działań przed zawarciem umowy,
            wykonanie ustaleń związanych z rezerwacją oraz prawnie uzasadniony
            interes administratora polegający na obsłudze zapytań i ochronie
            przed roszczeniami.
          </p>
          <p>
            Odbiorcami danych mogą być dostawcy hostingu, bazy danych, poczty
            e-mail oraz narzędzi technicznych potrzebnych do działania strony.
          </p>
          <p>
            Zgłoszenia, które nie kończą się rezerwacją, przechowujemy do 12
            miesięcy. Dane związane z potwierdzonymi rezerwacjami przechowujemy
            przez okres wymagany przepisami lub potrzebny do obrony roszczeń.
          </p>
          <p>
            Masz prawo dostępu do danych, ich poprawienia, usunięcia,
            ograniczenia przetwarzania, wniesienia sprzeciwu oraz złożenia skargi
            do Prezesa Urzędu Ochrony Danych Osobowych.
          </p>
          <p>
            Dane nie są wykorzystywane do automatycznego podejmowania decyzji.
          </p>
          <p className="text-sm text-ink-faint">
            Ostatnia aktualizacja: 8 lipca 2026 r.
          </p>
        </div>
      </div>
    </section>
  );
}
