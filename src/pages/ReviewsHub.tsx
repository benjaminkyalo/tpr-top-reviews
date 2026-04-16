import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { providers } from "@/data/providers";

const BASE = "https://topvpnr.com";

export default function ReviewsHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Proxy & VPN Provider Reviews 2026",
    url: `${BASE}/reviews`,
    description: "In-depth expert reviews of 20+ proxy and VPN providers. Independently tested with real performance data.",
  };

  return (
    <Layout>
      <SEOHead
        title="All Proxy & VPN Reviews 2026 – Expert Tested | TPR"
        description="Read independent, expert-tested reviews of 20+ proxy and VPN providers including Bright Data, Oxylabs, Smartproxy, IPRoyal, Webshare, and more. Updated April 2026."
        canonical={`${BASE}/reviews`}
        jsonLd={[jsonLd, {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://topvpnr.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://topvpnr.com/reviews"}]}]}
      />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Proxy & VPN Provider Reviews</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Every provider independently tested over 30+ days. Real speed benchmarks, uptime monitoring, and hands-on evaluation of features, pricing, and support quality.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <Link key={p.slug} to={`/review/${p.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground">#{p.rank}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${p.type === "Residential" ? "badge-residential" : "badge-datacenter"}`}>{p.type}</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-bold group-hover:text-primary">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.bestFor}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-bold score-gold"><Star className="h-4 w-4 fill-current" />{p.score.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">From {p.priceFrom}</span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">Read Full Review <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
