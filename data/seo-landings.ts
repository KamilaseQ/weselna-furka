export type LandingKind =
  | "primary"
  | "premium"
  | "wedding"
  | "price"
  | "driver"
  | "model"
  | "aesthetic"
  | "local"
  | "modelLocal"
  | "guide";

export type FooterGroup =
  | "Najważniejsze"
  | "Ceny i kierowca"
  | "Modele"
  | "Okolice Warszawy"
  | "Model i okolica"
  | "Poradnik";

export type SeoCarSlug = "mercedes-s-klasa" | "maserati-ghibli";

export interface CityLandingInfo {
  name: string;
  slug: string;
  locative: string;
  genitive: string;
  adjective: string;
  distanceKm: number;
  routeNote: string;
}

export interface GuideSection {
  title: string;
  body: string;
}

export interface SeoLandingPage {
  slug: string;
  path: string;
  footerLabel: string;
  footerGroup: FooterGroup;
  kind: LandingKind;
  h1: string;
  title: string;
  description: string;
  lead: string;
  eyebrow: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageCar: SeoCarSlug;
  modelSlug?: SeoCarSlug;
  city?: CityLandingInfo;
  searchNeed: string;
  promise: string;
  ctaHref: string;
  guideSections?: GuideSection[];
}

const mercedes = {
  slug: "mercedes-s-klasa" as const,
  name: "Mercedes-Benz S-Klasa",
  shortName: "Mercedes S-Klasa",
  style: "klasyczna limuzyna premium",
  promise:
    "komfortowa tylna kanapa, spokojna elegancja i dużo miejsca na suknię",
};

const maserati = {
  slug: "maserati-ghibli" as const,
  name: "Maserati Ghibli",
  shortName: "Maserati Ghibli",
  style: "sportowa limuzyna z włoskim charakterem",
  promise:
    "bardziej wyrazista oprawa, sportowa linia i mocny efekt przy podjeździe pod salę",
};

const corePages: SeoLandingPage[] = [
  {
    slug: "auto-do-slubu-warszawa",
    path: "/auto-do-slubu-warszawa",
    footerLabel: "Auto do ślubu Warszawa",
    footerGroup: "Najważniejsze",
    kind: "primary",
    h1: "Auto do ślubu Warszawa - luksusowy samochód z kierowcą",
    title: "Auto do ślubu Warszawa | Samochód premium z kierowcą",
    description:
      "Wynajem luksusowego auta do ślubu w Warszawie. Flota premium, kierowca w cenie, trasa i cena w konfiguratorze.",
    lead:
      "Szukacie auta, które dobrze wygląda pod domem, przy ceremonii i pod salą, ale nie chcecie pisać do kilkunastu ogłoszeń? Wybierzcie model, wpiszcie datę i trasę, a my wrócimy z konkretnym potwierdzeniem.",
    eyebrow: "Warszawa i okolice",
    primaryKeyword: "auto do ślubu Warszawa",
    secondaryKeywords: [
      "samochód do ślubu Warszawa",
      "wynajem auta do ślubu Warszawa",
      "auto ślubne Warszawa",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik szuka konkretnej usługi w Warszawie: chce zobaczyć auta, zrozumieć cenę, dowiedzieć się czy kierowca jest w pakiecie i szybko sprawdzić termin.",
    promise:
      "Flota samochodów premium, kierowca w cenie, plan trasy z buforem i przejrzysty pierwszy krok przez konfigurator.",
    ctaHref: "/konfigurator",
  },
  {
    slug: "luksusowe-auto-do-slubu-warszawa",
    path: "/luksusowe-auto-do-slubu-warszawa",
    footerLabel: "Luksusowe auto do ślubu",
    footerGroup: "Najważniejsze",
    kind: "premium",
    h1: "Luksusowe auto do ślubu w Warszawie",
    title: "Luksusowe auto do ślubu Warszawa | Segment premium",
    description:
      "Luksusowy samochód do ślubu w Warszawie z kierowcą. Mercedes S-Klasa i Maserati Ghibli przygotowane pod elegancką oprawę dnia.",
    lead:
      "To strona dla par, które nie szukają najtańszego przejazdu, tylko eleganckiej oprawy bez chaosu. Auto ma być czyste, punktualne, prowadzone przez kierowcę i spójne z charakterem wesela.",
    eyebrow: "Segment premium",
    primaryKeyword: "luksusowe auto do ślubu Warszawa",
    secondaryKeywords: [
      "elegancki samochód do ślubu Warszawa",
      "luksusowy samochód na wesele Warszawa",
      "auto premium do ślubu",
    ],
    imageCar: maserati.slug,
    searchNeed:
      "Szukający porównuje zwykłe oferty z usługą premium i chce wiedzieć, za co realnie dopłaca.",
    promise:
      "Premium oznacza tu konkrety: model auta, przygotowanie, kierowcę, estetykę i spokojną logistykę.",
    ctaHref: "/konfigurator",
  },
  {
    slug: "auto-do-slubu-z-kierowca-warszawa",
    path: "/auto-do-slubu-z-kierowca-warszawa",
    footerLabel: "Auto z kierowcą",
    footerGroup: "Ceny i kierowca",
    kind: "driver",
    h1: "Auto do ślubu z kierowcą w Warszawie",
    title: "Auto do ślubu z kierowcą Warszawa | Kierowca w cenie",
    description:
      "Wynajem auta do ślubu z kierowcą w Warszawie. Kierowca w garniturze, bufor czasu, przejazd do ceremonii, sali i na sesję.",
    lead:
      "W dniu ślubu nikt z rodziny nie powinien martwić się kluczykami, parkowaniem ani opóźnieniem na trasie. Kierowca prowadzi cały przejazd, pilnuje planu i zostaje do dyspozycji zgodnie z ustalonym czasem.",
    eyebrow: "Kierowca w cenie",
    primaryKeyword: "auto do ślubu z kierowcą Warszawa",
    secondaryKeywords: [
      "samochód do ślubu z kierowcą",
      "wynajem auta do ślubu z kierowcą",
      "auto z kierowcą na wesele",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik chce uniknąć ryzyka i wie, że sam samochód bez obsługi nie rozwiązuje logistyki dnia.",
    promise:
      "Elegancki kierowca, kontakt przed uroczystością, bufor czasu i jasny przebieg przejazdu.",
    ctaHref: "/konfigurator",
  },
  {
    slug: "auto-do-slubu-warszawa-cennik",
    path: "/auto-do-slubu-warszawa-cennik",
    footerLabel: "Cennik aut do ślubu",
    footerGroup: "Ceny i kierowca",
    kind: "price",
    h1: "Auto do ślubu Warszawa - cennik wynajmu",
    title: "Auto do ślubu Warszawa cennik | Mercedes i Maserati",
    description:
      "Cennik wynajmu auta do ślubu w Warszawie. Sprawdź, od czego zależy cena Mercedesa S-Klasy lub Maserati Ghibli z kierowcą.",
    lead:
      "Cena auta do ślubu zależy głównie od modelu, czasu dyspozycji, liczby adresów i trasy poza Warszawę. Zamiast ogólnej obietnicy „wycena indywidualna” pokazujemy, co wpływa na koszt i kierujemy do konfiguracji konkretnego przejazdu.",
    eyebrow: "Cennik",
    primaryKeyword: "auto do ślubu Warszawa cennik",
    secondaryKeywords: [
      "samochód do ślubu cena Warszawa",
      "wynajem auta do ślubu cena",
      "auto do ślubu koszt",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Szukający jest blisko decyzji i chce sprawdzić, czy usługa mieści się w budżecie.",
    promise:
      "Wyjaśniamy czynniki ceny i prowadzimy do konfiguratora, gdzie można podać realną trasę.",
    ctaHref: "/konfigurator",
  },
  {
    slug: "ile-kosztuje-auto-do-slubu-warszawa",
    path: "/ile-kosztuje-auto-do-slubu-warszawa",
    footerLabel: "Ile kosztuje auto",
    footerGroup: "Ceny i kierowca",
    kind: "price",
    h1: "Ile kosztuje auto do ślubu w Warszawie?",
    title: "Ile kosztuje auto do ślubu w Warszawie | Cena i trasa",
    description:
      "Ile kosztuje luksusowe auto do ślubu w Warszawie? Wyjaśniamy koszt modelu, czasu wynajmu, trasy, kierowcy i dodatków.",
    lead:
      "Najkrótsza odpowiedź: prosty przejazd kosztuje mniej niż scenariusz z kilkoma adresami, sesją i dłuższą dyspozycją kierowcy. Dlatego najpierw warto ustalić plan dnia, a dopiero potem porównywać ceny.",
    eyebrow: "Koszt wynajmu",
    primaryKeyword: "ile kosztuje auto do ślubu Warszawa",
    secondaryKeywords: [
      "ile kosztuje samochód do ślubu",
      "ile kosztuje auto na wesele",
      "wynajem samochodu do ślubu koszt",
    ],
    imageCar: maserati.slug,
    searchNeed:
      "Użytkownik potrzebuje orientacji cenowej i chce wiedzieć, co dokładnie podbija koszt.",
    promise:
      "Rozbijamy cenę na model, czas, trasę i dodatki, a konkretną wycenę opieramy na danych z konfiguratora.",
    ctaHref: "/konfigurator",
  },
  {
    slug: "mercedes-s-klasa-do-slubu-warszawa",
    path: "/mercedes-s-klasa-do-slubu-warszawa",
    footerLabel: "Mercedes S-Klasa ślub",
    footerGroup: "Modele",
    kind: "model",
    h1: "Mercedes S-Klasa do ślubu w Warszawie",
    title: "Mercedes S-Klasa do ślubu Warszawa | Limuzyna premium",
    description:
      "Mercedes-Benz S-Klasa do ślubu w Warszawie. Biała perła, kierowca w cenie, komfortowa tylna kanapa i konfiguracja terminu.",
    lead:
      "S-Klasa pasuje do par, które chcą klasycznej elegancji bez przesady. Jest reprezentacyjna, wygodna z tyłu i dobrze wygląda zarówno pod kościołem, USC, jak i przy nowoczesnej sali weselnej.",
    eyebrow: "Mercedes-Benz",
    primaryKeyword: "Mercedes S klasa do ślubu Warszawa",
    secondaryKeywords: [
      "Mercedes S-Klasa na wesele Warszawa",
      "Mercedes S-Class do ślubu",
      "limuzyna Mercedes do ślubu Warszawa",
    ],
    imageCar: mercedes.slug,
    modelSlug: mercedes.slug,
    searchNeed:
      "Szukający ma już upatrzony model i chce potwierdzić, czy nadaje się do ślubu oraz jak go zarezerwować w Warszawie.",
    promise: mercedes.promise,
    ctaHref: "/konfigurator?car=mercedes-s-klasa",
  },
  {
    slug: "mercedes-s-klasa-do-slubu-cena",
    path: "/mercedes-s-klasa-do-slubu-cena",
    footerLabel: "Cena Mercedesa S",
    footerGroup: "Modele",
    kind: "price",
    h1: "Mercedes S-Klasa do ślubu - cena wynajmu",
    title: "Mercedes S-Klasa do ślubu cena | Wynajem z kierowcą",
    description:
      "Cena wynajmu Mercedesa S-Klasy do ślubu zależy od czasu, trasy i dodatków. Sprawdź model z kierowcą w konfiguratorze.",
    lead:
      "Przy Mercedesie S-Klasie cena zależy od tego, czy potrzebujecie krótkiego przejazdu, obsługi kilku adresów, sesji przy aucie czy dłuższej dyspozycji kierowcy. Model wybierzecie od razu, a szczegóły trasy podacie w konfiguratorze.",
    eyebrow: "Cena modelu",
    primaryKeyword: "Mercedes S klasa do ślubu cena",
    secondaryKeywords: [
      "Mercedes do ślubu cena",
      "wynajem Mercedes S-Klasa do ślubu",
      "Mercedes S-Klasa cennik",
    ],
    imageCar: mercedes.slug,
    modelSlug: mercedes.slug,
    searchNeed:
      "Użytkownik jest bardzo blisko zakupu: zna model i pyta już o koszt.",
    promise:
      "Pokazujemy, co wpływa na cenę S-Klasy, bez ukrywania najważniejszych elementów pakietu.",
    ctaHref: "/konfigurator?car=mercedes-s-klasa",
  },
  {
    slug: "bialy-mercedes-do-slubu-warszawa",
    path: "/bialy-mercedes-do-slubu-warszawa",
    footerLabel: "Biały Mercedes",
    footerGroup: "Modele",
    kind: "aesthetic",
    h1: "Biały Mercedes do ślubu w Warszawie",
    title: "Biały Mercedes do ślubu Warszawa | S-Klasa biała perła",
    description:
      "Biały Mercedes S-Klasa do ślubu w Warszawie. Elegancki lakier, kierowca w cenie, dekoracje i konfiguracja terminu.",
    lead:
      "Biały Mercedes dobrze łączy się z suknią, bukietem i klasycznymi dekoracjami. To wybór dla par, które chcą jasnej, eleganckiej oprawy i auta, które nie zdominuje zdjęć.",
    eyebrow: "Biała perła",
    primaryKeyword: "biały Mercedes do ślubu Warszawa",
    secondaryKeywords: [
      "biała limuzyna do ślubu Warszawa",
      "biały samochód do ślubu",
      "Mercedes S-Klasa biały do ślubu",
    ],
    imageCar: mercedes.slug,
    modelSlug: mercedes.slug,
    searchNeed:
      "Szukający ma jasną intencję estetyczną: biały samochód, elegancki wygląd i spójność ze ślubną oprawą.",
    promise:
      "Biała perła, limuzyna premium, przygotowanie pod dekoracje i kierowca w cenie.",
    ctaHref: "/konfigurator?car=mercedes-s-klasa",
  },
  {
    slug: "maserati-ghibli-do-slubu-warszawa",
    path: "/maserati-ghibli-do-slubu-warszawa",
    footerLabel: "Maserati Ghibli ślub",
    footerGroup: "Modele",
    kind: "model",
    h1: "Maserati Ghibli do ślubu w Warszawie",
    title: "Maserati Ghibli do ślubu Warszawa | Sportowa elegancja",
    description:
      "Maserati Ghibli do ślubu w Warszawie. Sportowa limuzyna z kierowcą, wyrazisty styl i konfiguracja terminu.",
    lead:
      "Maserati Ghibli jest dla par, które chcą czegoś bardziej charakternego niż klasyczna limuzyna. Nadal jest eleganckie, ale ma sportowy ton, mocniejszą sylwetkę i lepiej wyróżnia się przy wejściu pod salę.",
    eyebrow: "Maserati",
    primaryKeyword: "Maserati Ghibli do ślubu Warszawa",
    secondaryKeywords: [
      "Maserati do ślubu Warszawa",
      "Maserati Ghibli do ślubu",
      "Maserati Ghibli z kierowcą",
    ],
    imageCar: maserati.slug,
    modelSlug: maserati.slug,
    searchNeed:
      "Użytkownik szuka konkretnego, rzadszego modelu i chce wiedzieć, czy dostępny jest jako auto ślubne w Warszawie.",
    promise: maserati.promise,
    ctaHref: "/konfigurator?car=maserati-ghibli",
  },
  {
    slug: "maserati-na-wesele-warszawa",
    path: "/maserati-na-wesele-warszawa",
    footerLabel: "Maserati na wesele",
    footerGroup: "Modele",
    kind: "model",
    h1: "Maserati na wesele w Warszawie",
    title: "Maserati na wesele Warszawa | Ghibli z kierowcą",
    description:
      "Maserati na wesele w Warszawie. Ghibli z kierowcą, sportowa elegancja, przejazd pod salę i konfiguracja rezerwacji.",
    lead:
      "Jeśli auto ma być zapamiętane przez gości, Maserati działa inaczej niż typowa limuzyna. Ma włoski charakter, sportową sylwetkę i dobrze pasuje do nowoczesnych wesel oraz sesji przy aucie.",
    eyebrow: "Włoski charakter",
    primaryKeyword: "Maserati na wesele Warszawa",
    secondaryKeywords: [
      "Maserati do ślubu Warszawa",
      "Maserati Ghibli na wesele",
      "sportowe auto do ślubu Warszawa",
    ],
    imageCar: maserati.slug,
    modelSlug: maserati.slug,
    searchNeed:
      "Szukający skupia się bardziej na efekcie weselnym i zdjęciach niż na samym przejeździe do ceremonii.",
    promise:
      "Wyrazisty samochód premium z kierowcą, gotowy na przejazd, wejście pod salę i zdjęcia.",
    ctaHref: "/konfigurator?car=maserati-ghibli",
  },
  {
    slug: "biale-auto-do-slubu-warszawa",
    path: "/biale-auto-do-slubu-warszawa",
    footerLabel: "Białe auto do ślubu",
    footerGroup: "Najważniejsze",
    kind: "aesthetic",
    h1: "Białe auto do ślubu w Warszawie",
    title: "Białe auto do ślubu Warszawa | Mercedes i Maserati",
    description:
      "Białe auto do ślubu w Warszawie. Elegancki lakier, kierowca w cenie, dekoracje i konfiguracja terminu.",
    lead:
      "Białe auto jest najłatwiejsze do dopasowania do bukietu, sukni, kwiatów i zdjęć. W Weselnej Furce stawiamy na spokojną elegancję: czyste auto, zadbane detale i dekoracje dobrane do stylu uroczystości.",
    eyebrow: "Kolor i styl",
    primaryKeyword: "białe auto do ślubu Warszawa",
    secondaryKeywords: [
      "biały samochód na wesele",
      "biała limuzyna do ślubu",
      "luksusowe białe auto do ślubu",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik szuka koloru i estetyki, więc trzeba odpowiedzieć zdjęciami, dekoracjami i dopasowaniem do ślubu.",
    promise:
      "Jasna, elegancka oprawa i auta przygotowane pod dekoracje oraz zdjęcia.",
    ctaHref: "/konfigurator",
  },
  {
    slug: "samochod-na-wesele-warszawa",
    path: "/samochod-na-wesele-warszawa",
    footerLabel: "Samochód na wesele",
    footerGroup: "Najważniejsze",
    kind: "wedding",
    h1: "Samochód na wesele w Warszawie",
    title: "Samochód na wesele Warszawa | Luksusowe auto z kierowcą",
    description:
      "Samochód na wesele w Warszawie z kierowcą. Flota premium, przejazd pod salę, zdjęcia i konfiguracja terminu.",
    lead:
      "Samochód na wesele pracuje nie tylko przy ceremonii. Liczy się przyjazd pod salę, wygodne wejście pary młodej, zdjęcia i dyspozycyjność kierowcy wtedy, gdy harmonogram zaczyna żyć własnym rytmem.",
    eyebrow: "Wesele",
    primaryKeyword: "samochód na wesele Warszawa",
    secondaryKeywords: [
      "auto na wesele Warszawa",
      "wynajem auta na wesele Warszawa",
      "samochód weselny Warszawa",
    ],
    imageCar: maserati.slug,
    searchNeed:
      "Zapytanie dotyczy całej oprawy wesela, nie tylko transportu do kościoła lub USC.",
    promise:
      "Auto z kierowcą do przejazdu, wejścia pod salę, zdjęć i spokojnej logistyki.",
    ctaHref: "/konfigurator",
  },
];

export const localCities: CityLandingInfo[] = [
  {
    name: "Piaseczno",
    slug: "piaseczno",
    locative: "w Piasecznie",
    genitive: "z Piaseczna",
    adjective: "piaseczyńskiej",
    distanceKm: 17,
    routeNote:
      "najczęściej liczą się przejazdy między południem Warszawy, domem rodzinnym, ceremonią i salą w okolicy Piaseczna",
  },
  {
    name: "Konstancin-Jeziorna",
    slug: "konstancin-jeziorna",
    locative: "w Konstancinie-Jeziornie",
    genitive: "z Konstancina-Jeziorny",
    adjective: "konstancińskiej",
    distanceKm: 18,
    routeNote:
      "dobrze sprawdzają się spokojne, eleganckie przejazdy z buforem na dojazd i zdjęcia w zielonym otoczeniu",
  },
  {
    name: "Pruszków",
    slug: "pruszkow",
    locative: "w Pruszkowie",
    genitive: "z Pruszkowa",
    adjective: "pruszkowskiej",
    distanceKm: 16,
    routeNote:
      "plan zwykle obejmuje szybki dojazd od strony Warszawy, odbiór pary i przejazd na salę w zachodniej części aglomeracji",
  },
  {
    name: "Otwock",
    slug: "otwock",
    locative: "w Otwocku",
    genitive: "z Otwocka",
    adjective: "otwockiej",
    distanceKm: 25,
    routeNote:
      "warto zaplanować większy bufor na trasę przez wschodnią część Warszawy i przejazdy między adresami",
  },
  {
    name: "Legionowo",
    slug: "legionowo",
    locative: "w Legionowie",
    genitive: "z Legionowa",
    adjective: "legionowskiej",
    distanceKm: 22,
    routeNote:
      "logistyka najczęściej łączy północ Warszawy, odbiór pary i przejazd na salę pod miastem",
  },
  {
    name: "Marki",
    slug: "marki",
    locative: "w Markach",
    genitive: "z Marek",
    adjective: "mareckiej",
    distanceKm: 15,
    routeNote:
      "trasy są krótkie, ale w dni ślubne warto uwzględnić ruch na wylotach z Warszawy",
  },
  {
    name: "Łomianki",
    slug: "lomianki",
    locative: "w Łomiankach",
    genitive: "z Łomianek",
    adjective: "łomiankowskiej",
    distanceKm: 16,
    routeNote:
      "często liczy się punktualny dojazd z północy Warszawy i spokojny przejazd na salę poza centrum",
  },
  {
    name: "Ząbki",
    slug: "zabki",
    locative: "w Ząbkach",
    genitive: "z Ząbek",
    adjective: "ząbkowskiej",
    distanceKm: 10,
    routeNote:
      "bliskość Warszawy pomaga, ale harmonogram nadal wymaga buforu na odbiór i postoje zdjęciowe",
  },
  {
    name: "Józefów",
    slug: "jozefow",
    locative: "w Józefowie",
    genitive: "z Józefowa",
    adjective: "józefowskiej",
    distanceKm: 24,
    routeNote:
      "przy trasach przez Wawer i okolice linii otwockiej najlepiej sprawdza się plan z zapasem czasu",
  },
  {
    name: "Raszyn",
    slug: "raszyn",
    locative: "w Raszynie",
    genitive: "z Raszyna",
    adjective: "raszyńskiej",
    distanceKm: 11,
    routeNote:
      "to bliska lokalizacja, ale przejazdy przy trasach wylotowych wymagają dobrego ustawienia godzin",
  },
  {
    name: "Nadarzyn",
    slug: "nadarzyn",
    locative: "w Nadarzynie",
    genitive: "z Nadarzyna",
    adjective: "nadarzyńskiej",
    distanceKm: 25,
    routeNote:
      "dla tras na południowy zachód od Warszawy warto od razu policzyć czas i dystans całego przejazdu",
  },
  {
    name: "Grodzisk Mazowiecki",
    slug: "grodzisk-mazowiecki",
    locative: "w Grodzisku Mazowieckim",
    genitive: "z Grodziska Mazowieckiego",
    adjective: "grodziskiej",
    distanceKm: 35,
    routeNote:
      "warto zaplanować pełny przejazd z odbiorem, ceremonią i salą, bo trasa jest dłuższa niż w samej Warszawie",
  },
  {
    name: "Milanówek",
    slug: "milanowek",
    locative: "w Milanówku",
    genitive: "z Milanówka",
    adjective: "milanowskiej",
    distanceKm: 33,
    routeNote:
      "spokojny, elegancki przejazd wymaga buforu na dojazd z Warszawy i lokalne postoje",
  },
  {
    name: "Brwinów",
    slug: "brwinow",
    locative: "w Brwinowie",
    genitive: "z Brwinowa",
    adjective: "brwinowskiej",
    distanceKm: 28,
    routeNote:
      "przy zachodnich trasach dobrze działa rezerwacja z wcześniejszym podstawieniem auta",
  },
  {
    name: "Ożarów Mazowiecki",
    slug: "ozarow-mazowiecki",
    locative: "w Ożarowie Mazowieckim",
    genitive: "z Ożarowa Mazowieckiego",
    adjective: "ożarowskiej",
    distanceKm: 18,
    routeNote:
      "lokalizacja jest blisko Warszawy, ale warto uwzględnić ruch na trasach wyjazdowych",
  },
  {
    name: "Błonie",
    slug: "blonie",
    locative: "w Błoniu",
    genitive: "z Błonia",
    adjective: "błońskiej",
    distanceKm: 33,
    routeNote:
      "dla dalszych miejscowości zachodnich kluczowe jest wcześniejsze podstawienie i jasny plan punktów trasy",
  },
  {
    name: "Wołomin",
    slug: "wolomin",
    locative: "w Wołominie",
    genitive: "z Wołomina",
    adjective: "wołomińskiej",
    distanceKm: 22,
    routeNote:
      "przy wschodniej stronie aglomeracji warto uwzględnić całą trasę, nie tylko sam odbiór",
  },
  {
    name: "Kobyłka",
    slug: "kobylka",
    locative: "w Kobyłce",
    genitive: "z Kobyłki",
    adjective: "kobyłkowskiej",
    distanceKm: 20,
    routeNote:
      "najlepiej zaplanować dojazd z buforem na ceremonię i przejazd na salę poza centrum miasta",
  },
  {
    name: "Sulejówek",
    slug: "sulejowek",
    locative: "w Sulejówku",
    genitive: "z Sulejówka",
    adjective: "sulejóweckiej",
    distanceKm: 19,
    routeNote:
      "dla tras po wschodniej stronie Warszawy liczy się zapas czasu i jednoznacznie ustawione adresy",
  },
  {
    name: "Mińsk Mazowiecki",
    slug: "minsk-mazowiecki",
    locative: "w Mińsku Mazowieckim",
    genitive: "z Mińska Mazowieckiego",
    adjective: "mińskiej",
    distanceKm: 40,
    routeNote:
      "to dłuższy przejazd, więc najlepiej od razu wpisać wszystkie punkty trasy i oczekiwany czas dyspozycji",
  },
];

function createLocalPage(city: CityLandingInfo): SeoLandingPage {
  return {
    slug: `auto-do-slubu-${city.slug}`,
    path: `/auto-do-slubu-${city.slug}`,
    footerLabel: city.name,
    footerGroup: "Okolice Warszawy",
    kind: "local",
    h1: `Auto do ślubu ${city.name} - luksusowy samochód z kierowcą`,
    title: `Auto do ślubu ${city.name} | Samochód premium z kierowcą`,
    description: `Auto do ślubu ${city.name} i okolice. Samochody premium z kierowcą, plan trasy i wycena w konfiguratorze.`,
    lead: `Obsługujemy śluby ${city.locative} i w okolicach Warszawy. Najważniejsze są: punktualny dojazd, jasny plan odbioru, przejazd do ceremonii, sala oraz ewentualna sesja przy aucie.`,
    eyebrow: city.name,
    primaryKeyword: `auto do ślubu ${city.name}`,
    secondaryKeywords: [
      `samochód do ślubu ${city.name}`,
      `wynajem auta do ślubu ${city.name}`,
      `auto ślubne ${city.name}`,
    ],
    imageCar: city.distanceKm % 2 === 0 ? mercedes.slug : maserati.slug,
    city,
    searchNeed:
      "Użytkownik szuka lokalnej obsługi i chce wiedzieć, czy auto dojedzie, ile mniej więcej wynosi dystans oraz jak wygląda przejazd.",
    promise: city.routeNote,
    ctaHref: "/konfigurator",
  };
}

function getModel(modelSlug: SeoCarSlug) {
  return modelSlug === mercedes.slug ? mercedes : maserati;
}

function createModelLocalPage(
  modelSlug: SeoCarSlug,
  city: CityLandingInfo
): SeoLandingPage {
  const model = getModel(modelSlug);
  const modelPath =
    modelSlug === mercedes.slug
      ? "mercedes-s-klasa-do-slubu"
      : "maserati-ghibli-do-slubu";

  return {
    slug: `${modelPath}-${city.slug}`,
    path: `/${modelPath}-${city.slug}`,
    footerLabel: `${model.shortName} ${city.name}`,
    footerGroup: "Model i okolica",
    kind: "modelLocal",
    h1: `${model.shortName} do ślubu ${city.name}`,
    title: `${model.shortName} do ślubu ${city.name} | Auto z kierowcą`,
    description: `${model.shortName} do ślubu ${city.name}. ${model.style}, kierowca w cenie, trasa z Warszawy i konfiguracja terminu.`,
    lead: `${model.shortName} ${city.locative} to dobry wybór, jeśli macie już wybrany styl auta i chcecie sprawdzić realną obsługę trasy. Podajcie datę, adresy i czas, a my potwierdzimy możliwość przejazdu.`,
    eyebrow: `${model.shortName} · ${city.name}`,
    primaryKeyword: `${model.shortName} do ślubu ${city.name}`,
    secondaryKeywords: [
      `${model.name} ${city.name}`,
      `auto do ślubu ${city.name}`,
      `${model.shortName} z kierowcą`,
    ],
    imageCar: modelSlug,
    modelSlug,
    city,
    searchNeed:
      "Szukający łączy konkretny model z lokalizacją i oczekuje jasnej odpowiedzi, czy ten samochód obsłuży jego trasę.",
    promise: `${model.promise}. Lokalnie: ${city.routeNote}.`,
    ctaHref: `/konfigurator?car=${modelSlug}`,
  };
}

const modelLocalCities = localCities.filter((city) =>
  ["piaseczno", "konstancin-jeziorna", "pruszkow", "otwock", "legionowo"].includes(
    city.slug
  )
);

const guidePages: SeoLandingPage[] = [
  {
    slug: "jaki-samochod-do-slubu-wybrac",
    path: "/poradnik/jaki-samochod-do-slubu-wybrac",
    footerLabel: "Jaki samochód wybrać",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Jaki samochód do ślubu wybrać?",
    title: "Jaki samochód do ślubu wybrać | Poradnik dla par",
    description:
      "Jak wybrać samochód do ślubu: limuzyna czy auto sportowe, ile miejsca potrzebuje suknia, jak zaplanować trasę i kierowcę.",
    lead:
      "Dobry wybór auta do ślubu nie zaczyna się od marki. Zaczyna się od stylu wesela, sukni, planu przejazdu i tego, czy chcecie spokojnej elegancji, czy mocniejszego efektu na zdjęciach.",
    eyebrow: "Poradnik",
    primaryKeyword: "jaki samochód do ślubu wybrać",
    secondaryKeywords: [
      "jaki samochód do ślubu",
      "najlepsze auto do ślubu",
      "samochód ślubny poradnik",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik jest na etapie wyboru stylu, niekoniecznie konkretnego modelu.",
    promise:
      "Pomagamy przełożyć styl wesela i plan dnia na typ auta, czas wynajmu i konkretny model z aktualnej floty.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Najpierw styl uroczystości",
        body:
          "Klasyczna sala, elegancki hotel i tradycyjna oprawa dobrze pasują do limuzyny premium. Nowoczesne wesele, mocniejsze zdjęcia i para, która lubi motoryzację, często lepiej wypadają przy Maserati.",
      },
      {
        title: "Potem praktyka",
        body:
          "Sprawdźcie, ile będzie punktów trasy, czy suknia wymaga więcej miejsca, czy planujecie sesję przy aucie i czy kierowca ma być do dyspozycji dłużej niż tylko na przejazd do sali.",
      },
      {
        title: "Na końcu dostępność",
        body:
          "Najlepsze terminy w sezonie znikają szybciej niż spokojne soboty poza sezonem. Gdy macie datę i wstępny plan, warto od razu sprawdzić konkretny model.",
      },
    ],
  },
  {
    slug: "mercedes-czy-maserati-do-slubu",
    path: "/poradnik/mercedes-czy-maserati-do-slubu",
    footerLabel: "Mercedes czy Maserati",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Mercedes czy Maserati do ślubu?",
    title: "Mercedes czy Maserati do ślubu | Porównanie stylu",
    description:
      "Mercedes S-Klasa czy Maserati Ghibli do ślubu? Porównujemy komfort, styl, zdjęcia i charakter przejazdu.",
    lead:
      "Oba auta są premium, ale mówią innym językiem. Mercedes jest spokojniejszy i bardziej reprezentacyjny. Maserati jest bardziej emocjonalne i mocniej zaznacza wejście.",
    eyebrow: "Porównanie",
    primaryKeyword: "Mercedes czy Maserati do ślubu",
    secondaryKeywords: [
      "Mercedes S-Klasa czy Maserati Ghibli",
      "Maserati czy Mercedes na wesele",
      "limuzyna czy sportowe auto do ślubu",
    ],
    imageCar: maserati.slug,
    searchNeed:
      "Użytkownik porównuje konkretne modele i potrzebuje argumentów, nie listy sloganów.",
    promise:
      "Porównujemy realne różnice: komfort, zdjęcia, wejście pod salę i charakter przejazdu.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Mercedes S-Klasa",
        body:
          "Wybierzcie Mercedesa, jeśli najważniejsze są spokój, przestrzeń, klasyczna elegancja i komfort tylnej kanapy. To auto, które nie musi niczego udowadniać.",
      },
      {
        title: "Maserati Ghibli",
        body:
          "Wybierzcie Maserati, jeśli chcecie więcej charakteru, sportowy profil i auto, które bardziej zapada w pamięć gościom. To nadal elegancja, tylko z mocniejszym akcentem.",
      },
      {
        title: "Jak podjąć decyzję",
        body:
          "Jeśli suknia jest obszerna, plan dnia napięty, a zdjęcia mają być klasyczne, Mercedes będzie bezpieczniejszy. Jeśli zależy Wam na efekcie i wyróżnieniu, Maserati ma więcej osobowości.",
      },
    ],
  },
  {
    slug: "ile-kosztuje-auto-do-slubu",
    path: "/poradnik/ile-kosztuje-auto-do-slubu",
    footerLabel: "Koszt auta do ślubu",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Ile kosztuje auto do ślubu?",
    title: "Ile kosztuje auto do ślubu | Czynniki ceny",
    description:
      "Od czego zależy cena auta do ślubu: model, czas, trasa, kierowca i dekoracje. Poradnik dla par planujących budżet.",
    lead:
      "Cena auta do ślubu nie powinna być loterią. Największy wpływ mają model, czas dyspozycji, odległości między punktami, kierowca i dodatki.",
    eyebrow: "Cena",
    primaryKeyword: "ile kosztuje auto do ślubu",
    secondaryKeywords: [
      "samochód do ślubu cena",
      "wynajem auta do ślubu koszt",
      "auto na wesele cena",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik chce zrozumieć budżet i nie chce usłyszeć tylko „to zależy”.",
    promise:
      "Pokazujemy, od czego zależy cena i jak przygotować dane do sensownej wyceny.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Model i standard",
        body:
          "Limuzyna premium i sportowa limuzyna mają inną bazę kosztową niż zwykłe auto z ogłoszenia. W cenie powinna być też jakość przygotowania, kierowca i punktualna obsługa.",
      },
      {
        title: "Czas dyspozycji",
        body:
          "Sam przejazd do ceremonii to co innego niż odbiór, USC lub kościół, sala, postoje i sesja przy aucie. Dlatego liczba godzin jest kluczowa.",
      },
      {
        title: "Trasa",
        body:
          "Warszawa, okolice i dłuższe wyjazdy mają inny koszt. Najlepsza wycena powstaje dopiero wtedy, gdy znane są adresy i plan przejazdu.",
      },
    ],
  },
  {
    slug: "auto-do-slubu-z-kierowca-czy-bez",
    path: "/poradnik/auto-do-slubu-z-kierowca-czy-bez",
    footerLabel: "Kierowca czy bez",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Auto do ślubu z kierowcą czy bez?",
    title: "Auto do ślubu z kierowcą czy bez | Co wybrać",
    description:
      "Czy wynająć auto do ślubu z kierowcą, czy bez? Porównanie ryzyka, komfortu i logistyki dnia ślubu.",
    lead:
      "W segmencie premium kierowca to nie dodatek, tylko element spokoju. Para młoda nie powinna myśleć o kluczykach, parkowaniu ani opóźnieniach.",
    eyebrow: "Logistyka",
    primaryKeyword: "auto do ślubu z kierowcą czy bez",
    secondaryKeywords: [
      "auto do ślubu z kierowcą",
      "samochód do ślubu bez kierowcy",
      "wynajem auta do ślubu z kierowcą",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik waży wygodę, koszt i ryzyko samodzielnego prowadzenia w dniu ślubu.",
    promise:
      "Pokazujemy, kiedy kierowca realnie rozwiązuje problem, a kiedy sam wynajem auta może być kłopotliwy.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Z kierowcą",
        body:
          "Macie spokojniejszy plan, elegancką obsługę i osobę odpowiedzialną za trasę. To szczególnie ważne, gdy są postoje, zdjęcia i kilka adresów.",
      },
      {
        title: "Bez kierowcy",
        body:
          "Samodzielne prowadzenie może brzmieć atrakcyjnie, ale w dniu ślubu zwykle dokłada obowiązków. Ktoś musi prowadzić, parkować i pilnować czasu.",
      },
      {
        title: "Najbezpieczniejszy wariant",
        body:
          "Przy aucie ślubnym z segmentu premium kierowca jest najbardziej praktycznym wyborem. Daje spokój, a samochód pozostaje częścią oprawy, nie dodatkowym zadaniem do ogarnięcia.",
      },
    ],
  },
  {
    slug: "kiedy-rezerwowac-auto-do-slubu",
    path: "/poradnik/kiedy-rezerwowac-auto-do-slubu",
    footerLabel: "Kiedy rezerwować",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Kiedy rezerwować auto do ślubu?",
    title: "Kiedy rezerwować auto do ślubu | Terminy weselne",
    description:
      "Kiedy najlepiej rezerwować samochód do ślubu, jak działa sezon i dlaczego warto sprawdzić datę z wyprzedzeniem.",
    lead:
      "Jeśli ślub jest w sobotę w sezonie, decyzji o aucie nie warto zostawiać na koniec. Najlepsze terminy łączą się z najpopularniejszymi salami i godzinami ceremonii.",
    eyebrow: "Terminy",
    primaryKeyword: "kiedy rezerwować auto do ślubu",
    secondaryKeywords: [
      "rezerwacja auta do ślubu",
      "wolne terminy auto do ślubu",
      "kiedy wynająć samochód do ślubu",
    ],
    imageCar: maserati.slug,
    searchNeed:
      "Użytkownik chce wiedzieć, czy jest za wcześnie, za późno, czy jeszcze zdąży.",
    promise:
      "Wyjaśniamy sezonowość i podpowiadamy, kiedy sprawdzić termin dla konkretnego auta.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Soboty w sezonie",
        body:
          "Najmocniej oblegane są soboty od maja do września. Jeśli macie konkretny model w głowie, sprawdźcie datę jak najwcześniej.",
      },
      {
        title: "Plan trasy",
        body:
          "Auto warto rezerwować wtedy, gdy znacie przynajmniej lokalizację ceremonii i sali. Drobne zmiany da się dopracować później.",
      },
      {
        title: "Ostatnia chwila",
        body:
          "Last minute bywa możliwe, ale wybór jest mniejszy. Wtedy najlepiej od razu podać datę, miasto i podstawową trasę.",
      },
    ],
  },
  {
    slug: "dekoracja-samochodu-do-slubu",
    path: "/poradnik/dekoracja-samochodu-do-slubu",
    footerLabel: "Dekoracja auta",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Dekoracja samochodu do ślubu",
    title: "Dekoracja samochodu do ślubu | Jak dobrać styl",
    description:
      "Jak dobrać dekoracje samochodu do ślubu: kolor auta, kwiaty, wstążki i styl zdjęć. Poradnik dla par.",
    lead:
      "Dekoracja auta powinna wspierać styl wesela, a nie przykrywać samochód. Przy lakierze biała perła najlepiej działają dobrze dobrane, spokojne dodatki.",
    eyebrow: "Dekoracje",
    primaryKeyword: "dekoracja samochodu do ślubu",
    secondaryKeywords: [
      "jak udekorować auto do ślubu",
      "ozdoby na samochód do ślubu",
      "biała limuzyna dekoracje",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik szuka praktyki i inspiracji, ale nadal może być blisko wyboru auta.",
    promise:
      "Pokazujemy, jak myśleć o dekoracjach przy aucie premium, żeby wyglądało elegancko na żywo i na zdjęciach.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Mniej znaczy lepiej",
        body:
          "W segmencie premium najlepsze dekoracje są czyste i proporcjonalne. Auto ma wyglądać elegancko, nie jak przypadkowy nośnik ozdób.",
      },
      {
        title: "Kolor auta",
        body:
          "Biała perła dobrze łączy się z jasnymi kwiatami, zielenią i delikatnymi akcentami. Daje też bezpieczne tło dla sukni i bukietu.",
      },
      {
        title: "Praktyka dnia ślubu",
        body:
          "Dekoracje muszą trzymać się w trasie, nie ograniczać widoczności i nie przeszkadzać kierowcy. Warto ustalić je razem z planem przejazdu.",
      },
    ],
  },
  {
    slug: "ile-godzin-wynajac-auto-do-slubu",
    path: "/poradnik/ile-godzin-wynajac-auto-do-slubu",
    footerLabel: "Ile godzin wynająć",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Ile godzin wynająć auto do ślubu?",
    title: "Ile godzin wynająć auto do ślubu | Plan przejazdu",
    description:
      "Ile godzin wynająć auto do ślubu: ceremonia, sala, sesja zdjęciowa i bufor czasu. Poradnik planowania przejazdu.",
    lead:
      "Liczba godzin zależy od tego, czy auto ma tylko zawieźć parę, czy być z Wami przez większą część dnia. Najczęściej różnicę robią postoje, sesja i odległość sali.",
    eyebrow: "Czas wynajmu",
    primaryKeyword: "ile godzin wynająć auto do ślubu",
    secondaryKeywords: [
      "auto do ślubu na ile godzin",
      "wynajem auta do ślubu 6 godzin",
      "samochód do ślubu cały dzień",
    ],
    imageCar: maserati.slug,
    searchNeed:
      "Użytkownik chce uniknąć przepłacania, ale też nie chce, żeby auto zniknęło za wcześnie.",
    promise:
      "Pomagamy dobrać czas do realnego planu: odbiór, ceremonia, sala, zdjęcia i bufor.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Krótki wariant",
        body:
          "Sprawdza się, gdy odbiór, ceremonia i sala są blisko siebie, a nie planujecie długiej sesji przy aucie.",
      },
      {
        title: "Wariant rozszerzony",
        body:
          "Daje spokój przy kilku adresach, przejazdach przez Warszawę i dodatkowych postojach. To często najwygodniejszy wybór.",
      },
      {
        title: "Cały dzień",
        body:
          "Ma sens, gdy auto jest częścią oprawy, zdjęć i wejścia pod salę. Wtedy nie walczycie z zegarkiem przy każdym przesunięciu.",
      },
    ],
  },
  {
    slug: "sesja-slubna-z-autem-warszawa",
    path: "/poradnik/sesja-slubna-z-autem-warszawa",
    footerLabel: "Sesja z autem",
    footerGroup: "Poradnik",
    kind: "guide",
    h1: "Sesja ślubna z autem w Warszawie",
    title: "Sesja ślubna z autem Warszawa | Pomysły i logistyka",
    description:
      "Sesja ślubna z autem w Warszawie: jak zaplanować postoje, czas, model i styl zdjęć z Mercedesem lub Maserati.",
    lead:
      "Auto premium może być nie tylko transportem, ale też mocnym elementem zdjęć. Kluczowe jest jednak to, żeby sesja nie rozwaliła harmonogramu dnia.",
    eyebrow: "Sesja zdjęciowa",
    primaryKeyword: "sesja ślubna z autem Warszawa",
    secondaryKeywords: [
      "zdjęcia ślubne z autem",
      "auto do sesji ślubnej Warszawa",
      "samochód na sesję ślubną",
    ],
    imageCar: mercedes.slug,
    searchNeed:
      "Użytkownik myśli o zdjęciach i potrzebuje połączenia estetyki z logistyką.",
    promise:
      "Podpowiadamy, jak zaplanować czas, model i postój, żeby zdjęcia przy aucie były wartością, nie stresem.",
    ctaHref: "/konfigurator",
    guideSections: [
      {
        title: "Styl zdjęć",
        body:
          "Mercedes daje spokojny, luksusowy kadr. Maserati daje więcej charakteru i dynamiki. Warto wybrać auto pod klimat fotografa i miejsca.",
      },
      {
        title: "Czas postoju",
        body:
          "Nawet 20-30 minut przy aucie potrafi dać pełny zestaw ujęć. Trzeba jednak wpisać ten postój do planu przejazdu.",
      },
      {
        title: "Plan bez nerwów",
        body:
          "Najlepiej potraktować sesję jako element trasy. Wtedy kierowca, para i fotograf wiedzą, kiedy auto jest potrzebne i ile czasu można na to poświęcić.",
      },
    ],
  },
];

const localPages = localCities.map(createLocalPage);
const modelLocalPages = [
  ...modelLocalCities.map((city) => createModelLocalPage(mercedes.slug, city)),
  ...modelLocalCities.map((city) => createModelLocalPage(maserati.slug, city)),
];

export const seoLandingPages: SeoLandingPage[] = [
  ...corePages,
  ...localPages,
  ...modelLocalPages,
  ...guidePages,
];

export const rootLandingPages = seoLandingPages.filter(
  (page) => !page.path.startsWith("/poradnik/")
);

export const poradnikLandingPages = seoLandingPages.filter((page) =>
  page.path.startsWith("/poradnik/")
);

export function getRootLandingBySlug(slug: string): SeoLandingPage | undefined {
  return rootLandingPages.find((page) => page.slug === slug);
}

export function getPoradnikLandingBySlug(
  slug: string
): SeoLandingPage | undefined {
  return poradnikLandingPages.find((page) => page.slug === slug);
}

const footerGroups = [
  "Najważniejsze",
  "Ceny i kierowca",
  "Modele",
  "Okolice Warszawy",
  "Model i okolica",
  "Poradnik",
] satisfies FooterGroup[];

export const footerLandingGroups: { title: FooterGroup; links: { href: string; label: string }[] }[] = footerGroups.map((group) => ({
  title: group,
  links: seoLandingPages
    .filter((page) => page.footerGroup === group)
    .map((page) => ({ href: page.path, label: page.footerLabel })),
}));
