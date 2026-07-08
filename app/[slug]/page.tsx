import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getRootLandingBySlug,
  rootLandingPages,
} from "@/data/seo-landings";
import { buildPageMetadata } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

export function generateStaticParams() {
  return rootLandingPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getRootLandingBySlug(params.slug);
  if (!page) return { title: "Weselna Furka" };

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    path: page.path,
  });
}

export default function RootLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getRootLandingBySlug(params.slug);
  if (!page) notFound();

  return <SeoLandingPage page={page} />;
}
