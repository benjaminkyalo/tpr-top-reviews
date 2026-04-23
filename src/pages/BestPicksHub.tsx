import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { bestOfPages } from "@/data/bestOf";
const BASE = "https://www.topvpnr.com";

const flagMap: Record<string, string> = {
  "best-proxies-brazil-2026": "🇧🇷",
  "best-proxies-canada-2026": "🇨🇦",
  "best-proxies-usa-2026": "🇺🇸",
  "best-proxies-argentina-2026": "🇦🇷",
  "best-proxies-colombia-2026": "🇨🇴",
  "best-proxies-chile-2026": "🇨🇱",
  "best-proxies-peru-2026": "🇵🇪",
  "best-proxies-venezuela-2026": "🇻🇪",
  "best-proxies-china-2026": "🇨🇳",
  "best-proxies-south-korea-2026": "🇰🇷",
  "best-proxies-singapore-2026": "🇸🇬",
  "best-proxies-indonesia-2026": "🇮🇩",
  "best-proxies-thailand-2026": "🇹🇭",
  "best-proxies-vietnam-2026": "🇻🇳",
  "best-proxies-philippines-2026": "🇵🇭",
  "best-proxies-malaysia-2026": "🇲🇾",
  "best-proxies-pakistan-2026": "🇵🇰",
  "best-proxies-bangladesh-2026": "🇧🇩",
  "best-proxies-uae-2026": "🇦🇪",
  "best-proxies-saudi-arabia-2026": "🇸🇦",
  "best-proxies-france-2026": "🇫🇷",
  "best-proxies-spain-2026": "🇪🇸",
  "best-proxies-netherlands-2026": "🇳🇱",
  "best-proxies-poland-2026": "🇵🇱",
  "best-proxies-sweden-2026": "🇸🇪",
  "best-proxies-switzerland-2026": "🇨🇭",
  "best-proxies-belgium-2026": "🇧🇪",
  "best-proxies-portugal-2026": "🇵🇹",
  "best-proxies-turkey-2026": "🇹🇷",
  "best-proxies-romania-2026": "🇷🇴",
  "best-proxies-czech-republic-2026": "🇨🇿",
  "best-datacenter-proxies-germany-2026": "🇩🇪",
  "best-proxies-south-africa-extended-2026": "🇿🇦",
  "best-proxies-ghana-2026": "🇬🇭",
  "best-proxies-ethiopia-2026": "🇪🇹",
  "best-proxies-tanzania-2026": "🇹🇿",
  "best-proxies-uganda-2026": "🇺🇬",
  "best-proxies-egypt-2026": "🇪🇬",
  "best-proxies-morocco-2026": "🇲🇦",
  "best-proxies-senegal-2026": "🇸🇳",
  "best-proxies-cameroon-2026": "🇨🇲",
  "best-proxies-ivory-coast-2026": "🇨🇮",
  "best-proxies-israel-2026": "🇮🇱",
  "best-proxies-qatar-2026": "🇶🇦",
  "best-proxies-kuwait-2026": "🇰🇼",
  "best-proxies-jordan-2026": "🇯🇴",
  "best-proxies-iraq-2026": "🇮🇶",
  "best-proxies-australia-2026": "🇦🇺",
  "best-proxies-new-zealand-2026": "🇳🇿",
  "best-proxies-papua-new-guinea-2026": "🇵🇬",
  "best-proxies-rwanda-2026": "🇷🇼",
  "best-proxies-zimbabwe-2026": "🇿🇼",
  "best-proxies-zambia-2026": "🇿🇲",
  "best-proxies-angola-2026": "🇦🇴",
  "best-proxies-mozambique-2026": "🇲🇿",
  "best-proxies-sri-lanka-2026": "🇱🇰",
  "best-proxies-myanmar-2026": "🇲🇲",
  "best-proxies-cambodia-2026": "🇰🇭",
  "best-proxies-nepal-2026": "🇳🇵",
  "best-proxies-kazakhstan-2026": "🇰🇿",
  "best-proxies-greece-2026": "🇬🇷",
  "best-proxies-hungary-2026": "🇭🇺",
  "best-proxies-ukraine-2026": "🇺🇦",
  "best-proxies-norway-2026": "🇳🇴",
  "best-proxies-denmark-2026": "🇩🇰",
  "best-proxies-finland-2026": "🇫🇮",
  "best-proxies-austria-2026": "🇦🇹",
  "best-proxies-ireland-2026": "🇮🇪",
  "best-proxies-ecuador-2026": "🇪🇨",
  "best-proxies-bolivia-2026": "🇧🇴",
  "best-proxies-paraguay-2026": "🇵🇾",
  "best-proxies-uruguay-2026": "🇺🇾",
  "best-proxies-panama-2026": "🇵🇦",
  "best-proxies-costa-rica-2026": "🇨🇷",
  "best-proxies-guatemala-2026": "🇬🇹",
  "best-proxies-africa": "🌍",
  "best-proxies-kenya": "🇰🇪",
  "best-proxies-nigeria": "🇳🇬",
  "best-proxies-south-africa": "🇿🇦",
  "best-residential-proxies": "🏠",
  "best-datacenter-proxies": "🖥️",
  "best-free-proxies": "🆓",
  "best-proxies-scraping": "🕷️",
  "best-proxies-instagram": "📸",
  "best-proxies-seo": "📈",
  "best-residential-proxies-nigeria-2026": "🇳🇬",
  "best-datacenter-proxies-india-2026": "🇮🇳",
  "best-residential-proxies-japan-2026": "🇯🇵",
  "best-residential-proxies-united-kingdom-2026": "🇬🇧",
  "best-residential-proxies-italy-2026": "🇮🇹",
  "best-residential-proxies-mexico-2026": "🇲🇽",
  "best-datacenter-proxies-kenya-2026": "🇰🇪",
  "best-datacenter-proxies-nigeria-2026": "🇳🇬",
};

export default function BestPicksHub() {
  return (
    <Layout>
      <SEOHead
        title="Best Proxy Lists 2026 – Top Picks by Category | TPR"
        description="Curated lists of the best proxy providers by category: residential, datacenter, scraping, Instagram, SEO, free proxies, and more. Expert-ranked April 2026."
        canonical={`${BASE}/best`}
      />
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Best Proxy Providers by Category</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Expert-curated proxy rankings for every use case. Find the perfect provider for scraping, social media, SEO, and more.</p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestOfPages.map((b) => (
            <Link key={b.slug} to={`/best/${b.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
              <span className="text-3xl">{flagMap[b.slug] || <Trophy className="h-5 w-5 text-primary" />}</span>
              <h2 className="mt-3 font-display text-lg font-bold group-hover:text-primary">{b.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.metaDesc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">View Rankings <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
