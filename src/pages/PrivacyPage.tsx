import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const BASE = "https://toptierproxy.com";

export default function PrivacyPage() {
  return (
    <Layout>
      <SEOHead title="Privacy Policy | TPR – Top Proxy Reviews" description="Privacy policy for TPR — Top Proxy Reviews. Learn how we handle your data and protect your privacy." canonical={`${BASE}/privacy`} />
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>
        </div>
      </section>
      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="font-display text-xl font-bold text-foreground">Information We Collect</h2>
        <p>We collect minimal data to improve your experience. This includes anonymized analytics data such as pages visited, time on site, and referral sources. We do not collect personally identifiable information unless you voluntarily contact us.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Cookies</h2>
        <p>We use essential cookies to ensure our website functions properly. Analytics cookies help us understand how visitors interact with our site. You can disable cookies in your browser settings at any time.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Third-Party Links</h2>
        <p>Our site contains links to third-party proxy and VPN providers. These external sites have their own privacy policies, and we are not responsible for their content or practices. We encourage you to review their policies before providing any personal information.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Affiliate Partnerships</h2>
        <p>Some links on our site are affiliate links. When you purchase a service through these links, we may earn a commission at no additional cost to you. This does not influence our reviews or rankings.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Data Security</h2>
        <p>We implement appropriate security measures to protect any information collected. Our site uses HTTPS encryption for all connections.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Contact</h2>
        <p>For privacy-related inquiries, contact us at privacy@toptierproxy.com.</p>
      </div>
    </Layout>
  );
}
