import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { bestOfPages } from "@/data/bestOf";

const BASE = "https://topvpnr.com";

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
              <Trophy className="h-5 w-5 text-primary" />
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
