import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { getComparisonBySlug } from "@/data/comparisons";

const BASE = "https://toptierproxy.com";

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comp = getComparisonBySlug(slug || "");
  if (!comp) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Comparison not found</h1><Link to="/" className="mt-4 inline-block text-primary">← Home</Link></div></Layout>;

  return (
    <Layout>
      <SEOHead title={comp.metaTitle} description={comp.metaDesc} canonical={`${BASE}/compare/${comp.slug}`} />
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
                    <span className={`inline-flex items-center gap-1 font-bold ${cat.p1Score >= cat.p2Score ? "score-gold" : "text-muted-foreground"}`}>
                      <Star className="h-3 w-3 fill-current" />{cat.p1Score}/10
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">{cat.p1Note}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 font-bold ${cat.p2Score >= cat.p1Score ? "score-gold" : "text-muted-foreground"}`}>
                      <Star className="h-3 w-3 fill-current" />{cat.p2Score}/10
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">{cat.p2Note}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="mb-2 font-display text-xl font-bold">Verdict: {comp.winner}</h2>
          <p className="text-muted-foreground">{comp.verdict}</p>
        </div>
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
