import { reviews } from "@/data/reviews";
import { StarIcon } from "./icons";

/**
 * Reviews as a slow, hover-pausable marquee of editorial quote cards —
 * oversized serif quotation mark, italic body, small-caps byline.
 */
export function ReviewsStrip() {
  const loop = [...reviews, ...reviews];
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track flex w-max animate-marquee gap-4 pb-2">
        {loop.map((r, i) => (
          <figure
            key={`${r.name}-${i}`}
            aria-hidden={i >= reviews.length}
            className="surface-card relative w-[300px] shrink-0 p-6 pt-8 sm:w-[340px]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-1 left-4 font-serif text-6xl italic leading-none text-gold/30"
            >
              “
            </span>
            <blockquote className="relative font-serif text-lg italic leading-relaxed text-ink-soft">
              {r.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-ink/8 pt-4">
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-wider2 text-ink">
                  {r.name}
                </span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  {r.car} · {r.date}
                </span>
              </span>
              <span className="flex gap-0.5 text-gold">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <StarIcon key={j} className="h-3.5 w-3.5" />
                ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
