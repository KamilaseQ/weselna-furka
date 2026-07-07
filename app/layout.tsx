import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

const SITE_URL = "https://weselnafurka.pl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Weselna Furka — luksusowe samochody na wesele w Warszawie",
    template: "%s | Weselna Furka",
  },
  description:
    "Wynajem aut luksusowych na wesele w Warszawie i okolicach. Wybierz datę i trasę, skonfiguruj auto z kierowcą w cenie i poproś o rezerwację — prosto, przejrzyście, bez ukrytych kosztów.",
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
  alternates: { canonical: "/" },
  authors: [{ name: "Weselna Furka" }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Weselna Furka",
    title: "Weselna Furka — luksusowe samochody na wesele w Warszawie",
    description:
      "Auto z kierowcą na Wasz ślub. Skonfiguruj datę, trasę i dekoracje, zobacz cenę od razu i poproś o rezerwację.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weselna Furka — luksusowe samochody na wesele",
    description:
      "Auto z kierowcą na Wasz ślub. Cena znana od razu, bez ukrytych kosztów.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "Weselna Furka",
  description:
    "Wynajem luksusowych samochodów z kierowcą na wesela w Warszawie i okolicach.",
  url: SITE_URL,
  areaServed: "Warszawa i okolice (promień 100 km)",
  email: "kontakt@weselnafurka.pl",
  telephone: ["+48501747490", "+48728561373"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Warszawa",
    addressCountry: "PL",
  },
  priceRange: "$$$",
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
