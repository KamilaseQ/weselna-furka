import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { visibleCars } from "@/data/cars";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SECONDARY_PHONE,
  SERVICE_AREA,
  SITE_URL,
} from "@/lib/contact";
import { DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Auto do ślubu Warszawa | Weselna Furka",
    template: "%s | Weselna Furka",
  },
  description:
    "Wynajem luksusowych aut do ślubu w Warszawie i okolicach. Mercedes S-Klasa i Maserati z kierowcą, jasną ceną i konfiguracją online.",
  keywords: [
    "samochód na wesele",
    "auto do ślubu Warszawa",
    "wynajem auta na wesele",
    "limuzyna na ślub",
    "samochód z kierowcą na wesele",
    "Mercedes S-Klasa na ślub",
    "Maserati na wesele",
    "auto ślubne Warszawa",
  ],
  authors: [{ name: "Weselna Furka" }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Weselna Furka",
    title: "Auto do ślubu Warszawa | Weselna Furka",
    description:
      "Luksusowe auto z kierowcą na ślub w Warszawie. Skonfiguruj datę, trasę i dekoracje, zobacz cenę i poproś o rezerwację.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Weselna Furka - luksusowe auta do ślubu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto do ślubu Warszawa | Weselna Furka",
    description:
      "Mercedes S-Klasa i Maserati z kierowcą na ślub w Warszawie. Cena znana od razu, bez ukrytych kosztów.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const businessId = `${SITE_URL}/#business`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoRental",
      "@id": businessId,
      name: "Weselna Furka",
      description:
        "Wynajem luksusowych samochodów z kierowcą na śluby i wesela w Warszawie i okolicach.",
      url: SITE_URL,
      image: absoluteUrl(DEFAULT_OG_IMAGE),
      areaServed: [
        "Warszawa",
        "Piaseczno",
        "Konstancin-Jeziorna",
        "Pruszków",
        "Otwock",
        "Legionowo",
        "Marki",
        SERVICE_AREA,
      ],
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE.replace(/\s/g, ""),
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT_PHONE.replace(/\s/g, ""),
          contactType: "rezerwacje",
          areaServed: "PL",
          availableLanguage: ["pl"],
        },
        {
          "@type": "ContactPoint",
          telephone: SECONDARY_PHONE.replace(/\s/g, ""),
          contactType: "rezerwacje",
          areaServed: "PL",
          availableLanguage: ["pl"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Warszawa",
        addressRegion: "mazowieckie",
        addressCountry: "PL",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      ],
      priceRange: "$$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Samochody do ślubu",
        itemListElement: visibleCars.map((car) => ({
          "@type": "Offer",
          name: `${car.name} do ślubu z kierowcą`,
          price: car.basePrice,
          priceCurrency: "PLN",
          url: absoluteUrl(`/flota/${car.slug}`),
          itemOffered: {
            "@type": "Vehicle",
            name: car.name,
            brand: car.brand,
            vehicleModelDate: String(car.year),
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Weselna Furka",
      url: SITE_URL,
      inLanguage: "pl-PL",
      publisher: { "@id": businessId },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
