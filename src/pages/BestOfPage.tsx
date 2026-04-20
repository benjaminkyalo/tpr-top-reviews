import { useParams, Link } from "react-router-dom";
import { Star, ExternalLink, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { getBestOfBySlug } from "@/data/bestOf";
import { getProviderBySlug } from "@/data/providers";

const BASE = "https://www.topvpnr.com";

export default function BestOfPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getBestOfBySlug(slug || "");
  if (!page) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Page not found</h1><Link to="/" className="mt-4 inline-block text-primary">← Home</Link></div></Layout>;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    description: page.metaDesc,
    numberOfItems: page.picks.length,
    itemListElement: page.picks.map(p => ({ "@type": "ListItem", position: p.rank, name: getProviderBySlug(p.provider)?.name || p.provider, url: `${BASE}/review/${p.provider}` })),
  };

  const faqItems = page.faq || [];
  const faqLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : undefined;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://topvpnr.com/" },
      { "@type": "ListItem", position: 2, name: "Best Picks", item: `${BASE}/best` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${BASE}/best/${page.slug}` },
    ],
  };

  return (
    <Layout>
      <SEOHead title={page.metaTitle} description={page.metaDesc} canonical={`${BASE}/best/${page.slug}`} jsonLd={itemListLd} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> &gt; <span>Best Picks</span> &gt; <span className="text-foreground">{page.title}</span></nav>
          <p className="text-sm text-muted-foreground">Best Picks • Updated April 2026</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{page.intro}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 space-y-6">
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
              <a href={prov?.affiliateUrl || "#"} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Visit <ExternalLink className="h-3 w-3" /></a>
            </div>
          );
        })}

        {/* Extended methodology */}
        {page.methodology && page.methodology.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 font-display text-xl font-bold">Our Testing Methodology</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">{page.methodology.map((m, i) => <li key={i}>✓ {m}</li>)}</ul>
          </div>
        )}

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-3 font-display text-xl font-bold">Buying Guide</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">{page.buyingGuide.map((tip, i) => <li key={i}>• {tip}</li>)}</ul>
        </div>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-sm">{item.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
                  {item.providerSlug && (
                    <Link to={`/review/${item.providerSlug}`} className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      Read {item.providerName || "review"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="mb-2 font-display text-xl font-bold">Conclusion</h2>
          <p className="text-muted-foreground">{page.conclusion}</p>
        </div>

        <InternalLinks title="Explore More" links={[
          { label: "Best Residential Proxies 2026", path: "/best/best-residential-proxies" },
          { label: "Best Datacenter Proxies 2026", path: "/best/best-datacenter-proxies" },
          { label: "Best Free Proxies 2026", path: "/best/best-free-proxies" },
          { label: "Bright Data vs Oxylabs", path: "/compare/bright-data-vs-oxylabs" },
          { label: "What is a Proxy Server?", path: "/learn/what-is-proxy-server" },
          { label: "How to Choose the Right Proxy", path: "/how-to/how-to-choose-right-proxy" },
        ]} />
      </div>
    </Layout>
  );
}
