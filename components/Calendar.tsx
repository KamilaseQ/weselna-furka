"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "./icons";

/* ——— local-safe date helpers (no UTC drift) ——— */

export function parseISODate(iso?: string | null): Date | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

export function toISODate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function formatPolishDate(iso?: string | null): string {
  const d = parseISODate(iso);
  if (!d) return "";
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** next wedding-season Saturday (~11 months out) used as a friendly default */
export function nextSeasonSaturday(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 11);
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
  return toISODate(d);
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const WEEKDAYS = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];

interface CalendarProps {
  /** selected date, ISO yyyy-mm-dd */
  value?: string;
  onChange: (iso: string) => void;
  /** earliest selectable date, ISO; defaults to today */
  min?: string;
  className?: string;
}

/**
 * Elegant custom month calendar — serif month title, pill days,
 * Monday-first Polish grid. Replaces the native date input everywhere.
 */
export function Calendar({ value, onChange, min, className = "" }: CalendarProps) {
  const today = startOfDay(new Date());
  const minDate = parseISODate(min) ?? today;
  const selected = parseISODate(value);

  const [view, setView] = useState<Date>(() => {
    const base = selected ?? minDate;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("pl-PL", { month: "long", year: "numeric" }).format(
        view
      ),
    [view]
  );

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    // Monday-first offset: JS getDay() is 0=Sunday
    const offset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(
      view.getFullYear(),
      view.getMonth() + 1,
      0
    ).getDate();
    const list: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) list.push(null);
    for (let d = 1; d <= daysInMonth; d++)
      list.push(new Date(view.getFullYear(), view.getMonth(), d));
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [view]);

  const canGoPrev =
    new Date(view.getFullYear(), view.getMonth() + 1, 0) > minDate;

  const move = (delta: number) =>
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));

  return (
    <div className={`select-none ${className}`}>
      {/* header */}
      <div className="flex items-center justify-between px-1 pb-3">
        <button
          type="button"
          onClick={() => canGoPrev && move(-1)}
          disabled={!canGoPrev}
          aria-label="Poprzedni miesiąc"
          className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-all hover:bg-ink/5 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronDown className="h-4 w-4 rotate-90" />
        </button>
        <p className="font-serif text-xl capitalize text-ink" aria-live="polite">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Następny miesiąc"
          className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-all hover:bg-ink/5 hover:text-ink"
        >
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </button>
      </div>

      {/* weekday row */}
      <div className="grid grid-cols-7 pb-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <span
            key={w}
            className={`text-[10px] font-medium uppercase tracking-wider2 ${
              i >= 5 ? "text-gold" : "text-ink-faint"
            }`}
          >
            {w}
          </span>
        ))}
      </div>

      {/* days */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const iso = toISODate(d);
          const isSelected = selected ? iso === toISODate(selected) : false;
          const isToday = iso === toISODate(today);
          const disabled = d < minDate;
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-label={formatPolishDate(iso)}
              aria-pressed={isSelected}
              className={`relative mx-auto grid h-10 w-10 place-items-center rounded-full text-sm transition-all duration-200 ${
                isSelected
                  ? "bg-wine font-medium text-cream-50 shadow-card"
                  : disabled
                    ? "cursor-default text-ink-faint/50"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {d.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
