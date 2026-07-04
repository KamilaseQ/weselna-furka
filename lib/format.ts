export function formatPLN(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPLNShort(value: number): string {
  return `${value.toLocaleString("pl-PL")} zł`;
}
