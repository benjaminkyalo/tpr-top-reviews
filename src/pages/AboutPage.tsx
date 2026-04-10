import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const BASE = "https://topvpnr.com";

export default function AboutPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "About TPR", item: `${BASE}/about` },
    ],
  };

  return (
    <Layout>
      <SEOHead
        title="About TPR – Independent Proxy & VPN Review Experts | Top Proxy Reviews"
        description="Learn about Top Proxy Reviews (TPR) — the world's most trusted independent proxy and VPN review platform. Our expert methodology, editorial independence, and 30-day testing process."
        canonical={`${BASE}/about`}
        jsonLd={breadcrumbLd}
      />
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground"><a href="/" className="hover:text-primary">Home</a> &gt; <span className="text-foreground">About TPR</span></nav>
          <h1 className="font-display text-3xl font-bold md:text-4xl">About TPR – Top Proxy Reviews</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Independent proxy and VPN reviews you can trust.</p>
        </div>
      </section>
      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>Top Proxy Reviews (TPR) is an independent review platform dedicated to helping individuals and businesses find the best proxy and VPN services. Our team of experts tests every service we review, providing honest, unbiased assessments based on real-world performance data.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Our Methodology</h2>
        <p>We evaluate proxy providers across multiple criteria including speed, reliability, IP pool size, geo-targeting capabilities, customer support, pricing, and ease of use. Each provider is tested over a minimum of 30 days before we publish our review.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Editorial Independence</h2>
        <p>While we may earn affiliate commissions from some links on our site, this never influences our rankings or reviews. Our editorial team operates independently from our business team, and no provider can pay for a higher ranking.</p>
        <h2 className="font-display text-xl font-bold text-foreground">Contact Us</h2>
        <p>Have questions or feedback? Reach out to our team at contact@topvpnr.com. We'd love to hear from you.</p>
      </div>
    </Layout>
  );
}
