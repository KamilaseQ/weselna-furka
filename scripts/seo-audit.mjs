import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, ".next", "server", "app");
const siteUrl = "https://www.weselnafurka.pl";
const skipContentRoutes = new Set(["/_not-found", "/cennik", "/pakiety", "/start"]);
const allowedNoindexRoutes = new Set(["/_not-found", "/rezerwacja"]);

const issues = [];
const warnings = [];

function collectHtmlFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function routeFromFile(file) {
  const rel = path.relative(appDir, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  const route = rel.endsWith("/index.html")
    ? rel.slice(0, -"/index.html".length)
    : rel.slice(0, -".html".length);
  return `/${route}`;
}

function read(file) {
  return readFileSync(file, "utf8");
}

function firstMatch(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function checkHtmlPage(file) {
  const route = routeFromFile(file);
  const html = read(file);
  const skipContent = skipContentRoutes.has(route);
  const title = firstMatch(html, [/<title>([^<]*)<\/title>/i]);
  const description = firstMatch(html, [
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i,
    /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i,
  ]);
  const canonical = firstMatch(html, [
    /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i,
    /<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i,
  ]);
  const robots = firstMatch(html, [
    /<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i,
    /<meta\s+content=["']([^"']*)["']\s+name=["']robots["']/i,
  ]);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (html.includes("localhost:3000")) {
    issues.push(`${route}: contains localhost:3000`);
  }

  if (!skipContent) {
    if (!title) issues.push(`${route}: missing <title>`);
    if (!description) issues.push(`${route}: missing meta description`);
    if (!canonical) issues.push(`${route}: missing canonical`);
    if (canonical && !canonical.startsWith(siteUrl)) {
      issues.push(`${route}: canonical outside ${siteUrl}: ${canonical}`);
    }
    if (h1Count !== 1) {
      issues.push(`${route}: expected exactly one H1, found ${h1Count}`);
    }
  }

  if (robots.toLowerCase().includes("noindex") && !allowedNoindexRoutes.has(route)) {
    issues.push(`${route}: unexpected noindex (${robots})`);
  }

  if (title.length > 65) {
    warnings.push(`${route}: long title (${title.length} chars)`);
  }
  if (description.length > 165) {
    warnings.push(`${route}: long description (${description.length} chars)`);
  }

  return { route, title, description, canonical };
}

function checkDuplicates(pages, field) {
  const seen = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    const routes = seen.get(value) ?? [];
    routes.push(page.route);
    seen.set(value, routes);
  }

  for (const [value, routes] of seen) {
    if (routes.length > 1) {
      warnings.push(
        `duplicate ${field}: ${routes.join(", ")} -> ${value.slice(0, 90)}`
      );
    }
  }
}

function checkRobotsAndSitemap() {
  const robotsPath = path.join(appDir, "robots.txt.body");
  const sitemapPath = path.join(appDir, "sitemap.xml.body");

  if (!existsSync(robotsPath)) {
    issues.push("robots.txt.body missing. Run npm run build first.");
  } else {
    const robots = read(robotsPath);
    if (!robots.includes(`Host: ${siteUrl}`)) {
      issues.push("robots.txt: wrong Host");
    }
    if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
      issues.push("robots.txt: wrong Sitemap");
    }
    if (robots.includes("/pakiety") || robots.includes("/rezerwacja")) {
      issues.push("robots.txt: blocks indexable or followable conversion paths");
    }
  }

  if (!existsSync(sitemapPath)) {
    issues.push("sitemap.xml.body missing. Run npm run build first.");
  } else {
    const sitemap = read(sitemapPath);
    for (const url of ["/konfigurator", "/poradnik", "/mapa-strony", "/flota"]) {
      if (!sitemap.includes(`${siteUrl}${url}`)) {
        issues.push(`sitemap.xml: missing ${url}`);
      }
    }
    if (sitemap.includes("localhost:3000")) {
      issues.push("sitemap.xml: contains localhost:3000");
    }
  }
}

if (!existsSync(appDir)) {
  console.error("Missing .next/server/app. Run npm run build before seo:check.");
  process.exit(1);
}

const pages = collectHtmlFiles(appDir).map(checkHtmlPage);
checkDuplicates(
  pages.filter((page) => !skipContentRoutes.has(page.route)),
  "title"
);
checkDuplicates(
  pages.filter((page) => !skipContentRoutes.has(page.route)),
  "description"
);
checkRobotsAndSitemap();

if (warnings.length) {
  console.warn(`SEO warnings (${warnings.length}):`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (issues.length) {
  console.error(`SEO check failed (${issues.length}):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`SEO check passed for ${pages.length} HTML pages.`);
