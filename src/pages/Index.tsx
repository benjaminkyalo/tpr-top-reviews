import { Link } from "react-router-dom";
import { Star, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { providers } from "@/data/providers";
import heroBg from "@/assets/hero-bg.jpg";

export default function Index() {
  return (
    <Layout>
      <section className="relative overflow-hidden py-20 md:py-32">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" width={1920} height={800} />
        <div className="bg-gradient-hero absolute inset-0" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Best Proxy & VPN Services 2026
            <br />
            <span className="text-primary">Top 20 Expert Rankings</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Independent, expert-tested reviews of the world's leading proxy and VPN providers. Updated April 2026.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 font-display text-2xl font-bold">Top 20 Proxy Providers — April 2026</h2>
        <p className="mb-2 text-xs text-muted-foreground italic">Affiliate Disclosure: We may earn commissions from links on this page.</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Provider</th>
                <th className="hidden px-4 py-3 text-left font-semibold sm:table-cell">Type</th>
                <th className="px-4 py-3 text-center font-semibold">Score</th>
                <th className="px-4 py-3 text-right font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p, i) => (
                <tr key={p.slug} className={`border-b border-border transition-colors hover:bg-muted/30 ${i === 0 ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-3 font-bold text-muted-foreground">{p.rank}</td>
                  <td className="px-4 py-3">
                    <Link to={`/review/${p.slug}`} className="font-semibold text-foreground hover:text-primary">
                      {p.name}
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${p.type === "Residential" ? "badge-residential" : "badge-datacenter"}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 font-bold score-gold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {p.score.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href="#" className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
