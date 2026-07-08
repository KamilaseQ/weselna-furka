"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MenuIcon, CloseIcon } from "./icons";

const nav = [
  { href: "/o-nas", label: "O nas" },
  { href: "/flota", label: "Flota" },
  { href: "/konfigurator", label: "Konfigurator" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-ink/10 bg-cream-50/85 backdrop-blur-md"
          : "border-transparent bg-cream-50/40 backdrop-blur-sm"
      }`}
    >
      <div className="site-container flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-[15px] transition-colors ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px w-full bg-gold transition-transform duration-300 ease-out ${
                    active
                      ? "scale-x-100"
                      : "origin-left scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/konfigurator" className="hidden btn-primary sm:inline-flex">
            Poproś o rezerwację
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 lg:hidden"
          >
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fadeIn border-t border-ink/10 bg-cream-50 lg:hidden">
          <nav className="site-container flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/5 py-3.5 text-lg text-ink-soft last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/konfigurator" className="btn-primary mt-4 w-full">
              Poproś o rezerwację
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
