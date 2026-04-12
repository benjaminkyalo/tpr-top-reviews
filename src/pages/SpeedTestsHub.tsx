import { Link } from "react-router-dom";
import { Zap, ArrowRight, Clock, Gauge, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { speedTests } from "@/data/speedTests";

const BASE = "https://topvpnr.com";

export default function SpeedTestsHub() {
  const sorted = [...speedTests].sort((a, b) => a.latency.avg - b.latency.avg);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Proxy Speed Test Results 2026",
    url: `${BASE}/speed-tests`,
    description: "Independent proxy speed test benchmarks for 20+ providers. Real latency, download speed, and success rate data tested April 2026.",
  };

  return (
    <Layout>
      <SEOHead
        title="Proxy Speed Test Results 2026 – Independent Benchmarks | TPR"
        description="Real proxy speed test data for 20+ providers. Compare latency, download speed, upload speed, and success rates. Independent benchmarks updated April 2026."
        canonical={`${BASE}/speed-tests`}
        jsonLd={jsonLd}
      />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> &gt; <span className="text-foreground">Speed Tests</span>
          </nav>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Proxy Speed Test Results 2026</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Independent speed benchmarks for every proxy provider we review. Real data from our testing lab — latency, throughput, success rates, and location-specific performance.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-4 font-display text-xl font-bold">All Providers — Ranked by Latency</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Provider</th>
                <th className="px-4 py-3 text-center font-semibold"><Clock className="inline h-3.5 w-3.5" /> Latency</th>
                <th className="hidden px-4 py-3 text-center font-semibold sm:table-cell"><Gauge className="inline h-3.5 w-3.5" /> Download</th>
                <th className="hidden px-4 py-3 text-center font-semibold md:table-cell"><CheckCircle className="inline h-3.5 w-3.5" /> Success</th>
                <th className="px-4 py-3 text-right font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t, i) => (
                <tr key={t.slug} className={`border-b border-border transition-colors hover:bg-muted/30 ${i === 0 ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-3 font-bold text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link to={`/speed-test/${t.slug}`} className="font-semibold text-foreground hover:text-primary">{t.provider}</Link>
                    <p className="text-xs text-muted-foreground mt-0.5">Tested {t.testDate}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${t.latency.avg < 60 ? "text-green-500" : t.latency.avg < 150 ? "score-gold" : "text-red-500"}`}>
                      {t.latency.avg}ms
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-center sm:table-cell font-medium">{t.download.avg} Mbps</td>
                  <td className="hidden px-4 py-3 text-center md:table-cell">
                    <span className={`font-medium ${t.successRate >= 99 ? "text-green-500" : t.successRate >= 97 ? "score-gold" : "text-red-500"}`}>
                      {t.successRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/speed-test/${t.slug}`} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      Details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl space-y-6">
          <h2 className="font-display text-xl font-bold">How We Test Proxy Speed</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">Our speed tests are conducted from 5 global locations (New York, London, Frankfurt, Tokyo, São Paulo) using standardized methodology. We measure average latency (ICMP + HTTP), download/upload throughput (multi-threaded), connection establishment time, and request success rate over 1,000+ requests per provider. Tests are refreshed monthly.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <Zap className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 font-semibold text-sm">1,000+ Requests</p>
              <p className="text-xs text-muted-foreground">Per provider per test</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <Clock className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 font-semibold text-sm">5 Global Locations</p>
              <p className="text-xs text-muted-foreground">Consistent testing points</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <CheckCircle className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 font-semibold text-sm">Monthly Updates</p>
              <p className="text-xs text-muted-foreground">Fresh data every month</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
