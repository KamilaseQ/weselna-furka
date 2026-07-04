import { cars } from "@/data/cars";
import { addons as allAddons } from "@/data/addons";

export const HOUR_OPTIONS = [
  { id: "4h", label: "4h", hours: 4 },
  { id: "6h", label: "6h", hours: 6 },
  { id: "8h", label: "8h", hours: 8 },
  { id: "day", label: "Cały dzień", hours: 12 },
] as const;

export interface PriceInput {
  carSlug: string;
  hours: number;
  addonIds: string[];
  extraKm?: number;
}

export interface PriceBreakdown {
  base: number;
  addonsTotal: number;
  kmTotal: number;
  total: number;
  lines: { label: string; value: number }[];
}

const KM_RATE = 4; // zł per km over the included distance
const INCLUDED_KM = 40;

export function calculatePrice(input: PriceInput): PriceBreakdown {
  const car = cars.find((c) => c.slug === input.carSlug) ?? cars[0];

  // base = 6h reference price scaled by hours, with the first 6h discounted as a block
  const baseSixHours = car.basePrice;
  const extraHours = Math.max(0, input.hours - 6);
  const base =
    input.hours <= 6
      ? Math.round((baseSixHours * input.hours) / 6 / 10) * 10
      : baseSixHours + extraHours * car.pricePerHour;

  const lines: { label: string; value: number }[] = [
    { label: `${car.name} · ${input.hours}h`, value: base },
  ];

  let addonsTotal = 0;
  for (const id of input.addonIds) {
    const a = allAddons.find((x) => x.id === id);
    if (a) {
      addonsTotal += a.price;
      lines.push({ label: a.name, value: a.price });
    }
  }

  const overKm = Math.max(0, (input.extraKm ?? 0) - INCLUDED_KM);
  const kmTotal = overKm * KM_RATE;
  if (kmTotal > 0) {
    lines.push({ label: `Trasa +${overKm} km`, value: kmTotal });
  }

  const total = base + addonsTotal + kmTotal;
  return { base, addonsTotal, kmTotal, total, lines };
}
