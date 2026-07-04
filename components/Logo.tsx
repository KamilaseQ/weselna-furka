import Link from "next/link";

/** filled heart with a soft gold gradient — the brand mark */
function HeartMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-heart-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C5A574" />
          <stop offset="0.55" stopColor="#B08D57" />
          <stop offset="1" stopColor="#8C6E40" />
        </linearGradient>
      </defs>
      <path
        d="M12 20.7C7.2 16.9 3.4 13.5 3.4 9.6 3.4 6.9 5.4 5 7.7 5c1.7 0 3.2.9 4.3 2.6C13.1 5.9 14.6 5 16.3 5c2.3 0 4.3 1.9 4.3 4.6 0 3.9-3.8 7.3-8.6 11.1Z"
        fill="url(#logo-heart-gold)"
      />
      {/* small highlight for depth */}
      <path
        d="M6.2 8.9c.3-1.2 1.3-2.1 2.4-2.2"
        fill="none"
        stroke="#F6F4EF"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Weselna Furka — strona główna"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <HeartMark className="h-[26px] w-[26px] transition-transform duration-300 group-hover:scale-110" />
      <span className="font-serif text-2xl font-medium tracking-tight text-ink">
        Weselna Furka
      </span>
    </Link>
  );
}
