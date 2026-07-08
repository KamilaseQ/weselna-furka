interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}

/**
 * Editorial section header: eyebrow set between two hairlines (magazine
 * "department" style), oversized serif title, optional one-line subtitle.
 * Use <em> inside `title` for the italic accent word.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const Title = as;

  if (align === "left") {
    return (
      <div className={`text-left ${className}`}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Title className="text-balance text-4xl leading-[1.05] text-ink sm:text-5xl [&_em]:italic [&_em]:text-wine">
          {title}
        </Title>
        {subtitle && (
          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {eyebrow && <p className="eyebrow-rules mb-5">{eyebrow}</p>}
      <Title className="text-balance text-4xl leading-[1.05] text-ink sm:text-5xl [&_em]:italic [&_em]:text-wine">
        {title}
      </Title>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-ink-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
