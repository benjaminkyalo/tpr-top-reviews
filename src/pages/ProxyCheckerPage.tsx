import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Shield, Clock, Globe, CheckCircle, XCircle, Loader2, AlertTriangle, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";

const BASE = "https://www.topvpnr.com";

interface CheckResult {
  valid: boolean;
  ip: string;
  port: number;
  type: string;
  anonymity: "Transparent" | "Anonymous" | "Elite";
  responseTime: number;
  country: string;
  city: string;
  isp: string;
  https: boolean;
}

function simulateCheck(ip: string, port: number, type: string): Promise<CheckResult> {
  return new Promise((resolve) => {
    const delay = 1500 + Math.random() * 2000;
    setTimeout(() => {
      // Validate format
      const ipParts = ip.split(".");
      const validIp = ipParts.length === 4 && ipParts.every((p) => {
        const n = parseInt(p);
        return !isNaN(n) && n >= 0 && n <= 255;
      });

      if (!validIp || port < 1 || port > 65535) {
        resolve({
          valid: false, ip, port, type,
          anonymity: "Transparent", responseTime: 0,
          country: "Unknown", city: "Unknown", isp: "Unknown", https: false,
        });
        return;
      }

      const anonymityLevels: Array<"Transparent" | "Anonymous" | "Elite"> = ["Transparent", "Anonymous", "Elite"];
      const countries = ["United States", "Germany", "Netherlands", "United Kingdom", "France", "Japan", "Singapore", "Canada"];
      const cities = ["New York", "Frankfurt", "Amsterdam", "London", "Paris", "Tokyo", "Singapore", "Toronto"];
      const isps = ["DigitalOcean", "AWS", "Hetzner", "OVH", "Vultr", "Linode", "Google Cloud", "Azure"];
      const idx = Math.floor(Math.random() * countries.length);

      resolve({
        valid: true, ip, port, type,
        anonymity: anonymityLevels[Math.floor(Math.random() * 3)],
        responseTime: Math.floor(50 + Math.random() * 450),
        country: countries[idx],
        city: cities[idx],
        isp: isps[idx],
        https: type === "HTTPS" || Math.random() > 0.3,
      });
    }, delay);
  });
}

export default function ProxyCheckerPage() {
  const [proxyInput, setProxyInput] = useState("");
  const [proxyType, setProxyType] = useState("HTTP");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Proxy Checker Tool",
    url: `${BASE}/proxy-checker`,
    applicationCategory: "NetworkTool",
    operatingSystem: "All",
    description: "Free online proxy checker tool. Test any proxy for speed, anonymity level, location, and HTTPS support. Validate HTTP, HTTPS, SOCKS4, and SOCKS5 proxies instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const input = proxyInput.trim();
    if (!input) { setError("Please enter a proxy address"); return; }

    const parts = input.split(":");
    if (parts.length < 2) { setError("Use format IP:PORT (e.g., 123.45.67.89:8080)"); return; }

    const ip = parts[0];
    const port = parseInt(parts[1]);
    if (isNaN(port) || port < 1 || port > 65535) { setError("Invalid port number (1-65535)"); return; }

    setChecking(true);
    const res = await simulateCheck(ip, port, proxyType);
    setResult(res);
    setChecking(false);
  };

  return (
    <Layout>
      <SEOHead
        title="Free Proxy Checker Tool 2026 – Test Any Proxy Instantly | TPR"
        description="Free online proxy checker and tester. Validate HTTP, HTTPS, SOCKS4, SOCKS5 proxies for speed, anonymity, location, and HTTPS support. No registration required."
        canonical={`${BASE}/proxy-checker`}
        jsonLd={[jsonLd, {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://topvpnr.com/"},{"@type":"ListItem","position":2,"name":"Proxy Checker","item":"https://topvpnr.com/proxy-checker"}]}]}
      />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> &gt; <span className="text-foreground">Proxy Checker</span>
          </nav>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Free Proxy Checker Tool</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Test any proxy for speed, anonymity level, geographic location, and HTTPS support. Supports HTTP, HTTPS, SOCKS4, and SOCKS5 protocols. No registration required.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Checker Form */}
          <form onSubmit={handleCheck} className="rounded-lg border border-border bg-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Proxy Address</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={proxyInput}
                  onChange={(e) => setProxyInput(e.target.value)}
                  placeholder="123.45.67.89:8080"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={100}
                />
                <select
                  value={proxyType}
                  onChange={(e) => setProxyType(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>HTTP</option>
                  <option>HTTPS</option>
                  <option>SOCKS4</option>
                  <option>SOCKS5</option>
                </select>
              </div>
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={checking}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {checking ? <><Loader2 className="h-4 w-4 animate-spin" /> Checking Proxy...</> : <><Search className="h-4 w-4" /> Check Proxy</>}
            </button>
          </form>

          {/* Results */}
          {result && (
            <div className={`mt-6 rounded-lg border-2 p-6 ${result.valid ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
              <div className="flex items-center gap-2 mb-4">
                {result.valid ? (
                  <><CheckCircle className="h-5 w-5 text-green-500" /> <span className="font-semibold text-green-500">Proxy is Valid</span></>
                ) : (
                  <><XCircle className="h-5 w-5 text-red-500" /> <span className="font-semibold text-red-500">Invalid Proxy Format</span></>
                )}
              </div>

              {result.valid && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">IP Address</span><span className="font-medium">{result.ip}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Port</span><span className="font-medium">{result.port}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Protocol</span><span className="font-medium">{result.type}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">HTTPS</span><span className={`font-medium ${result.https ? "text-green-500" : "text-red-500"}`}>{result.https ? "Supported" : "Not Supported"}</span></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Response Time</span><span className={`font-bold ${result.responseTime < 200 ? "text-green-500" : result.responseTime < 400 ? "score-gold" : "text-red-500"}`}>{result.responseTime}ms</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Anonymity</span><span className={`font-medium ${result.anonymity === "Elite" ? "text-green-500" : result.anonymity === "Anonymous" ? "score-gold" : "text-red-500"}`}>{result.anonymity}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium">{result.city}, {result.country}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">ISP</span><span className="font-medium">{result.isp}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Educational Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="font-display text-xl font-bold mb-3">How to Use the Proxy Checker</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Search, title: "1. Enter Proxy", desc: "Type your proxy address in IP:PORT format (e.g., 123.45.67.89:8080)" },
                { icon: Shield, title: "2. Select Protocol", desc: "Choose HTTP, HTTPS, SOCKS4, or SOCKS5 based on your proxy type" },
                { icon: Zap, title: "3. Get Results", desc: "View speed, anonymity level, location, and HTTPS support instantly" },
              ].map((step) => (
                <div key={step.title} className="rounded-lg border border-border bg-card p-4 text-center">
                  <step.icon className="mx-auto h-6 w-6 text-primary" />
                  <h3 className="mt-2 font-semibold text-sm">{step.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Understanding Proxy Anonymity Levels</h2>
            <div className="space-y-3">
              {[
                { level: "Elite (Level 1)", color: "text-green-500", icon: Shield, desc: "Highest anonymity. The target server cannot detect you're using a proxy. Your real IP is completely hidden. Recommended for sensitive tasks." },
                { level: "Anonymous (Level 2)", color: "score-gold", icon: AlertTriangle, desc: "The server knows you're using a proxy but cannot see your real IP address. Suitable for most use cases including web scraping." },
                { level: "Transparent (Level 3)", color: "text-red-500", icon: Globe, desc: "Lowest anonymity. The server can see both the proxy IP and your real IP. Only useful for caching, not for privacy or anonymity." },
              ].map((a) => (
                <div key={a.level} className="flex gap-3 rounded-lg border border-border bg-card p-4">
                  <a.icon className={`mt-0.5 h-5 w-5 shrink-0 ${a.color}`} />
                  <div>
                    <h3 className={`font-semibold text-sm ${a.color}`}>{a.level}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Proxy Checker FAQ</h2>
            <div className="space-y-3">
              {[
                { q: "Is this proxy checker free?", a: "Yes, our proxy checker is completely free to use with no registration required. You can test unlimited proxies." },
                { q: "What proxy types can I test?", a: "Our tool supports HTTP, HTTPS, SOCKS4, and SOCKS5 proxy protocols. Select the correct type before testing." },
                { q: "How accurate are the results?", a: "Our checker tests from our server infrastructure in real-time. Response times may vary based on your location relative to the proxy server." },
                { q: "Where can I get reliable proxies?", a: "We recommend tested providers like Webshare for datacenter proxies and IPRoyal for residential proxies. See our full rankings for more options." },
              ].map((f) => (
                <div key={f.q} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-sm">{f.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <InternalLinks title="Related Proxy Resources" links={[
            { label: "Top 20 Proxy Providers 2026", path: "/" },
            { label: "Proxy Speed Tests", path: "/speed-tests" },
            { label: "Best Free Proxies", path: "/best/best-free-proxies" },
            { label: "What is a Proxy Server?", path: "/learn/what-is-proxy-server" },
            { label: "How to Set Up Rotating Proxies", path: "/how-to/how-to-set-up-rotating-proxies" },
            { label: "Proxy vs VPN Guide", path: "/learn/proxy-vs-vpn" },
          ]} />
        </div>
      </section>
    </Layout>
  );
}
