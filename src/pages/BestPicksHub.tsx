import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { bestOfPages } from "@/data/bestOf";
const BASE = "https://www.topvpnr.com";

const flagMap: Record<string, string> = {
  "best-proxies-brazil-2026": "br",
  "best-proxies-canada-2026": "ca",
  "best-proxies-usa-2026": "us",
  "best-proxies-argentina-2026": "ar",
  "best-proxies-colombia-2026": "co",
  "best-proxies-chile-2026": "cl",
  "best-proxies-peru-2026": "pe",
  "best-proxies-venezuela-2026": "ve",
  "best-proxies-china-2026": "cn",
  "best-proxies-south-korea-2026": "kr",
  "best-proxies-singapore-2026": "sg",
  "best-proxies-indonesia-2026": "id",
  "best-proxies-thailand-2026": "th",
  "best-proxies-vietnam-2026": "vn",
  "best-proxies-philippines-2026": "ph",
  "best-proxies-malaysia-2026": "my",
  "best-proxies-pakistan-2026": "pk",
  "best-proxies-bangladesh-2026": "bd",
  "best-proxies-uae-2026": "ae",
  "best-proxies-saudi-arabia-2026": "sa",
  "best-proxies-france-2026": "fr",
  "best-proxies-spain-2026": "es",
  "best-proxies-netherlands-2026": "nl",
  "best-proxies-poland-2026": "pl",
  "best-proxies-sweden-2026": "se",
  "best-proxies-switzerland-2026": "ch",
  "best-proxies-belgium-2026": "be",
  "best-proxies-portugal-2026": "pt",
  "best-proxies-turkey-2026": "tr",
  "best-proxies-romania-2026": "ro",
  "best-proxies-czech-republic-2026": "cz",
  "best-datacenter-proxies-germany-2026": "de",
  "best-proxies-south-africa-extended-2026": "za",
  "best-proxies-ghana-2026": "gh",
  "best-proxies-ethiopia-2026": "et",
  "best-proxies-tanzania-2026": "tz",
  "best-proxies-uganda-2026": "ug",
  "best-proxies-egypt-2026": "eg",
  "best-proxies-morocco-2026": "ma",
  "best-proxies-senegal-2026": "sn",
  "best-proxies-cameroon-2026": "cm",
  "best-proxies-ivory-coast-2026": "ci",
  "best-proxies-israel-2026": "il",
  "best-proxies-qatar-2026": "qa",
  "best-proxies-kuwait-2026": "kw",
  "best-proxies-jordan-2026": "jo",
  "best-proxies-iraq-2026": "iq",
  "best-proxies-australia-2026": "au",
  "best-proxies-new-zealand-2026": "nz",
  "best-proxies-papua-new-guinea-2026": "pg",
  "best-proxies-rwanda-2026": "rw",
  "best-proxies-zimbabwe-2026": "zw",
  "best-proxies-zambia-2026": "zm",
  "best-proxies-angola-2026": "ao",
  "best-proxies-mozambique-2026": "mz",
  "best-proxies-sri-lanka-2026": "lk",
  "best-proxies-myanmar-2026": "mm",
  "best-proxies-cambodia-2026": "kh",
  "best-proxies-nepal-2026": "np",
  "best-proxies-kazakhstan-2026": "kz",
  "best-proxies-greece-2026": "gr",
  "best-proxies-hungary-2026": "hu",
  "best-proxies-ukraine-2026": "ua",
  "best-proxies-norway-2026": "no",
  "best-proxies-denmark-2026": "dk",
  "best-proxies-finland-2026": "fi",
  "best-proxies-austria-2026": "at",
  "best-proxies-ireland-2026": "ie",
  "best-proxies-ecuador-2026": "ec",
  "best-proxies-bolivia-2026": "bo",
  "best-proxies-paraguay-2026": "py",
  "best-proxies-uruguay-2026": "uy",
  "best-proxies-panama-2026": "pa",
  "best-proxies-costa-rica-2026": "cr",
  "best-proxies-guatemala-2026": "gt",
  "best-proxies-kenya": "ke",
  "best-proxies-nigeria": "ng",
  "best-proxies-south-africa": "za",
  "best-residential-proxies-nigeria-2026": "ng",
  "best-datacenter-proxies-india-2026": "in",
  "best-residential-proxies-japan-2026": "jp",
  "best-residential-proxies-united-kingdom-2026": "gb",
  "best-residential-proxies-italy-2026": "it",
  "best-residential-proxies-mexico-2026": "mx",
  "best-datacenter-proxies-kenya-2026": "ke",
  "best-datacenter-proxies-nigeria-2026": "ng",
};

export default function BestPicksHub() {
  return (
    <Layout>
      <SEOHead
        title="Best Proxy Lists 2026 - Top Picks by Category | TPR"
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
          {bestOfPages.map((b) => {
            const code = flagMap[b.slug];
            return (
              <Link key={b.slug} to={`/best/${b.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
                {code ? (
                  <img
                    src={`https://flagcdn.com/w40/${code}.png`}
                    srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
                    width="40"
                    height="27"
                    alt={`${b.title} flag`}
                    className="rounded-sm shadow-sm object-cover"
                    loading="lazy"
                  />
                ) : (
                  <Trophy className="h-5 w-5 text-primary" />
                )}
                <h2 className="mt-3 font-display text-lg font-bold group-hover:text-primary">{b.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.metaDesc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">View Rankings <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
