import type { MetadataRoute } from "next";
import { visibleCars } from "@/data/cars";

const SITE_URL = "https://weselnafurka.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/konfigurator`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/flota`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/o-nas`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/zasady-rezerwacji`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/polityka-prywatnosci`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const carRoutes: MetadataRoute.Sitemap = visibleCars.map((c) => ({
    url: `${SITE_URL}/flota/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...carRoutes];
}
