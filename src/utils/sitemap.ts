import { providers } from "@/data/providers";
import { comparisons } from "@/data/comparisons";
import { bestOfPages } from "@/data/bestOf";
import { howToPages } from "@/data/howTo";
import { educationalPages } from "@/data/educational";
import { speedTests } from "@/data/speedTests";
import { countryProxyPages } from "@/data/countries";
import { blogPosts } from "@/data/blog";

const BASE = "https://www.topvpnr.com";

function entry(path: string, priority: string, changefreq = "weekly") {
  return `  <url>\n    <loc>${BASE}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <lastmod>2026-04-14</lastmod>\n  </url>`;
}

export function generateSitemap(): string {
  const urls: string[] = [
    entry("/", "1.0", "daily"),
    entry("/reviews", "0.9", "daily"),
    entry("/comparisons", "0.9", "daily"),
    entry("/best", "0.9", "daily"),
    entry("/guides", "0.9", "daily"),
    entry("/speed-tests", "0.9", "daily"),
    entry("/blog", "0.9", "daily"),
    entry("/proxy-checker", "0.8", "weekly"),
    entry("/proxies-by-country", "0.9", "weekly"),
    entry("/about", "0.6"),
    entry("/contact", "0.5"),
    entry("/privacy", "0.3", "monthly"),
    entry("/terms", "0.3", "monthly"),
    ...providers.map(p => entry(`/review/${p.slug}`, "0.9")),
    ...comparisons.map(c => entry(`/compare/${c.slug}`, "0.8")),
    ...bestOfPages.map(b => entry(`/best/${b.slug}`, "0.8")),
    ...howToPages.map(h => entry(`/how-to/${h.slug}`, "0.7")),
    ...educationalPages.map(e => entry(`/learn/${e.slug}`, "0.7")),
    ...speedTests.map(s => entry(`/speed-test/${s.slug}`, "0.8")),
    ...countryProxyPages.map(c => entry(`/best-proxies/${c.slug}`, "0.7")),
    ...blogPosts.map(b => entry(`/blog/${b.slug}`, "0.8", "weekly")),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}
