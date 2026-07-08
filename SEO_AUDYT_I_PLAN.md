# SEO audyt i plan dominacji organicznej

Data audytu: 2026-07-08  
Audytowana strona: https://www.weselnafurka.pl/  
Zakres: tylko rzeczy zalezne od wlasciciela strony: kod, treści, struktura, dane, obrazy, wydajnosc, indeksacja, pomiar.

## 1. Najwazniejszy wniosek

Strona ma dobry fundament UX i Next.js daje dobry potencjal SEO, ale obecnie produkcja wysyla Google bardzo slabe sygnaly kanoniczne:

- Wszystkie sprawdzone strony maja `rel="canonical"` ustawione na `http://localhost:3000`.
- `og:url` i JSON-LD tez wskazuja `http://localhost:3000`.
- Produkcja przekierowuje `https://weselnafurka.pl/` na `https://www.weselnafurka.pl/`, ale sitemap i robots wskazuja wersje bez `www`.
- Globalny canonical w `app/layout.tsx` ustawia kanoniczna wersje kazdej podstrony na `/`, czyli w praktyce na strone glowna.
- Dla `site:weselnafurka.pl` nie widzialem wynikow w Google w trakcie audytu. To nie jest dowod kary, ale po poprawkach trzeba natychmiast podpiac Search Console i recznie zglosic kluczowe URL-e.

To jest P0. Bez tego nawet najlepsze tresci beda mialy utrudniony start.

## 2. Co juz jest dobre

- Next.js App Router generuje statyczne strony: `/`, `/flota`, `/flota/[slug]`, `/kontakt`, `/o-nas`, `/konfigurator`, `/sitemap.xml`, `/robots.txt`.
- Build przechodzi poprawnie.
- First Load JS jest umiarkowany: ok. 87 kB wspolnego JS, 98-112 kB na wiekszosci stron.
- Sa podstawowe meta title i description.
- Sa strony modelowe dla aut: Mercedes-Benz S-Klasa i Maserati Ghibli.
- Jest sitemap i robots.
- Sa elementy zaufania: cena od, kierowca w cenie, FAQ, kontakt, zasady rezerwacji, polityka prywatnosci.
- Sa dane strukturalne dla biznesu, ale wymagaja poprawienia i rozbudowy.

## 3. Krytyczne poprawki techniczne P0

### 3.1. Ujednolic domenę kanoniczna

Wybierz jedna wersje:

- rekomendacja: `https://www.weselnafurka.pl`, bo produkcja juz na nia przekierowuje;
- alternatywa: zmien przekierowanie Vercel tak, aby `www` szlo na bez `www`.

Potem:

- ustaw `NEXT_PUBLIC_SITE_URL="https://www.weselnafurka.pl"` w produkcji;
- zmien `.env.example`;
- zmien `SITE_URL` w sitemap i robots tak, aby korzystaly z jednej stalej z `lib/contact.ts`, a nie mialy hardcodowanej innej domeny;
- zaktualizuj JSON-LD `url`, `@id`, `logo`, `image`;
- zaktualizuj wszystkie `og:url`.

### 3.2. Napraw canonical per podstrona

Usun globalne:

```ts
alternates: { canonical: "/" }
```

z `app/layout.tsx`, bo teraz kazda podstrona dziedziczy canonical strony glownej.

Dodaj per route:

- `/` -> `https://www.weselnafurka.pl/`
- `/flota` -> `/flota`
- `/flota/mercedes-s-klasa` -> `/flota/mercedes-s-klasa`
- `/flota/maserati-ghibli` -> `/flota/maserati-ghibli`
- `/kontakt` -> `/kontakt`
- `/o-nas` -> `/o-nas`
- `/cennik` lub `/pakiety` -> odpowiedni URL, jesli ma byc indeksowany.

### 3.3. Robots i noindex

Obecnie `/pakiety` ma `noindex, nofollow` i jest zablokowane w robots. To marnuje bardzo dobra intencje SEO: "cennik auta do slubu Warszawa", "auto do slubu cena".

Plan:

- odblokowac i zaindeksowac strone cenowa jako `/cennik` albo `/pakiety`;
- jesli `/rezerwacja` ma byc nieindeksowana, nie blokowac jej w `robots.txt`; ustawic `noindex, follow`, aby Google mogl wejsc i zobaczyc `noindex`;
- w `robots.txt` zostawic blokady dla `/admin` i `/api`;
- nie opierac usuwania z indeksu na samym `robots.txt`, bo zablokowany URL moze nadal pojawic sie w wynikach, jesli Google pozna go z linkow.

### 3.4. H1 na kazdej waznej stronie

Crawl produkcji:

- `/flota` nie ma H1;
- `/konfigurator` nie ma H1;
- `/pakiety` nie ma H1;
- `/rezerwacja` nie ma H1.

Do zrobienia:

- rozszerzyc `SectionHeading` o prop `as="h1" | "h2"` albo stworzyc osobny `PageHeading`;
- na kazdej stronie miec jeden jasny, widoczny H1 z fraza glowna;
- nie chowac H1 jako tylko "brandowy" slogan, jesli strona ma lapac ruch transakcyjny.

Przyklady H1:

- `/`: "Luksusowe auto do slubu w Warszawie z kierowca"
- `/flota`: "Samochody do slubu w Warszawie: Mercedes S-Klasa i Maserati Ghibli"
- `/flota/mercedes-s-klasa`: "Mercedes-Benz S-Klasa do slubu w Warszawie"
- `/flota/maserati-ghibli`: "Maserati Ghibli do slubu w Warszawie"
- `/cennik`: "Cennik wynajmu auta do slubu w Warszawie"
- `/konfigurator`: "Skonfiguruj samochod do slubu w Warszawie"

## 4. Struktura stron, ktora powinna powstac

### 4.1. Strony podstawowe do indeksowania

1. `/`
   - Fraza glowna: "auto do slubu Warszawa"
   - Cel: strona glowna dla ogolnej intencji lokalnej.

2. `/flota`
   - Frazy: "samochody do slubu Warszawa", "luksusowe auta do slubu Warszawa"
   - Cel: przeglad aut, linkowanie do modeli.

3. `/flota/mercedes-s-klasa`
   - Frazy: "Mercedes S-Klasa do slubu Warszawa", "wynajem Mercedes S klasa wesele Warszawa"
   - Cel: strona modelowa o wysokiej intencji.

4. `/flota/maserati-ghibli`
   - Frazy: "Maserati Ghibli do slubu Warszawa", "Maserati na wesele Warszawa"
   - Cel: strona modelowa o wysokiej intencji.

5. `/cennik` albo zaindeksowane `/pakiety`
   - Frazy: "auto do slubu Warszawa cena", "wynajem samochodu do slubu cennik"
   - Cel: przechwycenie uzytkownikow porownujacych koszt.

6. `/kontakt`
   - Frazy wspierajace: "wynajem auta do slubu Warszawa kontakt", ale glownie konwersja i dane NAP.

7. `/o-nas`
   - Cel: zaufanie, E-E-A-T, proces, realne osoby, gwarancje.

### 4.2. Strony lokalne

Nie robic setek cienkich doorway pages. Robic tylko obszary, ktore realnie obslugujecie i dla ktorych mozna napisac unikalna tresc logistyczna.

Startowy zestaw:

- `/auto-do-slubu/warszawa`
- `/auto-do-slubu/wilanow`
- `/auto-do-slubu/mokotow`
- `/auto-do-slubu/piaseczno`
- `/auto-do-slubu/konstancin-jeziorna`
- `/auto-do-slubu/pruszkow`
- `/auto-do-slubu/legionowo`
- `/auto-do-slubu/marki`
- `/auto-do-slubu/otwock`
- `/auto-do-slubu/minsk-mazowiecki`

Kazda strona musi miec:

- H1: "Auto do slubu [miasto/dzielnica] - Mercedes S-Klasa i Maserati z kierowca"
- 700-1200 slow unikalnej tresci;
- opis dojazdu, promienia, typowych tras, czasu bufora;
- ceny od i warunki: 6h, 100 km, kierowca w cenie;
- sekcje aut dostepnych dla tego obszaru;
- FAQ specyficzne dla obszaru;
- link do konfiguratora z predefiniowanym obszarem, jesli technicznie mozliwe;
- linki wewnetrzne do aut i cennika.

### 4.3. Strony model + miasto

Dla aut, ktore faktycznie macie:

- `/wynajem/mercedes-s-klasa/warszawa`
- `/wynajem/maserati-ghibli/warszawa`

Nie duplikowac 1:1 tresci ze stron `/flota/[slug]`. Najlepiej:

- `/flota/[slug]` jako strona produktowa/modelowa;
- `/wynajem/[model]/[miasto]` jako landing transakcyjny: cena, trasa, co w cenie, FAQ lokalne.

Jesli tresc bylaby prawie taka sama, lepiej najpierw rozbudowac `/flota/[slug]` i dopiero potem robic landing.

### 4.4. Poradnik SEO

Blog nie musi byc w glownej nawigacji, ale powinien byc w stopce i linkowac do stron sprzedazowych.

Pierwsze 12 artykulow:

1. `/poradnik/ile-kosztuje-auto-do-slubu-warszawa`
2. `/poradnik/jaki-samochod-do-slubu-wybrac`
3. `/poradnik/mercedes-s-klasa-czy-maserati-ghibli-do-slubu`
4. `/poradnik/auto-do-slubu-z-kierowca-czy-bez`
5. `/poradnik/kiedy-rezerwowac-auto-do-slubu`
6. `/poradnik/ile-godzin-wynajac-auto-do-slubu`
7. `/poradnik/dekoracja-samochodu-do-slubu`
8. `/poradnik/najpopularniejsze-samochody-do-slubu-warszawa`
9. `/poradnik/trasa-slubna-warszawa-jak-zaplanowac-przejazd`
10. `/poradnik/sesja-slubna-z-luksusowym-autem-warszawa`
11. `/poradnik/co-powinno-byc-w-cenie-auta-do-slubu`
12. `/poradnik/checklista-rezerwacji-samochodu-do-slubu`

Kazdy artykul:

- 900-1600 slow;
- konkretne odpowiedzi na pytania;
- cena, warunki, zakres uslugi, przyklady;
- 3-6 linkow wewnetrznych;
- FAQ na koncu;
- data aktualizacji;
- autor / marka;
- schema `Article` i `BreadcrumbList`.

## 5. Konkretne frazy do zagospodarowania

### Transakcyjne P0

- auto do slubu Warszawa
- samochod do slubu Warszawa
- samochod na wesele Warszawa
- wynajem auta do slubu Warszawa
- wynajem samochodu do slubu Warszawa
- luksusowe auto do slubu Warszawa
- auto do slubu z kierowca Warszawa
- limuzyna do slubu Warszawa
- cennik auta do slubu Warszawa
- auto do slubu cena Warszawa

### Modelowe P0/P1

- Mercedes S-Klasa do slubu Warszawa
- Mercedes S klasa na wesele Warszawa
- wynajem Mercedes S klasa z kierowca Warszawa
- Maserati Ghibli do slubu Warszawa
- Maserati na wesele Warszawa
- Maserati z kierowca Warszawa

### Problemowe P1

- ile kosztuje auto do slubu
- ile kosztuje wynajem auta do slubu w Warszawie
- kiedy rezerwowac auto do slubu
- auto do slubu z kierowca czy bez
- ile godzin wynajac samochod do slubu
- dekoracja samochodu do slubu
- jaki samochod do slubu

### Lokalizacje P1/P2

- auto do slubu Wilanow
- auto do slubu Mokotow
- auto do slubu Piaseczno
- auto do slubu Konstancin-Jeziorna
- auto do slubu Pruszkow
- auto do slubu Legionowo
- auto do slubu Marki
- auto do slubu Otwock

## 6. Zmiany w tresci istniejacych stron

### 6.1. Strona glowna

Obecny H1 jest ladny, ale za malo SEO:

> "Mercedes-Benz na Wasze wesele."

Lepszy kierunek:

> "Luksusowe auto do slubu w Warszawie z kierowca"

Pod H1 dodac 120-180 slow normalnego tekstu, nie tylko kroki:

> Wynajem samochodu do slubu w Warszawie i okolicach: Mercedes-Benz S-Klasa i Maserati Ghibli z eleganckim kierowca, przygotowaniem auta i jasna cena od razu. Wybierz date, trase, dekoracje i sprawdz koszt przejazdu bez wymiany kilkunastu maili.

Dodac na homepage:

- mini cennik: "od 2500 zl / 6h / kierowca w cenie";
- sekcje "Co obejmuje cena";
- sekcje "Obslugujemy Warszawe i okolice";
- linki tekstowe do stron: "Mercedes S-Klasa do slubu", "Maserati Ghibli do slubu", "Cennik auta do slubu";
- 6-8 FAQ z pytaniami zawierajacymi frazy uzytkownikow;
- opinie, jesli sa prawdziwe i masz zgody.

### 6.2. Strony aut

Obecnie modelowe strony sa za cienkie i maja H1 tylko z nazwa auta. Trzeba zrobic z nich pelne landing page.

Struktura:

- H1: "[Model] do slubu w Warszawie"
- lead: cena, czas, kierowca, obszar;
- galeria realnych zdjec;
- "Dlaczego ten model pasuje do slubu";
- "Co zawiera wynajem";
- "Cena i warunki";
- "Trasa i obszar obslugi";
- "Dekoracje i przygotowanie";
- "Najczestsze pytania o [model]";
- "Alternatywy": link do drugiego auta;
- "Sprawdz termin" CTA.

Docelowo 900-1400 slow unikalnej tresci na model.

### 6.3. Flota

Zmiana H1 i copy:

- H1: "Samochody do slubu w Warszawie"
- lead 150 slow z naturalnymi frazami;
- karty aut z linkami typu "Mercedes S-Klasa do slubu - szczegoly", nie tylko "Szczegoly";
- porownanie: komfort, styl, cena od, liczba miejsc, najlepsze dla;
- FAQ: "Ktore auto wybrac do sukni z trenem?", "Ktore auto jest najlepsze na zdjecia?", "Czy kolor auta jest staly?".

### 6.4. Cennik / pakiety

To powinna byc jedna z najwazniejszych stron SEO.

Rekomendacja:

- albo zmien `/pakiety` na `/cennik`;
- albo dodaj canonical `/cennik` i przekieruj `/pakiety` 301 do `/cennik`;
- usun `noindex`;
- usun blokade z robots.

H1:

> Cennik wynajmu auta do slubu w Warszawie

Sekcje:

- ceny od dla kazdego auta;
- co jest w cenie;
- co podnosi cene;
- ile kosztuja dodatki;
- przykladowe scenariusze: 6h, 8h, caly dzien;
- FAQ kosztowe;
- link do konfiguratora.

### 6.5. Kontakt

Dodac:

- pelniejsze dane NAP na stronie: nazwa, telefon, e-mail, obszar, godziny;
- jesli firma ma adres do pokazania: pelny adres w stopce i LocalBusiness;
- jezeli nie ma punktu obslugi: napisac jasno "obsluga mobilna / Warszawa i okolice";
- linki do kluczowych stron: cennik, flota, konfigurator.

### 6.6. O nas

Dodac elementy E-E-A-T:

- kto prowadzi usluge;
- realne zdjecia ludzi/aut;
- procedura przygotowania auta;
- procedura awaryjna: co jesli auto ulegnie awarii;
- ubezpieczenie / legalnosc / umowa;
- doswiadczenie, nawet jesli skromne, ale prawdziwe;
- "jak dbamy o punktualnosc".

## 7. Dane strukturalne

### 7.1. Globalne JSON-LD

Obecny `AutoRental` jest dobrym startem, ale trzeba:

- poprawic `url` z localhost;
- dodac `@id`: `https://www.weselnafurka.pl/#business`;
- dodac `image`;
- dodac `logo`;
- dodac `openingHoursSpecification`;
- dodac `areaServed` jako lista miejsc;
- dodac `sameAs`, jesli sa profile social;
- dodac `priceRange`;
- dodac realny adres tylko wtedy, gdy mozna go publicznie pokazac.

### 7.2. BreadcrumbList

Dla wszystkich podstron:

- `/flota` -> Home > Flota
- `/flota/mercedes-s-klasa` -> Home > Flota > Mercedes-Benz S-Klasa
- `/cennik` -> Home > Cennik
- `/poradnik/...` -> Home > Poradnik > Artykul

To jest niski koszt i czysty sygnal struktury.

### 7.3. Service / Offer

Na stronach sprzedazowych:

- `Service`: "Wynajem samochodu do slubu z kierowca"
- `provider`: `Weselna Furka`
- `areaServed`: Warszawa i okolice
- `offers`: cena od, waluta PLN, URL konfiguratora lub cennika

Na stronach modeli:

- mozna dodac `Vehicle` jako encje pomocnicza;
- dla widocznej oferty dodac `Offer` z cena od i URL;
- review schema tylko dla prawdziwych opinii widocznych na stronie i zgodnych z wytycznymi.

### 7.4. FAQ schema

FAQ nadal warto miec na stronie dla uzytkownikow i semantyki, ale nie traktowac FAQPage jako glowny sposob na rich results. Google ograniczyl pokazywanie FAQ rich results glownie do autorytatywnych stron rzadowych i zdrowotnych.

## 8. Obrazy i SEO wizualne

Obecne pliki w `public/images/generated` maja 1.7-2.3 MB kazdy. Next optymalizuje serwowanie przez `/_next/image`, ale nadal warto poprawic zrodla i strategię.

Do zrobienia:

- zamien placeholdery AI na realne zdjecia aut i realne zdjecia slubne;
- przygotuj wersje WebP/AVIF;
- trzymaj oryginaly w sensownej rozdzielczosci, np. 1600-2200 px dla duzych hero, nie 4K bez potrzeby;
- popraw alt text z angielskiego na polski;
- usun niespojnosci typu "Black Maserati", jesli auto w ofercie jest "biala perla";
- nazwy plikow opisowe: `mercedes-s-klasa-do-slubu-warszawa-biala.webp`;
- dodaj podpisy pod wybranymi zdjeciami, szczegolnie realne realizacje;
- dodaj `openGraph.images` 1200x630 dla strony glownej i stron aut.

Przyklady alt:

- "Bialy Mercedes-Benz S-Klasa do slubu w Warszawie"
- "Wnetrze Mercedes-Benz S-Klasa dla pary mlodej"
- "Maserati Ghibli przygotowane do przejazdu slubnego"

## 9. Performance i Core Web Vitals

Nie mialem w tej sesji dostepu do Chrome DevTools MCP, wiec nie wykonalem pelnego trace LCP/INP/CLS. Z kodu i produkcyjnego HTML-a widac jednak konkretne punkty:

- hero preloadinguje duze zdjecie auta;
- jest kilka preloadow fontow;
- font Cormorant Garamond laduje wiele wag i style italic;
- obrazy zrodlowe sa duze;
- strona korzysta z animacji wejscia, ale tekst jest w HTML, wiec SEO nie powinno polegac na samym JS.

Plan:

- po poprawkach kanonicznych uruchomic Lighthouse/PageSpeed dla mobile i desktop;
- pilnowac progow: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1;
- ograniczyc fonty do minimalnych wag;
- ustawic tylko jeden obraz `priority` na danej stronie;
- upewnic sie, ze LCP image jest natychmiast wykrywalny i ma poprawny `sizes`;
- dodac `placeholder="blur"` lub lekkie dominant-color placeholdery;
- sprawdzic, czy carousel w hero nie dociaga zbyt duzo obrazow krytycznie;
- zoptymalizowac CSS i animacje, jesli Lighthouse pokaze render delay.

## 10. Linkowanie wewnetrzne

Do poprawy:

- link "Szczegoly" zmienic na opisowe anchory, np. "Mercedes S-Klasa do slubu - szczegoly";
- w stopce dodac linki do: Cennik, Mercedes S-Klasa do slubu, Maserati Ghibli do slubu, Auto do slubu Warszawa;
- z kazdego artykulu poradnikowego linkowac do konkretnego auta i cennika;
- na stronach aut dodac "porownaj z..." i link do drugiego auta;
- dodac breadcrumbs widoczne i JSON-LD;
- dodac sekcje "Popularne pytania" z linkami do poradnika.

## 11. Konkurencja i luka rynkowa

SERP dla Warszawy pokazuje duzo agregatorow i ofert o niskiej jakosci tekstu:

- Wesele z Klasa, PlanujemyWesele, Wedding.pl, samochody-weselne.pl;
- pojedyncze wypozyczalnie z cennikiem i modelowymi stronami;
- czesc konkurencji ma ceny, ale slabe UX i malo transparentna strukture;
- czesc ma modelowe landing page, ale tekst jest generyczny.

Wasza realna szansa:

- lepsza strona mobilna;
- natychmiastowy konfigurator;
- transparentny cennik;
- mocne strony modelowe;
- prawdziwe zdjecia i opinie;
- programmatic SEO, ale tylko z unikalna trescia;
- jasne gwarancje i procedury.

## 12. Kolejnosc wdrozenia

### Sprint 1: techniczne odblokowanie SEO

1. Ustawic produkcyjne `NEXT_PUBLIC_SITE_URL` na docelowa domene.
2. Ujednolic `SITE_URL` w aplikacji, sitemap i robots.
3. Usunac globalny canonical z layoutu.
4. Dodac canonical per route.
5. Naprawic `og:url` i JSON-LD.
6. Zdecydowac: `/pakiety` czy `/cennik`; usunac `noindex`, jesli ma lapac ruch.
7. Dodac H1 na `/flota`, `/konfigurator`, `/cennik`, ewentualnie `/rezerwacja`.
8. Podpiac Search Console i zglosic sitemap po deployu.

### Sprint 2: strony, ktore zarabiaja

1. Rozbudowac home pod "auto do slubu Warszawa".
2. Rozbudowac `/flota`.
3. Rozbudowac `/flota/mercedes-s-klasa`.
4. Rozbudowac `/flota/maserati-ghibli`.
5. Zrobic `/cennik`.
6. Dodac BreadcrumbList i Service schema.
7. Dodac OG images.

### Sprint 3: long-tail lokalny

1. Zrobic `/auto-do-slubu/warszawa`.
2. Zrobic 4-6 najlepszych lokalizacji: Wilanow, Mokotow, Piaseczno, Konstancin-Jeziorna, Pruszkow, Legionowo.
3. Kazda strona ma miec unikalna tresc, FAQ i linki do aut.
4. Dodac lokalizacje do sitemap.

### Sprint 4: poradnik i przewaga informacyjna

1. Wdrozyc `/poradnik`.
2. Opublikowac 6 pierwszych artykulow.
3. Linkowac z poradnika do cennika i aut.
4. Dodac Article schema.
5. Aktualizowac artykuly po danych z Search Console.

### Sprint 5: dowody zaufania i obrazy

1. Podmienic AI placeholdery na realne zdjecia.
2. Dodac galerie realizacji.
3. Dodac prawdziwe opinie z imieniem, autem, miesiacem i zgoda.
4. Dodac strone `/opinie` albo sekcje opinii na home, modelach i cenniku.
5. Dodac procedury gwarancyjne i awaryjne.

## 13. Mini-checklista kazdej nowej strony

- Jeden H1 z fraza glowna.
- Title unikalny, z fraza na poczatku.
- Meta description jako konkretna obietnica, cena/obszar/CTA.
- Canonical wskazuje dokladnie te strone.
- URL w sitemap.
- Brak przypadkowego `noindex`.
- Breadcrumb widoczny i JSON-LD.
- Minimum 700 slow dla landing page.
- 3-8 linkow wewnetrznych.
- Obraz z opisowym alt.
- CTA nad foldem i na koncu.
- FAQ z pytaniami realnych klientow.
- Dane strukturalne zgodne z widoczna trescia.
- Sprawdzone mobile.
- Sprawdzone Lighthouse.

## 14. Przykladowe meta

### Home

Title:

> Auto do slubu Warszawa | Luksusowe auta z kierowca

Description:

> Wynajem auta do slubu w Warszawie i okolicach. Mercedes S-Klasa lub Maserati z kierowca, cena od razu w konfiguratorze, bez ukrytych doplat.

### Mercedes

Title:

> Mercedes S-Klasa do slubu Warszawa | Wynajem z kierowca

Description:

> Wynajmij Mercedes-Benz S-Klasa do slubu w Warszawie. Biala perla, kierowca w garniturze, przygotowanie auta i cena od 2500 zl za 6h.

### Maserati

Title:

> Maserati Ghibli do slubu Warszawa | Sportowa limuzyna

Description:

> Maserati Ghibli na wesele w Warszawie z kierowca. Elegancki przejazd, przygotowane auto, dodatki i konfigurator ceny online.

### Cennik

Title:

> Cennik auta do slubu Warszawa | Weselna Furka

Description:

> Sprawdz ile kosztuje wynajem samochodu do slubu w Warszawie. Pakiety od 2500 zl, kierowca w cenie, dekoracje i dodatki jasno opisane.

## 15. Zrodla uzyte do audytu

- Google Search Central: SEO Starter Guide - https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central: canonical URLs - https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central: robots.txt - https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Google Search Central: sitemaps - https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central: snippets/meta descriptions - https://developers.google.com/search/docs/appearance/snippet
- Google Search Central: LocalBusiness structured data - https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Search Central: Product structured data - https://developers.google.com/search/docs/appearance/structured-data/product
- Google Search Central: link best practices - https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google Search Central: FAQ rich result changes - https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Google Search Central: AI features optimization - https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- web.dev: Web Vitals - https://web.dev/articles/vitals

