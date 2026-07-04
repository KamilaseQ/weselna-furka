import type { Addon } from "./types";

export const addons: Addon[] = [
  {
    id: "flowers",
    name: "Dekoracja kwiatowa",
    description: "Kompozycja żywych kwiatów na masce, w stylu pasującym do bukietu.",
    price: 250,
    visual: "flowers",
    defaultOn: true,
  },
  {
    id: "ribbons",
    name: "Wstążki „Młoda Para”",
    description: "Eleganckie satynowe wstążki na klamkach i lusterkach.",
    price: 80,
    visual: "ribbons",
    defaultOn: false,
  },
  {
    id: "carpet",
    name: "Czerwony dywan",
    description: "Rozwijany dywan przy wysiadaniu — efektowne wejście na salę.",
    price: 100,
    visual: "carpet",
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
    description: "30 minut z fotografem przy zaparkowanym aucie w plenerze.",
    price: 600,
    visual: "none",
    defaultOn: false,
  },
];

export function getAddon(id: string) {
  return addons.find((a) => a.id === id);
}
