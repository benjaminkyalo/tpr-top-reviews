import { useParams, Link } from "react-router-dom";
import { Star, ExternalLink, Check, X, Gauge, Globe, Zap, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import UserReviews from "@/components/UserReviews";
import { getProviderBySlug, providers } from "@/data/providers";

const BASE = "https://topvpnr.com";

export default function ReviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const provider = getProviderBySlug(slug || "");

  if (!provider) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Provider not found</h1><Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back to rankings</Link></div></Layout>;

  const stars = Math.round(provider.score / 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${provider.name} Review 2026`,
    reviewBody: provider.overview,
    author: { "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE },
    publisher: { "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE },
    datePublished: "2026-04-01",
    dateModified: "2026-04-07",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: provider.name,
      applicationCategory: "Proxy Service",
      operatingSystem: "All",
          aggregateRating: { "@type": "AggregateRating", ratingValue: provider.score, bestRating: 10, worstRating: 0, ratingCount: 127 },
      offers: { "@type": "Offer", price: provider.priceFrom.replace(/[^0-9.]/g, ""), priceCurrency: "USD" },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: provider.score,
      bestRating: 10,
      worstRating: 0,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Is ${provider.name} worth it in 2026?`, acceptedAnswer: { "@type": "Answer", text: provider.verdict } },
      { "@type": "Question", name: `How much does ${provider.name} cost?`, acceptedAnswer: { "@type": "Answer", text: `${provider.name} pricing starts from ${provider.priceFrom}. They offer ${provider.plans.length} plans: ${provider.plans.map(p => `${p.name} (${p.price})`).join(", ")}.` } },
      { "@type": "Question", name: `Does ${provider.name} offer a free trial?`, acceptedAnswer: { "@type": "Answer", text: provider.freeTrial ? `Yes, ${provider.name} offers a free trial so you can test their ${provider.type.toLowerCase()} proxy service before committing.` : `No, ${provider.name} does not currently offer a free trial, but they provide competitive pricing starting from ${provider.priceFrom}.` } },
      { "@type": "Question", name: `What protocols does ${provider.name} support?`, acceptedAnswer: { "@type": "Answer", text: `${provider.name} supports the following protocols: ${provider.protocols.join(", ")}. This makes them suitable for HTTP web scraping, HTTPS secure browsing${provider.protocols.includes("SOCKS5") ? ", and SOCKS5 applications including P2P, gaming, and streaming" : ""}.` } },
      { "@type": "Question", name: `How many IP addresses does ${provider.name} have?`, acceptedAnswer: { "@type": "Answer", text: `${provider.name} has an IP pool of ${provider.ipPool} across ${provider.locations}. Their ${provider.type.toLowerCase()} proxy network delivers ${provider.speed.toLowerCase()} speeds with ${provider.uptime} uptime.` } },
    ],
  };

  // Related reviews
  const relatedProviders = providers.filter(p => p.slug !== slug).slice(0, 5);

  return (
    <Layout>
      <SEOHead
        title={`${provider.name} Review 2026 – Expert Score ${provider.score}/10 | TPR`}
        description={`Detailed ${provider.name} review for 2026. ${provider.type} proxy provider scored ${provider.score}/10. ${provider.bestFor}. Pricing from ${provider.priceFrom}. Honest pros, cons, performance metrics, and expert verdict.`}
        canonical={`${BASE}/review/${provider.slug}`}
        jsonLd={[jsonLd, { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://topvpnr.com/" }, { "@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://topvpnr.com/reviews" }, { "@type": "ListItem", "position": 3, "name": provider.name, "item": `https://topvpnr.com/review/${provider.slug}` }] }]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="border-b border-border bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <p className="mb-2 text-xs text-muted-foreground italic">Affiliate Disclosure: We may earn commissions from links on this page. This does not affect our rankings.</p>
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> &gt; <Link to="/" className="hover:text-primary">Reviews</Link> &gt; <span className="text-foreground">{provider.name}</span>
          </nav>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">#{provider.rank} in Top 20 Best Proxy Providers</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">{provider.name} Review 2026</h1>
              <p className="mt-2 text-muted-foreground">{provider.type} Proxy Provider • Expert-Tested • Updated April 2026</p>
              <p className="mt-1 text-sm text-muted-foreground">{provider.bestFor} • {provider.ipPool} IPs • {provider.locations} • From {provider.priceFrom}</p>
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
              <h2 className="mb-2 font-display text-xl font-bold">Quick Summary — {provider.name}</h2>
              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div><span className="text-muted-foreground">Best For:</span><br /><strong>{provider.bestFor}</strong></div>
                <div><span className="text-muted-foreground">Price From:</span><br /><strong>{provider.priceFrom}</strong></div>
                <div><span className="text-muted-foreground">Free Trial:</span><br /><strong>{provider.freeTrial ? "Yes ✓" : "No ✗"}</strong></div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 text-sm mt-3">
                <div><span className="text-muted-foreground">IP Pool:</span><br /><strong>{provider.ipPool}</strong></div>
                <div><span className="text-muted-foreground">Locations:</span><br /><strong>{provider.locations}</strong></div>
                <div><span className="text-muted-foreground">Protocols:</span><br /><strong>{provider.protocols.join(", ")}</strong></div>
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-display text-xl font-bold">What is {provider.name}? — Complete Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{provider.overview}</p>
              <p className="text-muted-foreground leading-relaxed mt-3">{provider.extendedOverview}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />{provider.name} Pros</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">{provider.pros.map((p, i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />{p}</li>)}</ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2"><X className="h-4 w-4 text-red-500" />{provider.name} Cons</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">{provider.cons.map((c, i) => <li key={i} className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />{c}</li>)}</ul>
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-display text-xl font-bold">{provider.name} Performance Metrics</h2>
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
              <h2 className="mb-3 font-display text-xl font-bold">{provider.name} Pricing Plans 2026</h2>
              <p className="mb-3 text-sm text-muted-foreground">Here is a complete breakdown of {provider.name}'s pricing plans for 2026. All prices are in USD and may vary based on billing cycle and promotions.</p>
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

            {/* FAQ Section */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold">{provider.name} FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm">Is {provider.name} worth it in 2026?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{provider.verdict}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">How much does {provider.name} cost?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Pricing starts from {provider.priceFrom}. They offer {provider.plans.length} tiers: {provider.plans.map(p => `${p.name} at ${p.price}`).join(", ")}.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Does {provider.name} support SOCKS5?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{provider.protocols.includes("SOCKS5") ? `Yes, ${provider.name} supports SOCKS5 along with ${provider.protocols.filter(p => p !== "SOCKS5").join(" and ")}.` : `No, ${provider.name} currently supports ${provider.protocols.join(" and ")} but not SOCKS5.`}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">What is {provider.name}'s IP pool size?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{provider.name} has {provider.ipPool} IP addresses across {provider.locations}, providing extensive coverage for {provider.type.toLowerCase()} proxy needs.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
              <h2 className="mb-2 font-display text-xl font-bold">Final Verdict — {provider.name} Review 2026</h2>
              <p className="text-muted-foreground leading-relaxed">{provider.verdict}</p>
              <p className="text-muted-foreground leading-relaxed mt-2">{provider.extendedVerdict}</p>
              <a href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Visit {provider.name} <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* User Reviews Section */}
            <UserReviews providerSlug={provider.slug} providerName={provider.name} />

            <InternalLinks
              title="Compare & Explore More"
              links={[
                ...relatedProviders.map(p => ({ label: `${p.name} Review`, path: `/review/${p.slug}` })),
                { label: `${provider.name} Speed Test`, path: `/speed-test/${provider.slug}` },
                { label: "All Speed Tests", path: "/speed-tests" },
                { label: "Proxy Checker Tool", path: "/proxy-checker" },
                { label: "Best Residential Proxies 2026", path: "/best/best-residential-proxies" },
                { label: "Best Datacenter Proxies 2026", path: "/best/best-datacenter-proxies" },
                { label: "Residential vs Datacenter", path: "/compare/residential-vs-datacenter-proxy" },
              ]}
            />
          </div>

          <aside className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold">{provider.name} — At a Glance</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="font-medium">{provider.type}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Score</dt><dd className="font-bold score-gold">{provider.score}/10</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Price From</dt><dd className="font-medium">{provider.priceFrom}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Free Trial</dt><dd className="font-medium">{provider.freeTrial ? "Yes" : "No"}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">IP Pool</dt><dd className="font-medium">{provider.ipPool}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Uptime</dt><dd className="font-medium">{provider.uptime}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Protocols</dt><dd className="font-medium">{provider.protocols.join(", ")}</dd></div>
                </dl>
                <a href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Visit {provider.name} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-sm">Other Top Providers</h3>
                <div className="space-y-2">
                  {relatedProviders.slice(0, 5).map(p => (
                    <Link key={p.slug} to={`/review/${p.slug}`} className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary">
                      <span>{p.name}</span>
                      <span className="font-bold score-gold">{p.score.toFixed(1)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
