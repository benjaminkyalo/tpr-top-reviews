import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const BASE = "https://topvpnr.com";

export default function ContactPage() {
  return (
    <Layout>
      <SEOHead title="Contact Us | TPR – Top Proxy Reviews" description="Get in touch with TPR — Top Proxy Reviews. Contact our team for partnerships, questions, or feedback." canonical={`${BASE}/contact`} />
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">We'd love to hear from you. Reach out for partnerships, feedback, or questions.</p>
        </div>
      </section>
      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">General Inquiries</h2>
            <p className="mt-2 text-sm text-muted-foreground">For questions about our reviews, methodology, or content.</p>
            <p className="mt-3 text-sm font-semibold text-primary">contact@topvpnr.com</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Partnerships</h2>
            <p className="mt-2 text-sm text-muted-foreground">Interested in having your service reviewed or listed?</p>
            <p className="mt-3 text-sm font-semibold text-primary">partners@topvpnr.com</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Press & Media</h2>
            <p className="mt-2 text-sm text-muted-foreground">For press inquiries, interviews, or media collaborations.</p>
            <p className="mt-3 text-sm font-semibold text-primary">press@topvpnr.com</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Report an Issue</h2>
            <p className="mt-2 text-sm text-muted-foreground">Found incorrect information or a broken link? Let us know.</p>
            <p className="mt-3 text-sm font-semibold text-primary">support@topvpnr.com</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
