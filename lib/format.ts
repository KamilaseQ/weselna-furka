export function formatPLN(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPLNShort(value: number): string {
  const amount = value.toLocaleString("pl-PL").replace(/\s/g, "\u00A0");
  return `${amount}\u00A0zł`;
}

export function formatCapacityLabel(seats: number): string {
  return `samochód ${seats}-osobowy`;
}
