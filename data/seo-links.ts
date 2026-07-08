import { seoLandingPages } from "@/data/seo-landings";

export interface SeoLink {
  href: string;
  label: string;
  description?: string;
}

export interface SeoLinkGroup {
  title: string;
  eyebrow: string;
  links: SeoLink[];
}

function landingLink(slug: string, description?: string): SeoLink | undefined {
  const page = seoLandingPages.find((item) => item.slug === slug);
  if (!page) return undefined;
  return {
    href: page.path,
    label: page.footerLabel,
    description: description ?? page.description,
  };
}

function requiredLink(link: SeoLink | undefined): SeoLink {
  if (!link) {
    throw new Error("Missing SEO landing link");
  }
  return link;
}

export const primarySeoLinks: SeoLink[] = [
  requiredLink(
    landingLink(
      "auto-do-slubu-warszawa",
      "Główna strona usługi dla par szukających auta ślubnego w Warszawie."
    )
  ),
  {
    href: "/konfigurator",
    label: "Konfigurator wyceny",
    description: "Model, data, trasa i dodatki w jednym formularzu.",
  },
  {
    href: "/flota",
    label: "Samochody do ślubu",
    description: "Mercedes-Benz S-Klasa i Maserati Ghibli z kierowcą.",
  },
  {
    href: "/konfigurator",
    label: "Konfigurator przejazdu",
    description: "Data, trasa, auto i dodatki w jednym formularzu.",
  },
];

export const seoLinkGroups: SeoLinkGroup[] = [
  {
    eyebrow: "Start",
    title: "Najważniejsze strony",
    links: primarySeoLinks,
  },
  {
    eyebrow: "Budżet",
    title: "Cena i planowanie",
    links: [
      requiredLink(landingLink("wycena-auta-do-slubu-warszawa")),
      requiredLink(landingLink("ile-kosztuje-auto-do-slubu-warszawa")),
      requiredLink(landingLink("auto-do-slubu-z-kierowca-warszawa")),
      requiredLink(landingLink("kiedy-rezerwowac-auto-do-slubu")),
      requiredLink(landingLink("ile-godzin-wynajac-auto-do-slubu")),
    ],
  },
  {
    eyebrow: "Modele",
    title: "Wybór samochodu",
    links: [
      requiredLink(landingLink("mercedes-s-klasa-do-slubu-warszawa")),
      requiredLink(landingLink("maserati-ghibli-do-slubu-warszawa")),
      requiredLink(landingLink("bialy-mercedes-do-slubu-warszawa")),
      requiredLink(landingLink("biale-auto-do-slubu-warszawa")),
      requiredLink(landingLink("mercedes-czy-maserati-do-slubu")),
    ],
  },
  {
    eyebrow: "Okolice",
    title: "Popularne lokalizacje",
    links: [
      requiredLink(landingLink("auto-do-slubu-piaseczno")),
      requiredLink(landingLink("auto-do-slubu-konstancin-jeziorna")),
      requiredLink(landingLink("auto-do-slubu-pruszkow")),
      requiredLink(landingLink("auto-do-slubu-otwock")),
      requiredLink(landingLink("auto-do-slubu-legionowo")),
    ],
  },
];
