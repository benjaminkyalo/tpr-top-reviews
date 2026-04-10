import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { getHowToBySlug } from "@/data/howTo";

const BASE = "https://topvpnr.com";

export default function HowToPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getHowToBySlug(slug || "");
  if (!page) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Page not found</h1><Link to="/" className="mt-4 inline-block text-primary">← Home</Link></div></Layout>;

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.title,
    description: page.metaDesc,
    step: page.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.content })),
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
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "How-To Guides", item: `${BASE}/guides` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${BASE}/how-to/${page.slug}` },
    ],
  };

  return (
    <Layout>
      <SEOHead title={page.metaTitle} description={page.metaDesc} canonical={`${BASE}/how-to/${page.slug}`} jsonLd={howToLd} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> &gt; <span>How-To Guides</span> &gt; <span className="text-foreground">{page.title}</span></nav>
          <p className="text-sm text-muted-foreground">How-To Guide • Updated April 2026</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{page.intro}</p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-8">
        {page.steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">{i + 1}</div>
            <div>
              <h2 className="font-display text-lg font-bold">{step.title}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{step.content}</p>
            </div>
          </div>
        ))}

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-3 font-display text-xl font-bold">Pro Tips</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">{page.tips.map((t, i) => <li key={i}>💡 {t}</li>)}</ul>
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

        <InternalLinks title="Related Guides" links={[
          { label: "How to Set Up Rotating Proxies", path: "/how-to/how-to-set-up-rotating-proxies" },
          { label: "How to Use Proxy with Python", path: "/how-to/how-to-use-proxy-with-python" },
          { label: "Best Proxies for Web Scraping", path: "/best/best-proxies-scraping" },
          { label: "What is a Proxy Server?", path: "/learn/what-is-proxy-server" },
          { label: "Proxy Glossary A to Z", path: "/learn/proxy-glossary" },
        ]} />
      </div>
    </Layout>
  );
}
