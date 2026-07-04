"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, formatPolishDate } from "./Calendar";
import { CalendarIcon, ChevronDown } from "./icons";

interface DateFieldProps {
  value?: string;
  onChange: (iso: string) => void;
  min?: string;
  placeholder?: string;
  className?: string;
  /** fires when the calendar popover opens/closes */
  onOpenChange?: (open: boolean) => void;
  /** popover alignment relative to the field */
  align?: "left" | "right";
}

/**
 * Field-styled trigger that opens the custom Calendar in a popover.
 */
export function DateField({
  value,
  onChange,
  min,
  placeholder = "Wybierz datę",
  className = "",
  onOpenChange,
  align = "left",
}: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const setOpenNotify = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenNotify(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenNotify(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const label = value ? formatPolishDate(value) : "";

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpenNotify(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`field flex items-center gap-3 text-left ${
          open ? "border-gold/60 bg-white ring-4 ring-gold/10" : ""
        }`}
      >
        <CalendarIcon className="h-5 w-5 shrink-0 text-ink-muted" />
        <span className={`flex-1 ${label ? "text-ink" : "text-ink-faint"}`}>
          {label || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Kalendarz"
          className={`absolute top-[calc(100%+8px)] z-40 w-[320px] max-w-[calc(100vw-2.5rem)] animate-popIn rounded-2xl border border-ink/8 bg-white p-4 shadow-float ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <Calendar
            value={value}
            min={min}
            onChange={(iso) => {
              onChange(iso);
              setOpenNotify(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
