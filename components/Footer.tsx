import Link from "next/link";
import { Logo } from "./Logo";
import { PhoneIcon, MailIcon, PinIcon } from "./icons";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SECONDARY_PHONE,
  SECONDARY_PHONE_HREF,
  SERVICE_AREA,
} from "@/lib/contact";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-cream-50">
      <div className="site-container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Luksusowe samochody na wesela w Warszawie i okolicach. Prosto,
            przejrzyście, z kierowcą w cenie.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider2 text-ink-muted">
            Nawigacja
          </h4>
          <ul className="space-y-2.5 text-sm text-ink-muted">
            <li><Link href="/flota" className="transition-colors hover:text-ink">Flota</Link></li>
            <li><Link href="/konfigurator" className="transition-colors hover:text-ink">Konfigurator</Link></li>
            <li><Link href="/o-nas" className="transition-colors hover:text-ink">O nas</Link></li>
            <li><Link href="/kontakt" className="transition-colors hover:text-ink">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider2 text-ink-muted">
            Kontakt
          </h4>
          <ul className="space-y-3 text-sm text-ink-muted">
            <li>
              <a href={CONTACT_PHONE_HREF} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <PhoneIcon className="h-4 w-4 text-gold" /> {CONTACT_PHONE}
              </a>
            </li>
            <li>
              <a href={SECONDARY_PHONE_HREF} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <PhoneIcon className="h-4 w-4 text-gold" /> {SECONDARY_PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <MailIcon className="h-4 w-4 text-gold" /> {CONTACT_EMAIL}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <PinIcon className="h-4 w-4 text-gold" /> {SERVICE_AREA}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider2 text-ink-muted">
            Godziny
          </h4>
          <p className="text-sm text-ink-muted">Codziennie 9:00 – 21:00</p>
          <Link href="/konfigurator" className="btn-primary mt-5 text-sm">
            Poproś o rezerwację
          </Link>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="site-container flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Weselna Furka. Wszystkie prawa zastrzeżone.</p>
          <p className="flex gap-4">
            <Link href="/zasady-rezerwacji" className="hover:text-ink-muted">
              Zasady rezerwacji
            </Link>
            <Link href="/polityka-prywatnosci" className="hover:text-ink-muted">
              Polityka prywatności
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
