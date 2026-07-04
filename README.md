# Weselna Furka — frontend (Next.js)

Frontend strony wynajmu luksusowych aut na wesela. Zbudowany zgodnie ze stylem
mockupów `assets/generated/mockups-v3-balanced/` i strategią z `STRATEGIA.md`.

> **Status:** tylko frontend. Brak backendu i płatności online. Rezerwacja =
> wygenerowanie gotowej wiadomości „prośba o rezerwację” ze wszystkimi danymi
> (e-mail / WhatsApp / kopiuj). Zdjęcia to wygenerowane placeholdery — podmienimy
> je później bez zmian w kodzie.

## Uruchomienie

```bash
npm install
npm run dev      # tryb deweloperski → http://localhost:3000
# albo
npm run build && npm run start
```

Node 18.18+ / 20+ (testowane na Node 24).

## Co jest w środku

| Ścieżka | Opis |
|---|---|
| `/` | Strona główna: hero ze zdjęciami aut (crossfade, pauza przy otwartym kalendarzu), ścieżki rezerwacji, mała flota, obietnice, opinie (marquee), FAQ |
| `/konfigurator` | **Serce strony.** 4 kroki: Data i plan → Samochód → Personalizacja → Podsumowanie. Auto w 3D (przeciągnij, aby obrócić) + przełączane zdjęcia, kolor i dekoracje na żywo, cena w pasku postępu, link „Wyślij partnerowi” |
| `/flota`, `/flota/[slug]` | Duże prezentacje modeli (naprzemienne sekcje, galerie, specyfikacje) i szczegółowa karta auta |
| `/pakiety` | Basic / Standard / Premium (Standard wyróżniony) + „w każdym pakiecie” + FAQ |
| `/rezerwacja` | Formularz prośby o rezerwację — bez płatności; składa gotową wiadomość |
| `/o-nas`, `/kontakt`, `/start` | Strony wspierające (o nas: proces „jak pracujemy”, detale, opinie) |

## Flota
- **Mercedes-Benz S-Klasa** (limuzyna, rekomendowana)
- **Maserati Ghibli** (sportowa limuzyna)
- **BMW Seria 4 Coupé** — tymczasowo ukryta (`hidden: true` w `data/cars.ts`),
  dane zostają; do przywrócenia jedną flagą

Dane floty: `data/cars.ts` (listy renderują `visibleCars`). Dodatki/dekoracje:
`data/addons.ts`. Pakiety: `data/packages.ts`. Opinie: `data/reviews.ts`. FAQ:
`data/faq.ts`.

## Kalendarz i animacje

- `components/Calendar.tsx` + `components/DateField.tsx` — własny, elegancki
  kalendarz (popover, tydzień od poniedziałku, polskie nazwy); zastępuje natywne
  `<input type="date">` w hero, konfiguratorze i rezerwacji.
- `components/Reveal.tsx` — subtelne animacje wejścia przy scrollu
  (IntersectionObserver); wszystkie animacje respektują `prefers-reduced-motion`.

## System 3D / podgląd na żywo

3D występuje **wyłącznie w konfiguratorze** (hero i karty floty używają zdjęć).
`components/car/CarVisualizer.tsx` to wizualizacja auta zbudowana jako wytłaczana
(extrudowana) bryła SVG obracana w przestrzeni 3D (CSS `transform-style: preserve-3d`).
- **Obrót:** przeciągnij myszką/palcem.
- **Kolor:** zmienia się natychmiast (gradient nadwozia z palety auta).
- **Dekoracje:** kwiaty na masce, wstążki, czerwony dywan — pojawiają się na żywo
  po zaznaczeniu dodatku w konfiguratorze.
- Sylwetki aut (coupe / sedan / limo): `components/car/shapes.ts`.

Komponent jest celowo niezależny od źródła grafiki — gdy będą prawdziwe zdjęcia
360°/render, podmienia się warstwę wizualną bez przebudowy stron.
