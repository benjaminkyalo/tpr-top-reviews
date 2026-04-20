import { Link } from "react-router-dom";
import { Globe, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { countryProxyPages } from "@/data/countries";

const BASE = "https://www.topvpnr.com";

export default function CountryProxiesHub() {
  const countries = [...new Set(countryProxyPages.map((p) => p.country))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Proxies by Country 2026",
    url: `${BASE}/proxies-by-country`,
    description: "Find the best residential and datacenter proxies for every country. Expert-tested proxy providers ranked by location coverage.",
  };

  return (
    <Layout>
      <SEOHead
        title="Best Proxies by Country 2026 – Residential & Datacenter | TPR"
        description="Find the best proxy providers for any country. Residential and datacenter proxies tested for 20+ countries. Expert-ranked with real speed data."
        canonical={`${BASE}/proxies-by-country`}
        jsonLd={[jsonLd, {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://topvpnr.com/"},{"@type":"ListItem","position":2,"name":"Proxies by Country","item":"https://topvpnr.com/proxies-by-country"}]}]}
      />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> &gt; <span className="text-foreground">Proxies by Country</span>
          </nav>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Best Proxies by Country 2026</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Find the best residential and datacenter proxy providers for any country. {countryProxyPages.length} location-specific guides with expert rankings.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.map((country) => {
            const pages = countryProxyPages.filter((p) => p.country === country);
            return (
              <div key={country} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">{country}</h2>
                </div>
                <div className="space-y-2">
                  {pages.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/best-proxies/${p.slug}`}
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span>{p.proxyType} Proxies</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-xl font-bold">Why Location Matters for Proxies</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">Choosing a proxy with IPs in your target country is critical for geo-restricted content access, local SEO monitoring, regional price comparison, and ad verification. Our guides cover the best proxy providers with genuine IPs in each country, tested for speed, reliability, and pool size.</p>
        </div>
      </section>
    </Layout>
  );
}
