import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { bestOfPages } from "@/data/bestOf";
import { comparisons } from "@/data/comparisons";

export default function NotFound() {
  return (
    <Layout>
      <SEOHead title="Page Not Found | TPR – Top Proxy Reviews" description="The page you're looking for doesn't exist. Browse our proxy reviews, comparisons, and guides." />
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold">404 – Page Not Found</h1>
        <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Go Home</Link>
          <Link to="/reviews" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">All Reviews</Link>
          <Link to="/best" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">Best Picks</Link>
          <Link to="/guides" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">Guides</Link>
        </div>
        <div className="mt-12 mx-auto max-w-2xl text-left">
          <h2 className="font-display text-lg font-bold mb-4">Popular Pages</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {bestOfPages.slice(0, 4).map(b => (
              <Link key={b.slug} to={`/best/${b.slug}`} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary">→ {b.title}</Link>
            ))}
            {comparisons.slice(0, 4).map(c => (
              <Link key={c.slug} to={`/compare/${c.slug}`} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary">→ {c.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
