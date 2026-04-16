import { useParams, Link } from "react-router-dom";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { getComparisonBySlug } from "@/data/comparisons";
import { getProviderBySlug } from "@/data/providers";

const BASE = "https://topvpnr.com";

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comp = getComparisonBySlug(slug || "");
  if (!comp) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Comparison not found</h1><Link to="/" className="mt-4 inline-block text-primary">← Home</Link></div></Layout>;

  const prov1 = getProviderBySlug(comp.provider1);
  const prov2 = getProviderBySlug(comp.provider2);
  const faqItems = comp.faq || [];

  const faqLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : undefined;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${BASE}/comparisons` },
      { "@type": "ListItem", position: 3, name: comp.title, item: `${BASE}/compare/${comp.slug}` },
    ],
  };

  return (
    <Layout>
      <SEOHead title={comp.metaTitle} description={comp.metaDesc} canonical={`${BASE}/compare/${comp.slug}`} jsonLd={[faqLd, {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://topvpnr.com/"},{"@type":"ListItem","position":2,"name":"Comparisons","item":"https://topvpnr.com/comparisons"}]}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> &gt; <span>Comparisons</span> &gt; <span className="text-foreground">{comp.title}</span></nav>
          <p className="text-sm text-muted-foreground">Comparison Guide • Updated April 2026</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{comp.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{comp.intro}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-center font-semibold">{comp.provider1.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</th>
              <th className="px-4 py-3 text-center font-semibold">{comp.provider2.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</th>
            </tr></thead>
            <tbody>
              {comp.categories.map((cat) => (
                <tr key={cat.name} className="border-b border-border">
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 font-bold ${cat.p1Score >= cat.p2Score ? "score-gold" : "text-muted-foreground"}`}><Star className="h-3 w-3 fill-current" />{cat.p1Score}/10</span>
                    <p className="mt-1 text-xs text-muted-foreground">{cat.p1Note}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 font-bold ${cat.p2Score >= cat.p1Score ? "score-gold" : "text-muted-foreground"}`}><Star className="h-3 w-3 fill-current" />{cat.p2Score}/10</span>
                    <p className="mt-1 text-xs text-muted-foreground">{cat.p2Note}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Extended analysis */}
        {comp.extendedAnalysis && (
          <div className="mt-8 max-w-3xl space-y-4">
            <h2 className="font-display text-xl font-bold">In-Depth Analysis</h2>
            <p className="text-muted-foreground leading-relaxed">{comp.extendedAnalysis}</p>
          </div>
        )}

        {/* Use case breakdown */}
        {comp.useCaseBreakdown && comp.useCaseBreakdown.length > 0 && (
          <div className="mt-8 max-w-3xl">
            <h2 className="font-display text-xl font-bold mb-4">Use Case Breakdown</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {comp.useCaseBreakdown.map((uc, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-sm">{uc.useCase}</h3>
                  <p className="mt-1 text-xs text-primary font-medium">Winner: {uc.winner}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{uc.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="mb-2 font-display text-xl font-bold">Verdict: {comp.winner}</h2>
          <p className="text-muted-foreground">{comp.verdict}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {prov1 && <a href={prov1.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Visit {prov1.name} <ExternalLink className="h-3.5 w-3.5" /></a>}
            {prov2 && <a href={prov2.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10">Visit {prov2.name} <ExternalLink className="h-3.5 w-3.5" /></a>}
          </div>
        </div>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <div className="mt-8 max-w-3xl">
            <h2 className="font-display text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-sm">{item.q}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.a}</p>
                  {item.providerSlug && (
                    <Link to={`/review/${item.providerSlug}`} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      Read {item.providerName || "review"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <InternalLinks title="Related Comparisons & Reviews" links={[
          { label: "Best Residential Proxies 2026", path: "/best/best-residential-proxies" },
          { label: "Best Datacenter Proxies 2026", path: "/best/best-datacenter-proxies" },
          { label: "What is a Proxy Server?", path: "/learn/what-is-proxy-server" },
          { label: "Proxy vs VPN Guide", path: "/learn/proxy-vs-vpn" },
          { label: "How to Choose the Right Proxy", path: "/how-to/how-to-choose-right-proxy" },
        ]} />
      </div>
    </Layout>
  );
}
