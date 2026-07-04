import Image from "next/image";
import { CarIcon } from "./icons";

interface PlaceholderImageProps {
  label?: string;
  src?: string;
  alt?: string;
  objectPosition?: string;
  sizes?: string;
  /** aspect ratio helper class, e.g. "aspect-[4/3]" */
  className?: string;
  variant?: "studio" | "warm" | "dark";
  icon?: boolean;
  caption?: string;
}

const variants: Record<string, string> = {
  studio: "studio-floor",
  warm: "bg-gradient-to-br from-cream-200 to-[#e6ddcd]",
  dark: "bg-gradient-to-br from-[#2a2d33] to-[#15171b] text-cream-200",
};

/**
 * Intentional, premium-looking placeholder used everywhere photos will later
 * be swapped in. Designed to read as a finished frame, not a broken image.
 */
export function PlaceholderImage({
  label = "Zdjęcie wkrótce",
  src,
  alt,
  objectPosition = "center",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  className = "aspect-[4/3]",
  variant = "studio",
  icon = true,
  caption,
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${variants[variant]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <>
          {/* corner ticks to suggest a photo frame */}
          <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-current opacity-20" />
          <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-current opacity-20" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-current opacity-20" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-current opacity-20" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            {icon && (
              <CarIcon
                className={`h-10 w-10 ${
                  variant === "dark" ? "text-cream-200/60" : "text-ink/25"
                }`}
              />
            )}
            <span
              className={`text-[11px] font-medium uppercase tracking-wider2 ${
                variant === "dark" ? "text-cream-200/60" : "text-ink/35"
              }`}
            >
              {label}
            </span>
            {caption && (
              <span
                className={`mt-0.5 max-w-[80%] text-xs ${
                  variant === "dark" ? "text-cream-200/45" : "text-ink/30"
                }`}
              >
                {caption}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
