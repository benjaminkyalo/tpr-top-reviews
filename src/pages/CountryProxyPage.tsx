import { useParams, Link } from "react-router-dom";
import { Globe, ArrowRight, ExternalLink, Star, Check } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { getCountryPageBySlug, countryProxyPages } from "@/data/countries";
import { getProviderBySlug } from "@/data/providers";

const BASE = "https://topvpnr.com";

export default function CountryProxyPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getCountryPageBySlug(slug || "");

  if (!page) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <Link to="/proxies-by-country" className="mt-4 inline-block text-primary hover:underline">← Browse All Countries</Link>
        </div>
      </Layout>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.metaTitle,
    author: { "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE },
    datePublished: "2026-04-01",
    dateModified: "2026-04-10",
    description: page.metaDesc,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${page.proxyType} Proxies for ${page.country} 2026`,
    itemListElement: page.topProviders.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      name: p.provider,
      url: `${BASE}/review/${p.providerSlug}`,
    })),
  };

  // Related country pages
  const relatedPages = countryProxyPages
    .filter((p) => p.slug !== slug && (p.country === page.country || p.proxyType === page.proxyType))
    .slice(0, 6);

  return (
    <Layout>
      <SEOHead
        title={page.metaTitle}
        description={page.metaDesc}
        canonical={`${BASE}/best-proxies/${slug}`}
        jsonLd={jsonLd}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> &gt; <Link to="/proxies-by-country" className="hover:text-primary">Proxies by Country</Link> &gt; <span className="text-foreground">{page.country} {page.proxyType}</span>
          </nav>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Best {page.proxyType} Proxies for {page.country} 2026</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{page.intro}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Provider Rankings */}
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Top {page.proxyType} Proxies for {page.country}</h2>
              <div className="space-y-4">
                {page.topProviders.map((p) => {
                  const providerData = getProviderBySlug(p.providerSlug);
                  return (
                    <div key={p.providerSlug} className={`rounded-lg border bg-card p-5 ${p.rank === 1 ? "border-primary/50 bg-primary/5" : "border-border"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">#{p.rank}</span>
                            <Link to={`/review/${p.providerSlug}`} className="font-semibold text-lg hover:text-primary">{p.provider}</Link>
                            <span className="flex items-center gap-1 text-sm font-bold score-gold">
                              <Star className="h-3.5 w-3.5 fill-current" /> {p.score}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{p.reason}</p>
                          {providerData && (
                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span>From {providerData.priceFrom}</span>
                              <span>•</span>
                              <span>{providerData.ipPool} IPs</span>
                              <span>•</span>
                              <span>{providerData.locations}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link to={`/review/${p.providerSlug}`} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                            Review <ArrowRight className="h-3 w-3" />
                          </Link>
                          {providerData && (
                            <a href={providerData.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                              Visit <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h2 className="mb-3 font-display text-xl font-bold">What You Can Do with {page.country} {page.proxyType} Proxies</h2>
              <ul className="space-y-2">
                {page.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" /> {uc}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold">{page.country} {page.proxyType} Proxies FAQ</h2>
              <div className="space-y-4">
                {page.faq.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-sm">{f.q}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <InternalLinks title="Explore More Proxy Guides" links={[
              { label: "All Countries", path: "/proxies-by-country" },
              ...relatedPages.map((p) => ({ label: `Best ${p.proxyType} Proxies ${p.country}`, path: `/best-proxies/${p.slug}` })),
              { label: `Best ${page.proxyType} Proxies 2026`, path: `/best/best-${page.proxyType.toLowerCase()}-proxies` },
            ]} />
          </div>

          <aside>
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-sm"><Globe className="inline h-4 w-4 text-primary" /> {page.country} Quick Facts</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Proxy Type</dt><dd className="font-medium">{page.proxyType}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Top Provider</dt><dd className="font-medium">{page.topProviders[0].provider}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Top Score</dt><dd className="font-bold score-gold">{page.topProviders[0].score}/10</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Providers Tested</dt><dd className="font-medium">{page.topProviders.length}</dd></div>
                </dl>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-sm">Other {page.country} Guides</h3>
                <div className="space-y-2">
                  {countryProxyPages.filter(p => p.country === page.country && p.slug !== slug).map(p => (
                    <Link key={p.slug} to={`/best-proxies/${p.slug}`} className="block text-sm text-muted-foreground hover:text-primary">
                      {p.proxyType} Proxies →
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
