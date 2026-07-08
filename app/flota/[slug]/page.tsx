import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { visibleCars, getCar, availabilityMeta } from "@/data/cars";
import { addons } from "@/data/addons";
import { reviews } from "@/data/reviews";
import { getCarImages } from "@/data/images";
import { formatPLNShort } from "@/lib/format";
import { absoluteUrl, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import {
  CheckIcon,
  ArrowRight,
  CalendarIcon,
  StarIcon,
} from "@/components/icons";

export function generateStaticParams() {
  return visibleCars.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const car = getCar(params.slug);
  if (!car || car.hidden) return { title: "Auto — Weselna Furka" };
  const images = getCarImages(car.slug);
  return buildPageMetadata({
    title: `${car.name} do ślubu Warszawa`,
    description: `${car.name} do ślubu w Warszawie z kierowcą. Cena od ${formatPLNShort(
      car.basePrice
    )}, przygotowanie auta, dekoracje i konfiguracja terminu online.`,
    path: `/flota/${car.slug}`,
    image: images.cover.src,
    keywords: [
      `${car.name} do ślubu Warszawa`,
      `${car.name} na wesele`,
      `${car.brand} z kierowcą Warszawa`,
      "auto do ślubu Warszawa",
    ],
  });
}

export default function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const car = getCar(params.slug);
  if (!car || car.hidden) notFound();

  const meta = availabilityMeta[car.availability];
  const images = getCarImages(car.slug);
  const brandKey = car.brand.split("-")[0].toLowerCase();
  const carReview = reviews.find((r) =>
    r.car.toLowerCase().includes(brandKey)
  );
  const pagePath = `/flota/${car.slug}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    { name: "Flota", path: "/flota" },
    { name: car.name, path: pagePath },
  ]);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(pagePath)}#service`,
    name: `${car.name} do ślubu z kierowcą`,
    description: car.description,
    url: absoluteUrl(pagePath),
    serviceType: "Wynajem samochodu do ślubu z kierowcą",
    areaServed: "Warszawa i okolice",
    provider: {
      "@type": "AutoRental",
      "@id": `${absoluteUrl("/")}#business`,
      name: "Weselna Furka",
    },
    offers: {
      "@type": "Offer",
      price: car.basePrice,
      priceCurrency: "PLN",
      url: absoluteUrl(`/konfigurator?car=${car.slug}`),
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Vehicle",
        name: car.name,
        brand: car.brand,
        vehicleModelDate: String(car.year),
        vehicleSeatingCapacity: car.seats,
      },
    },
  };

  return (
    <div className="site-container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Link
        href="/flota"
        className="text-sm text-ink-muted transition-colors hover:text-ink"
      >
        ← Wróć do floty
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* gallery */}
        <Reveal>
          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-card">
            <Image
              src={images.cover.src}
              alt={images.cover.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {images.gallery.slice(1).map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 27vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out-expo hover:scale-[1.05]"
                />
              </div>
            ))}
          </div>

          {carReview && (
            <figure className="surface-card mt-6 p-6">
              <div className="mb-3 flex gap-0.5 text-gold">
                {Array.from({ length: carReview.rating }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-ink-soft">
                “{carReview.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-ink-muted">
                <span className="font-medium text-ink">{carReview.name}</span> ·{" "}
                {carReview.date}
              </figcaption>
            </figure>
          )}
        </Reveal>

        {/* info */}
        <Reveal delay={120}>
          <p className="eyebrow">{car.tagline}</p>
          <h1 className="mt-2 text-5xl text-ink">
            {car.name} do ślubu w Warszawie
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span>{car.type}</span>
            <span className="text-ink/20">·</span>
            <span>Rocznik {car.year}</span>
            <span className="text-ink/20">·</span>
            <span>{car.seats} miejsca</span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
              <span className={meta.text}>{car.availabilityNote}</span>
            </span>
          </div>

          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            {car.description}
          </p>

          <div className="surface-card mt-6 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider2 text-ink-faint">
                  Cena od
                </p>
                <p className="font-serif text-4xl text-ink">
                  {formatPLNShort(car.basePrice)}
                </p>
                <p className="text-xs text-ink-faint">za 6h · kierowca w cenie</p>
              </div>
              <Link href={`/konfigurator?car=${car.slug}`} className="btn-primary">
                Konfiguruj
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* fixed livery note */}
          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-cream-200/60 px-5 py-4">
            <span
              className="h-8 w-8 shrink-0 rounded-full ring-1 ring-ink/10"
              style={{
                background:
                  "linear-gradient(135deg, #FFFFFF, #EDEBE6 55%, #C9C5BC)",
              }}
            />
            <p className="text-sm text-ink-soft">
              <strong className="font-medium">Kolor: biała perła.</strong>{" "}
              Stały, ślubny lakier — auto gotowe pod dekoracje.
            </p>
          </div>

          {/* specs */}
          <div className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {car.specs.map((s) => (
              <div
                key={s.label}
                className="flex justify-between gap-4 border-b border-ink/8 py-2 text-sm"
              >
                <span className="text-ink-faint">{s.label}</span>
                <span className="text-right font-medium text-ink-soft">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* included */}
          <div className="mt-8">
            <h3 className="font-serif text-xl text-ink">W komplecie dostajecie</h3>
            <ul className="mt-3 space-y-2">
              {car.included.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-avail" />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* addon prices */}
          <div className="mt-8">
            <h3 className="font-serif text-xl text-ink">Dodatki (opcjonalnie)</h3>
            <ul className="mt-3 divide-y divide-ink/8">
              {addons.map((a) => (
                <li key={a.id} className="flex justify-between py-2.5 text-sm">
                  <span className="text-ink-soft">{a.name}</span>
                  <span className="font-medium text-ink">
                    +{formatPLNShort(a.price)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/konfigurator?car=${car.slug}`}
            className="btn-primary mt-8 w-full"
          >
            <CalendarIcon className="h-4 w-4" />
            Sprawdź dostępność i skonfiguruj
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
