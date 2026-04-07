import { useParams, Link } from "react-router-dom";
import { Star, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { getBestOfBySlug } from "@/data/bestOf";
import { getProviderBySlug } from "@/data/providers";

export default function BestOfPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getBestOfBySlug(slug || "");
  if (!page) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Page not found</h1><Link to="/" className="mt-4 inline-block text-primary">← Home</Link></div></Layout>;

  return (
    <Layout>
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">Best Picks • Updated April 2026</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{page.intro}</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-10 space-y-6">
        <p className="text-xs text-muted-foreground italic">Affiliate Disclosure: We may earn commissions from links on this page.</p>
        {page.picks.map((pick) => {
          const prov = getProviderBySlug(pick.provider);
          return (
            <div key={pick.rank} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">#{pick.rank}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Link to={`/review/${pick.provider}`} className="font-display text-lg font-bold hover:text-primary">{prov?.name || pick.provider}</Link>
                  <span className="inline-flex items-center gap-1 font-bold score-gold text-sm"><Star className="h-3 w-3 fill-current" />{pick.score}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{pick.reason}</p>
              </div>
              <a href="#" className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Visit <ExternalLink className="h-3 w-3" /></a>
            </div>
          );
        })}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-3 font-display text-xl font-bold">Buying Guide</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">{page.buyingGuide.map((tip, i) => <li key={i}>• {tip}</li>)}</ul>
        </div>
        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="mb-2 font-display text-xl font-bold">Conclusion</h2>
          <p className="text-muted-foreground">{page.conclusion}</p>
        </div>
      </div>
    </Layout>
  );
}
