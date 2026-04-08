import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-primary">TPR</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Top Proxy Reviews</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">Independent proxy and VPN reviews since 2024. We test every service we recommend.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Reviews</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/review/webshare" className="hover:text-foreground">Webshare Review</Link>
              <Link to="/review/iproyal" className="hover:text-foreground">IPRoyal Review</Link>
              <Link to="/review/bright-data" className="hover:text-foreground">Bright Data Review</Link>
              <Link to="/review/oxylabs" className="hover:text-foreground">Oxylabs Review</Link>
              <Link to="/review/smartproxy" className="hover:text-foreground">Smartproxy Review</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/best/best-residential-proxies" className="hover:text-foreground">Best Residential Proxies</Link>
              <Link to="/best/best-datacenter-proxies" className="hover:text-foreground">Best Datacenter Proxies</Link>
              <Link to="/learn/what-is-proxy-server" className="hover:text-foreground">What is a Proxy?</Link>
              <Link to="/learn/proxy-vs-vpn" className="hover:text-foreground">Proxy vs VPN</Link>
              <Link to="/learn/proxy-glossary" className="hover:text-foreground">Proxy Glossary</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">About Us</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TPR — Top Proxy Reviews. All rights reserved. Last updated April 2026.
        </div>
      </div>
    </footer>
  );
}
