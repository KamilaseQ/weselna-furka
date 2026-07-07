export type CarShape = "coupe" | "sedan" | "limo";

export type Availability = "free" | "limited" | "busy";

export interface CarColor {
  id: string;
  name: string;
  /** body base color */
  hex: string;
  /** lighter highlight used for the 3D shading */
  highlight: string;
  /** darker shadow used for the 3D shading */
  shadow: string;
}

export interface Car {
  slug: string;
  /** Real model name */
  name: string;
  /** Marketing label used in the configurator/fleet cards */
  tagline: string;
  brand: string;
  shape: CarShape;
  year: number;
  seats: number;
  type: string;
  /** base price for the default 6h rental */
  basePrice: number;
  pricePerHour: number;
  availability: Availability;
  availabilityNote: string;
  /** short marketing blurb */
  blurb: string;
  /** longer description on detail page */
  description: string;
  colors: CarColor[];
  defaultColorId: string;
  specs: { label: string; value: string }[];
  included: string[];
  /** number of placeholder gallery frames */
  galleryCount: number;
  recommended?: boolean;
  /** temporarily removed from all listings without deleting the data */
  hidden?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  /** decoration visual hook used by the CarVisualizer */
  visual?: "flowers" | "ribbons" | "carpet" | "none";
  defaultOn?: boolean;
  /** priced individually after the request — shows "wycena indywidualna",
   *  never added to the running total */
  quote?: boolean;
}

export interface PackageTier {
  id: string;
  name: string;
  /** one-line positioning under the tier name */
  tagline: string;
  priceFrom: number;
  /** human label of the included time block */
  duration: string;
  highlight?: boolean;
  badge?: string;
  /** short bullet list reused in the reservation summary */
  summary: string[];
}

/** one row of the /pakiety comparison table */
export interface CompareRow {
  label: string;
  /** per-tier cell: true = included, false = not, string = short note */
  values: (boolean | string)[];
}

export interface Review {
  name: string;
  car: string;
  date: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  q: string;
  a: string;
}
