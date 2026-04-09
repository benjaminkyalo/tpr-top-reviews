import { providers } from "@/data/providers";
import { comparisons } from "@/data/comparisons";
import { bestOfPages } from "@/data/bestOf";
import { howToPages } from "@/data/howTo";
import { educationalPages } from "@/data/educational";

const BASE = "https://toptierproxy.com";

function entry(path: string, priority: string, changefreq = "weekly") {
  return `  <url>\n    <loc>${BASE}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <lastmod>2026-04-09</lastmod>\n  </url>`;
}

export function generateSitemap(): string {
  const urls: string[] = [
    entry("/", "1.0", "daily"),
    entry("/reviews", "0.9", "daily"),
    entry("/comparisons", "0.9", "daily"),
    entry("/best", "0.9", "daily"),
    entry("/guides", "0.9", "daily"),
    entry("/about", "0.6"),
    entry("/contact", "0.5"),
    entry("/privacy", "0.3", "monthly"),
    entry("/terms", "0.3", "monthly"),
    ...providers.map(p => entry(`/review/${p.slug}`, "0.9")),
    ...comparisons.map(c => entry(`/compare/${c.slug}`, "0.8")),
    ...bestOfPages.map(b => entry(`/best/${b.slug}`, "0.8")),
    ...howToPages.map(h => entry(`/how-to/${h.slug}`, "0.7")),
    ...educationalPages.map(e => entry(`/learn/${e.slug}`, "0.7")),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}
