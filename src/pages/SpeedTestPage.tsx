import { useParams, Link } from "react-router-dom";
import { Zap, Clock, Gauge, CheckCircle, ArrowRight, ExternalLink, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { getSpeedTestBySlug, speedTests } from "@/data/speedTests";
import { getProviderBySlug } from "@/data/providers";

const BASE = "https://topvpnr.com";

export default function SpeedTestPage() {
  const { slug } = useParams<{ slug: string }>();
  const test = getSpeedTestBySlug(slug || "");
  const provider = getProviderBySlug(slug || "");

  if (!test || !provider) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Speed test not found</h1>
          <Link to="/speed-tests" className="mt-4 inline-block text-primary hover:underline">← All Speed Tests</Link>
        </div>
      </Layout>
    );
  }

  const rank = [...speedTests].sort((a, b) => a.latency.avg - b.latency.avg).findIndex((s) => s.slug === slug) + 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${test.provider} Speed Test Results 2026`,
    author: { "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE },
    datePublished: test.testDate,
    dateModified: test.testDate,
    description: `Independent speed test results for ${test.provider}. Average latency: ${test.latency.avg}ms, download: ${test.download.avg} Mbps, success rate: ${test.successRate}%.`,
  };

  const latencyColor = test.latency.avg < 60 ? "text-green-500" : test.latency.avg < 150 ? "score-gold" : "text-red-500";
  const successColor = test.successRate >= 99 ? "text-green-500" : test.successRate >= 97 ? "score-gold" : "text-red-500";

  return (
    <Layout>
      <SEOHead
        title={`${test.provider} Speed Test 2026 – Latency ${test.latency.avg}ms | TPR`}
        description={`${test.provider} proxy speed test results: ${test.latency.avg}ms latency, ${test.download.avg} Mbps download, ${test.successRate}% success rate. Independent benchmark data from ${test.testDate}.`}
        canonical={`${BASE}/speed-test/${slug}`}
        jsonLd={[jsonLd, {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://topvpnr.com/"},{"@type":"ListItem","position":2,"name":"Speed Tests","item":"https://topvpnr.com/speed-tests"}]}]}
      />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> &gt; <Link to="/speed-tests" className="hover:text-primary">Speed Tests</Link> &gt; <span className="text-foreground">{test.provider}</span>
          </nav>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">#{rank} Fastest Proxy Provider</p>
              <h1 className="mt-1 font-display text-3xl font-bold">{test.provider} Speed Test Results 2026</h1>
              <p className="mt-1 text-sm text-muted-foreground">Last tested: {test.testDate} • {provider.type} Proxy</p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-lg border border-border bg-card p-3 text-center">
                <p className={`text-2xl font-bold ${latencyColor}`}>{test.latency.avg}ms</p>
                <p className="text-xs text-muted-foreground">Avg Latency</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3 text-center">
                <p className="text-2xl font-bold text-primary">{test.download.avg} Mbps</p>
                <p className="text-xs text-muted-foreground">Avg Download</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3 text-center">
                <p className={`text-2xl font-bold ${successColor}`}>{test.successRate}%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Detailed Metrics */}
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Detailed Performance Metrics</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Latency</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Average</dt><dd className={`font-bold ${latencyColor}`}>{test.latency.avg}ms</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Minimum</dt><dd className="font-medium">{test.latency.min}ms</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Maximum</dt><dd className="font-medium">{test.latency.max}ms</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">P95</dt><dd className="font-medium">{test.latency.p95}ms</dd></div>
                  </dl>
                </div>
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gauge className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Throughput</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Download Avg</dt><dd className="font-bold text-primary">{test.download.avg} Mbps</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Download Peak</dt><dd className="font-medium">{test.download.peak} Mbps</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Upload Avg</dt><dd className="font-medium">{test.upload.avg} Mbps</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Upload Peak</dt><dd className="font-medium">{test.upload.peak} Mbps</dd></div>
                  </dl>
                </div>
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Reliability</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Success Rate</dt><dd className={`font-bold ${successColor}`}>{test.successRate}%</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Connection Time</dt><dd className="font-medium">{test.connectionTime}ms</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Uptime</dt><dd className="font-medium">{provider.uptime}</dd></div>
                  </dl>
                </div>
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Overview</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="font-medium">{provider.type}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">IP Pool</dt><dd className="font-medium">{provider.ipPool}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Locations</dt><dd className="font-medium">{provider.locations}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Speed Rank</dt><dd className="font-bold text-primary">#{rank}/20</dd></div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Location Performance */}
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Performance by Location</h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left font-semibold"><Globe className="inline h-3.5 w-3.5" /> Location</th>
                      <th className="px-4 py-3 text-center font-semibold">Latency</th>
                      <th className="px-4 py-3 text-center font-semibold">Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {test.locations.map((loc) => (
                      <tr key={loc.city} className="border-b border-border">
                        <td className="px-4 py-3 font-medium">{loc.city}, {loc.country}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-medium ${loc.latency < 50 ? "text-green-500" : loc.latency < 120 ? "score-gold" : "text-red-500"}`}>
                            {loc.latency}ms
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-medium">{loc.speed} Mbps</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verdict */}
            <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
              <h2 className="mb-2 font-display text-xl font-bold">Speed Test Verdict — {test.provider}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {test.provider} {test.latency.avg < 60 ? "delivers excellent speeds" : test.latency.avg < 150 ? "offers solid performance" : "shows moderate speeds typical for " + provider.type.toLowerCase() + " proxies"} with an average latency of {test.latency.avg}ms and {test.download.avg} Mbps download throughput. With a {test.successRate}% success rate across 1,000+ test requests, {test.provider} {test.successRate >= 99 ? "is among the most reliable" : test.successRate >= 97 ? "performs reliably" : "is acceptable"} for {provider.type.toLowerCase()} proxy workloads.
              </p>
              <div className="mt-4 flex gap-3">
                <Link to={`/review/${slug}`} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Read Full Review <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
                  Visit {test.provider} <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <InternalLinks title="More Speed Tests & Reviews" links={[
              { label: "All Speed Tests", path: "/speed-tests" },
              ...speedTests.filter(s => s.slug !== slug).slice(0, 5).map(s => ({ label: `${s.provider} Speed Test`, path: `/speed-test/${s.slug}` })),
              { label: "Best Residential Proxies 2026", path: "/best/best-residential-proxies" },
            ]} />
          </div>

          <aside>
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-sm">Top 5 Fastest Proxies</h3>
                <div className="space-y-2">
                  {[...speedTests].sort((a, b) => a.latency.avg - b.latency.avg).slice(0, 5).map((s, i) => (
                    <Link key={s.slug} to={`/speed-test/${s.slug}`} className={`flex items-center justify-between text-sm ${s.slug === slug ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}>
                      <span>#{i + 1} {s.provider}</span>
                      <span className="font-medium">{s.latency.avg}ms</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-sm">Test Methodology</h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• 1,000+ requests per provider</li>
                  <li>• 5 test locations worldwide</li>
                  <li>• HTTP + HTTPS protocols</li>
                  <li>• Multi-threaded throughput</li>
                  <li>• Updated monthly</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
