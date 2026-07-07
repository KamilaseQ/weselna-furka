import type { MetadataRoute } from "next";

const SITE_URL = "https://weselnafurka.pl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // packages are hidden from the flow for now — keep them out of the index
      disallow: ["/pakiety", "/rezerwacja"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
