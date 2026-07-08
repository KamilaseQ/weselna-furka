import Image from "next/image";
import Link from "next/link";
import type { SeoLandingPage as SeoLandingPageData } from "@/data/seo-landings";
import { seoLandingPages } from "@/data/seo-landings";
import { visibleCars } from "@/data/cars";
import { getCarImages } from "@/data/images";
import { formatPLNShort } from "@/lib/format";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { CarCard } from "@/components/CarCard";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowRight,
  CalendarIcon,
  CarIcon,
  ClockIcon,
  DriverIcon,
  PinIcon,
  RouteIcon,
  SparkleIcon,
  TagIcon,
} from "@/components/icons";

interface FaqItem {
  q: string;
  a: string;
}

interface ContentSection {
  title: string;
  body: string[];
}

const modelLabels = {
  "mercedes-s-klasa": "Mercedes-Benz S-Klasa",
  "maserati-ghibli": "Maserati Ghibli",
};

function modelLabel(slug?: SeoLandingPageData["modelSlug"]) {
  return slug ? modelLabels[slug] : "samochód z aktualnej floty";
}

function minFleetPrice() {
  return Math.min(...visibleCars.map((car) => car.basePrice));
}

function buildHighlights(page: SeoLandingPageData) {
  const base = [
    {
      title: "Sprawdzenie terminu i trasy",
      text: "Podajecie datę, adresy i czas przejazdu. Dzięki temu od razu wiadomo, czy plan jest realny i jakiej obsługi potrzebujecie.",
      icon: CalendarIcon,
    },
    {
      title: "Kierowca w cenie",
      text: "Przejazd prowadzi elegancki kierowca, który zna plan dnia, pilnuje buforu czasu i zostaje w kontakcie przed uroczystością.",
      icon: DriverIcon,
    },
    {
      title: "Auto gotowe do uroczystości",
      text: "Samochód jest czysty, przygotowany pod zdjęcia i dopasowany do ślubnej oprawy bez przypadkowej improwizacji.",
      icon: SparkleIcon,
    },
  ];

  if (page.city) {
    return [
      {
        title: `Dojazd ${page.city.genitive}`,
        text: `${page.city.name} leży ok. ${page.city.distanceKm} km od centrum Warszawy. Przy kilku adresach warto od razu podać pełną trasę.`,
        icon: PinIcon,
      },
      ...base.slice(0, 2),
    ];
  }

  if (page.kind === "price") {
    return [
      {
        title: "Budżet bez zgadywania",
        text: "Na cenę wpływa model, czas, trasa i postoje. Najlepiej policzyć ją na realnym planie przejazdu, nie na orientacyjnym haśle.",
        icon: TagIcon,
      },
      ...base.slice(0, 2),
    ];
  }

  if (page.modelSlug) {
    return [
      {
        title: modelLabel(page.modelSlug),
        text: "Zaczynacie od konkretnego modelu, a potem dopasowujecie datę, trasę, czas i ewentualne dodatki.",
        icon: CarIcon,
      },
      ...base.slice(0, 2),
    ];
  }

  return base;
}

function buildSections(page: SeoLandingPageData): ContentSection[] {
  if (page.kind === "guide" && page.guideSections?.length) {
    return page.guideSections.map((section) => ({
      title: section.title,
      body: [section.body],
    }));
  }

  if (page.city && page.kind === "modelLocal") {
    return [
      {
        title: `${modelLabel(page.modelSlug)} ${page.city.locative}`,
        body: [
          `${modelLabel(page.modelSlug)} sprawdza się ${page.city.locative}, gdy chcecie połączyć konkretny model z przewidywalną logistyką. ${page.promise}`,
          "Najważniejsze są adresy, godziny i kolejność przejazdów: odbiór, ceremonia, sala oraz ewentualny postój na zdjęcia. Im pełniejszy plan podacie, tym dokładniej da się potwierdzić dostępność.",
        ],
      },
      {
        title: "Jak zaplanować przejazd",
        body: [
          `Przy ślubie ${page.city.genitive} sama informacja o mieście to za mało. Znaczenie ma to, czy auto jedzie tylko do ceremonii, czy zostaje także na przejazd pod salę i sesję.`,
          "Kierowca dostaje plan z buforem, dlatego warto od razu uwzględnić miejsca, w których samochód ma czekać lub pojawić się na zdjęciach.",
        ],
      },
      {
        title: "Cena i dostępność",
        body: [
          `Cena zależy od daty, czasu dyspozycji i pełnej trasy. ${page.city.name} mieści się w obsłudze Warszawy i okolic, ale kilka punktów przejazdu może zmienić czas wynajmu.`,
        ],
      },
    ];
  }

  if (page.city) {
    return [
      {
        title: `Auto do ślubu ${page.city.name}: co warto ustalić`,
        body: [
          `${page.city.name} jest naturalnym kierunkiem dla ślubów obsługiwanych z Warszawy. W tej lokalizacji ${page.city.routeNote}.`,
          "Przy rezerwacji liczy się nie tylko samo miasto, ale pełny scenariusz: odbiór, ceremonia, sala, zdjęcia i ewentualne oczekiwanie kierowcy.",
        ],
      },
      {
        title: "Jak wygląda przejazd",
        body: [
          `Najczęstszy plan ${page.city.locative} obejmuje odbiór pary, przejazd do USC lub kościoła, przejazd na salę i krótki postój na zdjęcia. Kierowca przyjeżdża z zapasem, bo w dniu ślubu punktualność jest ważniejsza niż optymistyczny harmonogram.`,
          "Jeżeli punkty trasy są dalej od siebie, najlepiej wpisać je od razu. Dzięki temu potwierdzenie terminu dotyczy realnego planu, nie samego hasła „auto do ślubu”.",
        ],
      },
      {
        title: "Samochód dopasowany do uroczystości",
        body: [
          "Aktualne modele zobaczycie w sekcji floty i w konfiguratorze. Wybór auta warto dopasować do stylu wesela, sukni, miejsca ceremonii i tego, czy planujecie zdjęcia przy samochodzie.",
        ],
      },
    ];
  }

  if (page.kind === "price") {
    return [
      {
        title: "Co realnie wpływa na cenę",
        body: [
          "Najważniejsze czynniki to wybrany model, liczba godzin, liczba punktów trasy, odległość od Warszawy oraz dodatki. Inaczej liczy się prosty przejazd na ceremonię, a inaczej obsługa z salą i sesją przy aucie.",
          "Dlatego sama fraza „auto do ślubu cena” zawsze wymaga doprecyzowania. Dobra wycena powinna uwzględniać cały przebieg dnia.",
        ],
      },
      {
        title: "Co powinno być w pakiecie",
        body: [
          "W ofercie ślubnej ważne są nie tylko kilometry. Para powinna wiedzieć, czy kierowca jest w cenie, czy auto będzie przygotowane do zdjęć, jak wygląda dekoracja i czy w planie jest bufor czasu.",
        ],
      },
      {
        title: "Jak przygotować dane do wyceny",
        body: [
          "Najlepiej podać datę, orientacyjne godziny, adres odbioru, miejsce ceremonii, salę i informację o sesji. Na tej podstawie można ocenić czas, trasę i dostępność samochodu.",
        ],
      },
    ];
  }

  if (page.kind === "driver") {
    return [
      {
        title: "Po co kierowca w dniu ślubu",
        body: [
          "Kierowca zdejmuje z pary i rodziny obowiązki, które w dniu ślubu potrafią zepsuć spokój: parkowanie, objazdy, pilnowanie czasu, przepinanie dekoracji i czekanie pod właściwym wejściem.",
          "W segmencie premium kierowca jest częścią usługi, nie dodatkiem. Ma być dyskretny, elegancko ubrany i przygotowany na realny przebieg dnia.",
        ],
      },
      {
        title: "Co ustalić wcześniej",
        body: [
          "Warto podać adresy, godziny, informację o zdjęciach i o tym, czy auto ma zostać do dyspozycji po przejeździe na salę. Dzięki temu kierowca wie, gdzie ma być i kiedy.",
        ],
      },
      {
        title: "Dla kogo to najlepszy wybór",
        body: [
          "Dla par, które chcą spokojnego przejazdu, eleganckiej obsługi i braku improwizacji. Auto z kierowcą jest szczególnie praktyczne, gdy trasa ma kilka punktów.",
        ],
      },
    ];
  }

  if (page.kind === "model") {
    return [
      {
        title: `${modelLabel(page.modelSlug)} jako auto ślubne`,
        body: [
          `${modelLabel(page.modelSlug)} wybieracie nie tylko dla znaczka na masce. Liczy się wygląd przy ceremonii, komfort w trasie, zdjęcia i to, czy samochód pasuje do charakteru wesela.`,
          page.modelSlug === "mercedes-s-klasa"
            ? "S-Klasa jest spokojna, reprezentacyjna i bardzo wygodna z tyłu. To bezpieczny wybór, gdy zależy Wam na ponadczasowej elegancji."
            : "Ghibli jest bardziej wyraziste. Ma sportową linię, mocniejszą osobowość i dobrze działa przy parach, które nie chcą klasycznej limuzyny.",
        ],
      },
      {
        title: "Co zobaczą goście i fotograf",
        body: [
          "Auto pojawia się w kilku ważnych momentach: pod domem, przy ceremonii, pod salą i często przy zdjęciach. Dlatego musi być czyste, spójne z dekoracjami i gotowe na kadry z bliska.",
        ],
      },
      {
        title: "Rezerwacja konkretnego modelu",
        body: [
          "Najważniejsze jest sprawdzenie daty. Wybór modelu to pierwszy krok, ale o dostępności decyduje też czas, trasa i plan całego przejazdu.",
        ],
      },
    ];
  }

  if (page.kind === "aesthetic") {
    return [
      {
        title: "Kolor auta i zdjęcia",
        body: [
          "Jasny samochód najłatwiej połączyć z suknią, bukietem, zielenią i klasyczną oprawą. Nie dominuje kadru, ale nadal wygląda ślubnie i elegancko.",
          "Przy aucie premium najważniejsza jest proporcja: czysty lakier, delikatne dekoracje, zadbane detale i brak wizualnego chaosu.",
        ],
      },
      {
        title: "Dekoracje bez przesady",
        body: [
          "Wstążki, kwiaty i tablice powinny uzupełniać auto, nie zasłaniać jego linii. Warto ustalić je razem z modelem i planem przejazdu.",
        ],
      },
      {
        title: "Dopasowanie do stylu wesela",
        body: [
          "Inny samochód pasuje do pałacowej sali, inny do nowoczesnej przestrzeni, a jeszcze inny do krótkiej sesji w mieście. Najlepiej wybierać auto po stylu uroczystości, nie tylko po kolorze.",
        ],
      },
    ];
  }

  return [
    {
      title: "Na co zwrócić uwagę",
      body: [
        page.searchNeed,
        page.promise,
      ],
    },
    {
      title: "Jak wygląda przejazd",
      body: [
        "Typowy plan obejmuje odbiór, ceremonię, przejazd na salę i ewentualną sesję przy aucie. Kierowca dostaje harmonogram z buforem, a para nie musi prosić nikogo z rodziny o prowadzenie.",
      ],
    },
    {
      title: "Cena i dostępność",
      body: [
        "Dostępność zależy od daty, modelu i czasu wynajmu. Cena zależy od trasy, liczby punktów i dodatków, dlatego najlepiej zacząć od podania realnego planu dnia.",
      ],
    },
  ];
}

function buildFaq(page: SeoLandingPageData): FaqItem[] {
  const items: FaqItem[] = [
    {
      q: "Jak sprawdzić dostępność auta na naszą datę?",
      a: "Najprościej przejść do konfiguratora, wybrać datę, model i wpisać trasę. Na tej podstawie można potwierdzić realną dostępność.",
    },
    {
      q: "Czy kierowca jest w cenie?",
      a: "Tak, w ofercie ślubnej kierowca jest standardem. Pomaga to utrzymać punktualność i spokojny przebieg przejazdu.",
    },
    {
      q: "Od czego zależy cena?",
      a: "Od modelu, daty, czasu dyspozycji, trasy i dodatków. Największą różnicę robi liczba godzin oraz odległości między punktami.",
    },
  ];

  if (page.city) {
    items.push({
      q: `Czy obsługujecie śluby ${page.city.locative}?`,
      a: `Tak. ${page.city.name} leży ok. ${page.city.distanceKm} km od centrum Warszawy. Przy wycenie liczy się jednak pełna trasa, nie tylko sama miejscowość.`,
    });
  }

  if (page.modelSlug) {
    const model = modelLabel(page.modelSlug);
    items.push({
      q: `Czy można zarezerwować konkretnie ${model}?`,
      a: `Tak. Dostępność konkretnego modelu zależy od daty, godzin i trasy przejazdu.`,
    });
  }

  items.push({
    q: "Czy auto może zostać do sesji zdjęciowej?",
    a: "Tak, jeśli uwzględnicie to w czasie wynajmu. Warto od razu podać planowany postój i orientacyjny czas zdjęć.",
  });

  return items.slice(0, 5);
}

function relatedPages(page: SeoLandingPageData) {
  const candidates = [
    "auto-do-slubu-warszawa",
    "auto-do-slubu-warszawa-cennik",
    "auto-do-slubu-z-kierowca-warszawa",
    "mercedes-s-klasa-do-slubu-warszawa",
    "maserati-ghibli-do-slubu-warszawa",
    page.city ? `auto-do-slubu-${page.city.slug}` : "biale-auto-do-slubu-warszawa",
    page.modelSlug === "mercedes-s-klasa"
      ? "mercedes-s-klasa-do-slubu-cena"
      : "maserati-na-wesele-warszawa",
  ];

  const sameGroup = seoLandingPages
    .filter((item) => item.footerGroup === page.footerGroup)
    .map((item) => item.slug);

  return [...candidates, ...sameGroup]
    .filter((slug, index, array) => slug !== page.slug && array.indexOf(slug) === index)
    .map((slug) => seoLandingPages.find((item) => item.slug === slug))
    .filter((item): item is SeoLandingPageData => Boolean(item))
    .slice(0, 8);
}

export function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  const image = getCarImages(page.imageCar).cover;
  const sections = buildSections(page);
  const faqs = buildFaq(page);
  const links = relatedPages(page);
  const minPrice = minFleetPrice();
  const pageUrl = absoluteUrl(page.path);

  const serviceJsonLd =
    page.kind === "guide"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${pageUrl}#article`,
          headline: page.h1,
          name: page.h1,
          description: page.description,
          url: pageUrl,
          inLanguage: "pl-PL",
          image: absoluteUrl(image.src),
          author: {
            "@type": "Organization",
            name: "Weselna Furka",
          },
          publisher: {
            "@type": "Organization",
            name: "Weselna Furka",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${pageUrl}#service`,
          name: page.h1,
          description: page.description,
          url: pageUrl,
          serviceType: "Wynajem samochodu do ślubu z kierowcą",
          provider: {
            "@type": "AutoRental",
            "@id": `${absoluteUrl("/")}#business`,
            name: "Weselna Furka",
            areaServed: page.city?.name ?? "Warszawa i okolice",
          },
          areaServed: page.city?.name ?? "Warszawa i okolice",
          offers: {
            "@type": "Offer",
            priceCurrency: "PLN",
            price: minPrice,
            url: pageUrl,
            availability: "https://schema.org/InStock",
          },
        };

  const pageFaqJsonLd = faqJsonLd(faqs);
  const pageBreadcrumbJsonLd = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    page.kind === "guide"
      ? { name: "Poradnik", path: "/poradnik" }
      : { name: "Auto do ślubu Warszawa", path: "/auto-do-slubu-warszawa" },
    { name: page.h1, path: page.path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageFaqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageBreadcrumbJsonLd) }}
      />

      <section className="site-container py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="mt-4 text-balance text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {page.lead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={page.ctaHref} className="btn-primary w-full sm:w-auto">
                Skonfiguruj przejazd
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/flota" className="btn-ghost w-full sm:w-auto">
                Zobacz flotę
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {[page.primaryKeyword, ...page.secondaryKeywords.slice(0, 3)].map(
                (keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-ink/10 bg-white/45 px-3 py-1.5 text-xs text-ink-muted"
                  >
                    {keyword}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-card">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-6 text-cream-50">
                <p className="text-xs uppercase tracking-wider2 text-gold-soft">
                  Plan przejazdu
                </p>
                <p className="mt-1 font-serif text-3xl">
                  Data, trasa, auto i dodatki w jednym miejscu.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-container pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          {buildHighlights(page).map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title}>
                <div className="surface-card h-full p-6">
                  <Icon className="h-6 w-6 text-gold" />
                  <h2 className="mt-4 text-2xl text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="site-container pt-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Szczegóły"
              title="Co warto wiedzieć przed rezerwacją."
              subtitle="Najważniejsze informacje o trasie, cenie, kierowcy i dopasowaniu auta do uroczystości."
            />
            <Link href={page.ctaHref} className="btn-primary mt-8">
              Skonfiguruj przejazd
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="space-y-6">
            {sections.map((section) => (
              <Reveal key={section.title}>
                <article className="border-b border-ink/10 pb-6">
                  <h2 className="text-3xl text-ink">{section.title}</h2>
                  <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-ink-soft">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Flota"
            title="Aktualne samochody w ofercie."
            subtitle="W konfiguratorze wybierzecie model dostępny w naszej flocie i dopasujecie go do daty, trasy oraz czasu przejazdu."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {visibleCars.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </section>

      <section className="site-container pt-24">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="surface-card p-6">
            <TagIcon className="h-6 w-6 text-gold" />
            <h2 className="mt-4 text-2xl text-ink">Cena od</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Aktualna flota startuje od{" "}
              <span className="font-medium text-ink">
                {formatPLNShort(minPrice)}
              </span>
              . Dokładny koszt zależy od daty, trasy, czasu i dodatków.
            </p>
          </div>
          <div className="surface-card p-6">
            <RouteIcon className="h-6 w-6 text-gold" />
            <h2 className="mt-4 text-2xl text-ink">Trasa w planie</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Podajecie punkty przejazdu, a my patrzymy na realną logistykę
              dnia ślubu, nie tylko na sam dystans.
            </p>
          </div>
          <div className="surface-card p-6">
            <ClockIcon className="h-6 w-6 text-gold" />
            <h2 className="mt-4 text-2xl text-ink">Bufor czasu</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Ślub nie jest zwykłym transferem. Kierowca ma przyjechać z
              zapasem i działać spokojnie, nawet gdy plan się przesunie.
            </p>
          </div>
        </div>
      </section>

      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Pytania"
            title="Najczęstsze pytania przed rezerwacją."
          />
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink/10">
          {faqs.map((item) => (
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
      </section>

      <section className="site-container pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Zobacz też"
            title="Powiązane strony."
            subtitle="Najbliższe tematy: modele, ceny, kierowca i lokalizacje obsługi."
          />
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="group rounded-2xl border border-ink/10 bg-white/45 p-4 text-sm text-ink-muted transition hover:border-gold/40 hover:bg-white"
            >
              <span className="flex items-start justify-between gap-3">
                <span>{item.footerLabel}</span>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-24">
        <Reveal>
          <CtaBand
            title={
              <>
                Sprawdźcie termin w{" "}
                <em className="italic text-gold-soft">konfiguratorze.</em>
              </>
            }
            subtitle="Podajcie datę, trasę i preferowany samochód. To najszybszy sposób, żeby przejść od szukania do konkretnego potwierdzenia."
          />
        </Reveal>
      </section>
    </>
  );
}
