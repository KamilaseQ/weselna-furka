import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPoradnikLandingBySlug,
  poradnikLandingPages,
} from "@/data/seo-landings";
import { buildPageMetadata } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

export function generateStaticParams() {
  return poradnikLandingPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getPoradnikLandingBySlug(params.slug);
  if (!page) return { title: "Poradnik | Weselna Furka" };

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    path: page.path,
    type: "article",
  });
}

export default function PoradnikLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getPoradnikLandingBySlug(params.slug);
  if (!page) notFound();

  return <SeoLandingPage page={page} />;
}
