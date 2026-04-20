import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { comparisons } from "@/data/comparisons";

const BASE = "https://www.topvpnr.com";

export default function ComparisonsHub() {
  return (
    <Layout>
      <SEOHead
        title="Proxy Provider Comparisons 2026 – Head-to-Head Reviews | TPR"
        description="Side-by-side proxy provider comparisons. Bright Data vs Oxylabs, Smartproxy vs IPRoyal, residential vs datacenter, and more. Data-driven verdicts."
        canonical={`${BASE}/comparisons`}
      />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Proxy Provider Comparisons</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Head-to-head comparisons backed by real benchmarks. Find the right proxy provider for your specific needs.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((c) => (
            <Link key={c.slug} to={`/compare/${c.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
              <h2 className="mt-3 font-display text-lg font-bold group-hover:text-primary">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.metaDesc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">Winner: {c.winner}</span>
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
