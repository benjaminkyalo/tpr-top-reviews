import { useParams, Link } from "react-router-dom";
import { Star, ExternalLink, Check, X, Gauge, Globe, Zap, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import { getProviderBySlug } from "@/data/providers";

export default function ReviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const provider = getProviderBySlug(slug || "");

  if (!provider) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Provider not found</h1><Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back to rankings</Link></div></Layout>;

  const stars = Math.round(provider.score / 2);

  return (
    <Layout>
      <section className="border-b border-border bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <p className="mb-2 text-xs text-muted-foreground italic">Affiliate Disclosure: We may earn commissions from links on this page.</p>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">#{provider.rank} in Top 20</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">{provider.name} Review 2026</h1>
              <p className="mt-2 text-muted-foreground">{provider.type} Proxy Provider • Updated April 2026</p>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-4">
              <span className="text-3xl font-bold score-gold">{provider.score.toFixed(2)}</span>
              <div className="mt-1 flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < stars ? "fill-current score-gold" : "text-muted-foreground"}`} />)}</div>
              <span className="mt-1 text-xs text-muted-foreground">Expert Score</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-2 font-display text-xl font-bold">Quick Summary</h2>
              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div><span className="text-muted-foreground">Best For:</span><br /><strong>{provider.bestFor}</strong></div>
                <div><span className="text-muted-foreground">Price From:</span><br /><strong>{provider.priceFrom}</strong></div>
                <div><span className="text-muted-foreground">Free Trial:</span><br /><strong>{provider.freeTrial ? "Yes ✓" : "No ✗"}</strong></div>
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-display text-xl font-bold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{provider.overview}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />Pros</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">{provider.pros.map((p, i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />{p}</li>)}</ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2"><X className="h-4 w-4 text-red-500" />Cons</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">{provider.cons.map((c, i) => <li key={i} className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />{c}</li>)}</ul>
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-display text-xl font-bold">Performance Metrics</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Zap, label: "Speed", value: provider.speed },
                  { icon: Shield, label: "Uptime", value: provider.uptime },
                  { icon: Globe, label: "Locations", value: provider.locations },
                  { icon: Gauge, label: "IP Pool", value: provider.ipPool },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-border bg-card p-4 text-center">
                    <m.icon className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                    <p className="mt-0.5 font-semibold">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-display text-xl font-bold">Pricing Plans</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {provider.plans.map((plan) => (
                  <div key={plan.name} className="rounded-lg border border-border bg-card p-5">
                    <h4 className="font-semibold">{plan.name}</h4>
                    <p className="mt-1 text-lg font-bold text-primary">{plan.price}</p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{plan.features.map((f, i) => <li key={i}>• {f}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-display text-xl font-bold">Who Should Use {provider.name}?</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">{provider.whoShouldUse.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </div>

            <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
              <h2 className="mb-2 font-display text-xl font-bold">Final Verdict</h2>
              <p className="text-muted-foreground leading-relaxed">{provider.verdict}</p>
              <a href="#" className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Visit {provider.name} <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold">At a Glance</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="font-medium">{provider.type}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Score</dt><dd className="font-bold score-gold">{provider.score}/10</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Price From</dt><dd className="font-medium">{provider.priceFrom}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Free Trial</dt><dd className="font-medium">{provider.freeTrial ? "Yes" : "No"}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Protocols</dt><dd className="font-medium">{provider.protocols.join(", ")}</dd></div>
                </dl>
                <a href="#" className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Visit Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
