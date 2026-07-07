import type { Addon } from "./types";

export const addons: Addon[] = [
  {
    id: "flowers",
    name: "Spersonalizowana dekoracja kwiatowa",
    description:
      "Kompozycja żywych kwiatów zaprojektowana pod Wasz motyw przewodni i bukiet — wyjątkowa, uszyta na miarę Waszego dnia.",
    price: 350,
    visual: "flowers",
    defaultOn: false,
  },
  {
    id: "champagne",
    name: "Szampan dla pary",
    description: "Schłodzona butelka i dwa kieliszki w aucie po ceremonii.",
    price: 150,
    visual: "none",
    defaultOn: false,
  },
  {
    id: "photographer",
    name: "Dodatkowa sesja przy aucie",
    description:
      "Kilkanaście minut z fotografem przy zaparkowanym aucie w plenerze — zakres i cenę ustalamy indywidualnie.",
    price: 0,
    visual: "none",
    defaultOn: false,
    quote: true,
  },
];

export function getAddon(id: string) {
  return addons.find((a) => a.id === id);
}
