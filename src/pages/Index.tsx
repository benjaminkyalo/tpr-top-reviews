import { Link } from "react-router-dom";
import { Star, ExternalLink, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { providers } from "@/data/providers";

const BASE = "https://topvpnr.com";
const HERO_BG = "https://res.cloudinary.com/dkcqakosa/image/upload/v1775563386/199fd29184c6cff24e3445f849af463e_2_1_ycuszl.png";

const providerLink = (name: string, slug: string) => (
  <Link to={`/review/${slug}`} className="font-semibold text-primary hover:underline">{name}</Link>
);

export default function Index() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TPR - Top Proxy Reviews",
    url: BASE,
    description: "Independent expert-tested reviews and rankings of the world's best proxy and VPN providers. Updated April 2026.",
    inLanguage: ["en", "es", "fr", "de", "pt", "zh", "ja", "ko", "ar", "hi", "ru"],
    potentialAction: { "@type": "SearchAction", target: `${BASE}/search?q={search_term_string}`, "query-input": "required name=search_term_string" },
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 20 Best Proxy Providers 2026",
    description: "Expert-ranked list of the best proxy and VPN services in 2026.",
    numberOfItems: 20,
    itemListElement: providers.map((p) => ({ "@type": "ListItem", position: p.rank, name: p.name, url: `${BASE}/review/${p.slug}` })),
  };

  const faqItems = [
    { q: "What is the best proxy provider in 2026?", a: "Based on our extensive testing, Webshare is the best overall proxy provider for datacenter proxies with a score of 9.80/10, while IPRoyal leads for residential proxies at 9.70/10. For enterprise use, Bright Data and Oxylabs are the top premium choices.", provider: "webshare", providerName: "Webshare" },
    { q: "Are proxies legal to use?", a: "Yes, using proxy servers is legal in most countries. Proxies are legitimate tools used by businesses for web scraping, market research, ad verification, and privacy protection. Providers like Bright Data maintain strict compliance programs.", provider: "bright-data", providerName: "Bright Data" },
    { q: "What's the difference between a proxy and a VPN?", a: "Proxies mask your IP for specific applications and are ideal for web scraping, data collection, and managing multiple accounts. VPNs encrypt all device traffic. Many professionals use both — for example, Smartproxy offers both proxy and VPN solutions.", provider: "smartproxy", providerName: "Smartproxy" },
    { q: "How much do proxies cost in 2026?", a: "Datacenter proxies start from $0.50/IP/month at Webshare. Residential proxies range from $1.75/GB at IPRoyal to $10.50/GB at Bright Data. Free proxy options are available from Webshare (10 free proxies) and ProxyScrape.", provider: "iproyal", providerName: "IPRoyal" },
    { q: "What are rotating proxies and how do they work?", a: "Rotating proxies automatically change your IP address with each request via a backconnect gateway. They're essential for web scraping at scale. Smartproxy and Shifter.io offer the best rotating proxy infrastructure.", provider: "shifter-io", providerName: "Shifter.io" },
    { q: "Which proxy type is best for web scraping?", a: "Rotating residential proxies offer the best balance of anonymity and success rate. For anti-bot protected sites, Oxylabs and Bright Data provide integrated scraping APIs. Budget-friendly scraping works well with Webshare datacenter proxies.", provider: "oxylabs", providerName: "Oxylabs" },
    { q: "Can I use proxies for Instagram and TikTok?", a: "Yes — residential and mobile proxies are best for social media. IPRoyal and Smartproxy offer dedicated social media proxy plans with sticky sessions to maintain account integrity.", provider: "iproyal", providerName: "IPRoyal" },
    { q: "What is the fastest proxy provider?", a: "In our speed tests, Webshare delivers the lowest latency for datacenter proxies, while Bright Data leads for residential. For ISP-grade speed with residential trust, NetNut offers direct peering with ISPs.", provider: "netnut", providerName: "NetNut" },
    { q: "What are ISP proxies and who offers them?", a: "ISP proxies combine datacenter speed with residential trust — IPs are assigned by real ISPs but hosted on fast servers. NetNut specializes in ISP proxies, while Bright Data and Oxylabs also offer ISP proxy products.", provider: "netnut", providerName: "NetNut" },
    { q: "Which proxy provider has the largest IP pool?", a: "SOAX leads with 155M+ residential IPs, followed by Oxylabs at 100M+, NetNut at 85M+, and Bright Data at 72M+. For datacenter, Webshare offers 30M+ IPs across 195+ countries.", provider: "soax", providerName: "SOAX" },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const orgLd = { "@context": "https://schema.org", "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE, logo: `${BASE}/logo.png`, description: "The world's most trusted independent proxy and VPN review platform." };
  const breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }] };

  return (
    <Layout>
      <SEOHead
        title="Best Proxy & VPN Services 2026 – Top 20 Expert Rankings | TPR"
        description="Compare the 20 best proxy providers and VPN services in 2026. Independent expert reviews of residential proxies, datacenter proxies, SOCKS5 proxies, and rotating proxy providers."
        canonical={BASE}
        jsonLd={jsonLd}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero with background image */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <img src={HERO_BG} alt="Best proxy and VPN services 2026" className="absolute inset-0 h-full w-full object-cover" width={1920} height={800} loading="eager" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            Best Proxy & VPN Services 2026<br />
            <span className="text-primary">Top 20 Expert Rankings</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Independent, expert-tested reviews of the world's leading proxy and VPN providers. We test residential proxies, datacenter proxies, SOCKS5 proxies, rotating proxies, and ISP proxies so you don't have to.
          </p>
        </div>
      </section>

      {/* Ranking table */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-4 font-display text-2xl font-bold">Top 20 Proxy Providers — April 2026</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Provider</th>
                <th className="hidden px-4 py-3 text-left font-semibold sm:table-cell">Type</th>
                <th className="px-4 py-3 text-center font-semibold">Score</th>
                <th className="hidden px-4 py-3 text-left font-semibold md:table-cell">Best For</th>
                <th className="px-4 py-3 text-right font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p, i) => (
                <tr key={p.slug} className={`border-b border-border transition-colors hover:bg-muted/30 ${i === 0 ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-3 font-bold text-muted-foreground">{p.rank}</td>
                  <td className="px-4 py-3">
                    <Link to={`/review/${p.slug}`} className="font-semibold text-foreground hover:text-primary">{p.name}</Link>
                    <p className="text-xs text-muted-foreground mt-0.5">From {p.priceFrom}</p>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${p.type === "Residential" ? "badge-residential" : "badge-datacenter"}`}>{p.type}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 font-bold score-gold"><Star className="h-3.5 w-3.5 fill-current" />{p.score.toFixed(2)}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">{p.bestFor}</td>
                  <td className="px-4 py-3 text-right">
                    <a href="#" className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Visit <ExternalLink className="h-3 w-3" /></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep SEO content */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">How We Test & Rank Proxy Providers</h2>
            <p className="text-muted-foreground leading-relaxed">Our expert team follows a rigorous testing methodology. We evaluate each service across eight core categories: <strong>connection speed and latency</strong>, <strong>IP pool size and diversity</strong>, <strong>geo-targeting accuracy</strong>, <strong>uptime and reliability</strong>, <strong>pricing and value</strong>, <strong>customer support quality</strong>, <strong>ease of use</strong>, and <strong>protocol support</strong> (HTTP, HTTPS, SOCKS5). Providers like {providerLink("Bright Data", "bright-data")} and {providerLink("Oxylabs", "oxylabs")} consistently score highest for enterprise features, while {providerLink("Webshare", "webshare")} and {providerLink("Proxy-Cheap", "proxy-cheap")} lead on value.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">What is a Proxy Server & Why Do You Need One?</h2>
            <p className="text-muted-foreground leading-relaxed">A proxy server is an intermediary that sits between your device and the internet. Proxies are essential for web scraping, price monitoring, ad verification, brand protection, SEO research, and social media management. Leading providers like {providerLink("Smartproxy", "smartproxy")} (55M+ IPs) and {providerLink("IPRoyal", "iproyal")} (32M+ IPs) enable global coverage. In 2026, proxy technology includes residential, datacenter, ISP, mobile (4G/5G from providers like {providerLink("NetNut", "netnut")}), and rotating proxies.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Residential Proxies vs Datacenter Proxies in 2026</h2>
            <p className="text-muted-foreground leading-relaxed"><strong>Residential proxies</strong> use real ISP-assigned IPs — nearly impossible to detect. Top providers: {providerLink("IPRoyal", "iproyal")} (32M+), {providerLink("Bright Data", "bright-data")} (72M+), {providerLink("Oxylabs", "oxylabs")} (100M+), {providerLink("Smartproxy", "smartproxy")} (55M+). <strong>Datacenter proxies</strong> are faster and cheaper. Leaders: {providerLink("Webshare", "webshare")}, {providerLink("ProxyScrape", "proxyscrape")}, {providerLink("Proxy-Seller", "proxy-seller")}, {providerLink("Rayobyte", "rayobyte")}.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">SOCKS5 Proxies & Protocol Deep Dive</h2>
            <p className="text-muted-foreground leading-relaxed">SOCKS5 proxies support any traffic type — HTTP, HTTPS, FTP, SMTP, and UDP — making them the most versatile protocol. Providers like {providerLink("IPRoyal", "iproyal")}, {providerLink("Bright Data", "bright-data")}, and {providerLink("Proxy-Seller", "proxy-seller")} offer full SOCKS5 support. For developers, libraries like <code>PySocks</code> and <code>aiohttp-socks</code> make integration straightforward.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Mobile Proxies & 4G/5G Proxy Networks</h2>
            <p className="text-muted-foreground leading-relaxed">Mobile proxies route traffic through real cellular networks, achieving the highest trust scores. {providerLink("Bright Data", "bright-data")} offers 7M+ mobile IPs. {providerLink("Oxylabs", "oxylabs")} provides 20M+ mobile IPs with ASN-level targeting. {providerLink("Soax", "soax")} and {providerLink("NetNut", "netnut")} offer competitive pricing from $2.50/GB. Essential for Instagram, TikTok, and Facebook management.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Best Proxy Use Cases in 2026</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Web Scraping & Data Mining", desc: `Extract data at scale. ${providers[2].name} and ${providers[3].name} offer the best anti-detection.`, link: "/best/best-proxies-scraping" },
                { title: "SEO Monitoring & Rank Tracking", desc: `Track rankings across locations. ${providers[0].name} provides the fastest SEO proxy connections.`, link: "/best/best-proxies-seo" },
                { title: "Social Media Management", desc: `Manage multiple accounts safely. ${providers[1].name} residential IPs prevent bans on Instagram and TikTok.`, link: "/best/best-proxies-instagram" },
                { title: "Ad Verification & Brand Protection", desc: `Verify ads and detect fraud globally using ${providers[3].name} and ${providers[2].name}.`, link: "/compare/bright-data-vs-oxylabs" },
                { title: "Price Comparison & E-Commerce", desc: `Monitor competitor pricing worldwide. ${providers[4].name} offers easy e-commerce monitoring setup.`, link: "/best/best-residential-proxies" },
                { title: "Anonymous Browsing & Privacy", desc: `Browse with undetectable residential IPs from ${providers[5].name} and ${providers[1].name}.`, link: "/learn/proxy-vs-vpn" },
              ].map((item) => (
                <Link key={item.title} to={item.link} className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30">
                  <h3 className="font-semibold text-sm group-hover:text-primary">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">Learn more <ArrowRight className="h-3 w-3" /></span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Proxy Pricing Guide — What Should You Pay in 2026?</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left font-semibold">Proxy Type</th>
                  <th className="px-4 py-2 text-left font-semibold">Price Range</th>
                  <th className="px-4 py-2 text-left font-semibold">Top Providers</th>
                </tr></thead>
                <tbody>
                  <tr className="border-b border-border"><td className="px-4 py-2">Residential (per GB)</td><td className="px-4 py-2 text-muted-foreground">$1.00 – $10.50/GB</td><td className="px-4 py-2">{providerLink("IPRoyal", "iproyal")}, {providerLink("Smartproxy", "smartproxy")}, {providerLink("Bright Data", "bright-data")}</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">Datacenter (per IP/mo)</td><td className="px-4 py-2 text-muted-foreground">$0.50 – $3.00/IP</td><td className="px-4 py-2">{providerLink("Webshare", "webshare")}, {providerLink("Proxy-Seller", "proxy-seller")}, {providerLink("ProxyScrape", "proxyscrape")}</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">Mobile (per GB)</td><td className="px-4 py-2 text-muted-foreground">$2.50 – $20.00/GB</td><td className="px-4 py-2">{providerLink("Bright Data", "bright-data")}, {providerLink("Oxylabs", "oxylabs")}, {providerLink("Soax", "soax")}</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">ISP Proxies (per IP/mo)</td><td className="px-4 py-2 text-muted-foreground">$2.00 – $5.00/IP</td><td className="px-4 py-2">{providerLink("NetNut", "netnut")}, {providerLink("Bright Data", "bright-data")}</td></tr>
                  <tr><td className="px-4 py-2">Free Proxies</td><td className="px-4 py-2 text-muted-foreground">$0 (limited)</td><td className="px-4 py-2">{providerLink("Webshare", "webshare")}, {providerLink("ProxyScrape", "proxyscrape")}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Proxy Providers by Region — Global Coverage</h2>
            <p className="text-muted-foreground leading-relaxed">For <strong>North America</strong>, {providerLink("Webshare", "webshare")} and {providerLink("Bright Data", "bright-data")} offer the deepest city-level targeting. For <strong>Europe</strong>, {providerLink("Oxylabs", "oxylabs")} and {providerLink("Smartproxy", "smartproxy")} provide excellent GDPR-compliant solutions. For <strong>Asia-Pacific</strong>, {providerLink("Bright Data", "bright-data")} and {providerLink("NetNut", "netnut")} dominate. For <strong>Africa</strong>, {providerLink("IPRoyal", "iproyal")} and {providerLink("Soax", "soax")} cover Kenya, Nigeria, South Africa, and Egypt. For <strong>Latin America</strong> and <strong>Middle East</strong>, {providerLink("Oxylabs", "oxylabs")} has the widest coverage.</p>
          </div>

          {/* FAQ with clickable provider names */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Frequently Asked Questions About Proxy Services</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-sm">{item.q}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.a}</p>
                  <Link to={`/review/${item.provider}`} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    Read {item.providerName} Review <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <InternalLinks title="Explore Our Proxy Resources" links={[
          { label: "Best Residential Proxies 2026", path: "/best/best-residential-proxies" },
          { label: "Best Datacenter Proxies 2026", path: "/best/best-datacenter-proxies" },
          { label: "Best Proxies for Web Scraping", path: "/best/best-proxies-scraping" },
          { label: "Best Free Proxies 2026", path: "/best/best-free-proxies" },
          { label: "Best Proxies for Instagram", path: "/best/best-proxies-instagram" },
          { label: "Best Proxies for SEO Tools", path: "/best/best-proxies-seo" },
          { label: "Bright Data vs Oxylabs", path: "/compare/bright-data-vs-oxylabs" },
          { label: "Residential vs Datacenter Proxies", path: "/compare/residential-vs-datacenter-proxy" },
          { label: "What is a Proxy Server?", path: "/learn/what-is-proxy-server" },
          { label: "Proxy vs VPN Guide", path: "/learn/proxy-vs-vpn" },
          { label: "How to Set Up Rotating Proxies", path: "/how-to/how-to-set-up-rotating-proxies" },
          { label: "Proxy Glossary A to Z", path: "/learn/proxy-glossary" },
        ]} />
      </section>
    </Layout>
  );
}
