import type { Car, CarColor } from "./types";

// Both cars are rented in one fixed livery — pearl white, ready for
// decorations. There is no colour choice anywhere in the flow.
const pearlWhite: CarColor = {
  id: "white",
  name: "Biała perła",
  hex: "#EDEBE6",
  highlight: "#FFFFFF",
  shadow: "#C9C5BC",
};

export const cars: Car[] = [
  {
    slug: "mercedes-s-klasa",
    name: "Mercedes-Benz S-Klasa",
    tagline: "Limuzyna",
    brand: "Mercedes-Benz",
    shape: "limo",
    year: 2019,
    seats: 5,
    type: "Limuzyna premium",
    basePrice: 2500,
    pricePerHour: 400,
    availability: "free",
    availabilityNote: "Wolne terminy w sezonie",
    blurb:
      "Cisza, przestrzeń i nieskazitelna elegancja. Najbardziej rozpoznawalna limuzyna świata na najważniejszy dzień.",
    description:
      "S-Klasa to spokojna, reprezentacyjna limuzyna z silnikiem V8 470 KM, skórzanym wnętrzem i podgrzewanymi fotelami. Idealna do eleganckiego przejazdu na ceremonię, salę i sesję zdjęciową.",
    colors: [pearlWhite],
    defaultColorId: "white",
    recommended: true,
    specs: [
      { label: "Nadwozie", value: "Limuzyna long" },
      { label: "Silnik", value: "V8 470 KM" },
      { label: "Miejsca", value: "Samochód 5-osobowy" },
      { label: "Wnętrze", value: "Skórzane, podgrzewane fotele" },
      { label: "Kolor", value: "Biała perła" },
      { label: "Rocznik", value: "2019" },
    ],
    included: [
      "Kierowca w garniturze i pełnym przygotowaniu",
      "Auto umyte i wydetailowane przed trasą",
      "Woda i chusteczki dla pary młodej",
      "Punktualny przyjazd z buforem czasu",
    ],
    galleryCount: 6,
  },
  {
    slug: "maserati-ghibli",
    name: "Maserati Ghibli",
    tagline: "Włoska limuzyna",
    brand: "Maserati",
    shape: "sedan",
    year: 2021,
    seats: 5,
    type: "Sportowa limuzyna",
    basePrice: 2500,
    pricePerHour: 450,
    availability: "free",
    availabilityNote: "Wolne terminy w sezonie",
    blurb:
      "Włoski charakter i wyrazisty dźwięk silnika. Dla pary, która ceni sportową elegancję.",
    description:
      "Ghibli łączy elegancję limuzyny z włoskim charakterem. Ma silnik V6 430 KM, skórzane fotele i brzmienie, które słychać zanim auto wjedzie przed salę. Dla pary, która chce, by ich auto miało osobowość.",
    colors: [pearlWhite],
    defaultColorId: "white",
    specs: [
      { label: "Nadwozie", value: "Sportowa limuzyna" },
      { label: "Silnik", value: "V6 430 KM" },
      { label: "Miejsca", value: "Samochód 5-osobowy" },
      { label: "Wnętrze", value: "Skórzane fotele" },
      { label: "Kolor", value: "Biała perła" },
      { label: "Rocznik", value: "2021" },
    ],
    included: [
      "Kierowca w garniturze i pełnym przygotowaniu",
      "Auto umyte i wydetailowane przed trasą",
      "Woda i chusteczki dla pary młodej",
      "Punktualny przyjazd z buforem czasu",
    ],
    galleryCount: 6,
  },
  {
    slug: "bmw-seria-4",
    name: "BMW Seria 4 Coupé",
    tagline: "Sport Coupé",
    brand: "BMW",
    shape: "coupe",
    year: 2023,
    seats: 4,
    type: "Coupé",
    basePrice: 1900,
    pricePerHour: 320,
    availability: "limited",
    availabilityNote: "Mało wolnych terminów",
    hidden: true,
    blurb:
      "Dynamiczna sylwetka coupe i nowoczesny charakter. Lekkie, efektowne wejście dla nowoczesnej pary.",
    description:
      "Seria 4 Coupé to najbardziej wyrazista linia BMW — niskie nadwozie, duży grill i sportowy charakter. Świetna na sesję zdjęciową i dla pary, która ceni nowoczesny, dynamiczny styl bez przepychu.",
    colors: [pearlWhite],
    defaultColorId: "white",
    specs: [
      { label: "Nadwozie", value: "Coupé 2-drzwiowe" },
      { label: "Kolor", value: "Biała perła" },
      { label: "Miejsca", value: "4" },
      { label: "Wnętrze", value: "Skóra Vernasca" },
      { label: "Rocznik", value: "2023" },
    ],
    included: [
      "Kierowca w garniturze i pełnym przygotowaniu",
      "Auto umyte i wydetailowane przed trasą",
      "Woda i chusteczki dla pary młodej",
      "Punktualny przyjazd z buforem czasu",
    ],
    galleryCount: 6,
  },
];

/** cars shown anywhere on the site — hidden models stay in data only */
export const visibleCars = cars.filter((c) => !c.hidden);

export function getCar(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export const availabilityMeta: Record<
  Car["availability"],
  { label: string; dot: string; text: string }
> = {
  free: { label: "Wolny", dot: "bg-avail", text: "text-avail" },
  limited: { label: "Mało godzin", dot: "bg-gold", text: "text-gold" },
  busy: { label: "Zajęty", dot: "bg-ink-faint", text: "text-ink-faint" },
};
