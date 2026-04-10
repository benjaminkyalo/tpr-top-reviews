import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const BASE = "https://topvpnr.com";

export default function TermsPage() {
  return (
    <Layout>
      <SEOHead title="Terms of Service | TPR – Top Proxy Reviews" description="Terms of service for TPR — Top Proxy Reviews. Read our terms and conditions for using topvpnr.com." canonical={`${BASE}/terms`} />
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>
        </div>
      </section>
      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="font-display text-xl font-bold text-foreground">Acceptance of Terms</h2>
        <p>By accessing and using topvpnr.com ("TPR"), you accept and agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the site.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Content & Reviews</h2>
        <p>All reviews, rankings, and content on TPR are based on independent testing and expert opinion. While we strive for accuracy, we make no warranties regarding the completeness or reliability of information. Proxy and VPN services may change their offerings at any time.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Affiliate Links</h2>
        <p>TPR participates in affiliate programs. Links to third-party services may generate commissions. This does not affect the price you pay or the independence of our editorial content.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Intellectual Property</h2>
        <p>All content, logos, and design elements on TPR are protected by copyright. You may not reproduce, distribute, or create derivative works without prior written permission.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Limitation of Liability</h2>
        <p>TPR is not liable for any damages arising from the use of our site or the services we review. Users are responsible for evaluating and selecting proxy/VPN services based on their own needs.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of any changes.</p>
      </div>
    </Layout>
  );
}
