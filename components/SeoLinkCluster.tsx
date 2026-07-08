import Link from "next/link";
import { seoLinkGroups, type SeoLinkGroup } from "@/data/seo-links";
import { ArrowRight } from "@/components/icons";

interface SeoLinkClusterProps {
  title?: string;
  subtitle?: string;
  groups?: SeoLinkGroup[];
  className?: string;
}

export function SeoLinkCluster({
  title = "Szybkie ścieżki dla par planujących przejazd.",
  subtitle = "Najczęściej wybierane tematy: cena, modele, kierowca i lokalizacje w okolicach Warszawy.",
  groups = seoLinkGroups,
  className = "pt-24",
}: SeoLinkClusterProps) {
  return (
    <section className={`site-container ${className}`}>
      <div className="max-w-3xl">
        <p className="eyebrow">Popularne tematy</p>
        <h2 className="mt-4 text-balance text-4xl leading-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.title} className="border-t border-ink/10 pt-5">
            <p className="text-xs font-medium uppercase tracking-wider2 text-gold">
              {group.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl text-ink">{group.title}</h3>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-start justify-between gap-3 text-sm text-ink-muted transition hover:text-ink"
                  >
                    <span>
                      <span className="font-medium text-ink-soft group-hover:text-ink">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="mt-1 block leading-relaxed text-ink-faint">
                          {link.description}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
