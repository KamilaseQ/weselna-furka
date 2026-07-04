import type { PackageTier, CompareRow } from "./types";

export const packageTiers: PackageTier[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Klasycznie i bez dopłat",
    priceFrom: 2500,
    duration: "6 godzin",
    summary: [
      "1 auto z floty",
      "6 godzin z kierowcą",
      "Białe wstążki",
      "Detailing przed trasą",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Auto do wyboru, pełna dekoracja",
    priceFrom: 4500,
    duration: "8 godzin",
    highlight: true,
    badge: "Najczęściej wybierany",
    summary: [
      "1 auto — S-Klasa lub Ghibli",
      "8 godzin z kierowcą",
      "Dekoracja kwiatowa i wstążki",
      "Detailing przed trasą",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "2 auta na cały dzień",
    priceFrom: 7500,
    duration: "Cały dzień",
    summary: [
      "2 auta z kierowcami",
      "Cały dzień",
      "Pełna dekoracja i czerwony dywan",
      "Szampan i sesja przy aucie",
    ],
  },
];

/**
 * Feature-by-feature comparison matrix rendered on /pakiety.
 * `values` follow the tier order above; `true` = check, `false` = dash,
 * a string = short descriptive cell.
 */
export const compareRows: CompareRow[] = [
  {
    label: "Samochód",
    values: ["1 auto z floty", "1 auto do wyboru", "2 auta"],
  },
  {
    label: "Czas z kierowcą",
    values: ["6 godzin", "8 godzin", "Cały dzień"],
  },
  { label: "Kierowca w garniturze", values: [true, true, true] },
  { label: "Detailing przed trasą", values: [true, true, true] },
  { label: "Białe wstążki", values: [true, true, true] },
  { label: "Dekoracja kwiatowa", values: [false, true, "Rozszerzona"] },
  { label: "Czerwony dywan", values: [false, false, true] },
  { label: "Szampan dla pary", values: [false, false, true] },
  { label: "Sesja przy aucie (30 min)", values: [false, false, true] },
];

export function getPackageTier(id: string) {
  return packageTiers.find((t) => t.id === id);
}
