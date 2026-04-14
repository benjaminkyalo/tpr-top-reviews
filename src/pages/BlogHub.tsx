import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { blogPosts, blogCategories } from "@/data/blog";

const BASE = "https://topvpnr.com";

export default function BlogHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TPR Proxy Blog — Industry News, Guides & Analysis",
    url: `${BASE}/blog`,
    description: "Expert proxy industry analysis, tutorials, and guides. Stay ahead with the latest proxy technology trends, security tips, and provider comparisons.",
    publisher: { "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE },
  };

  const featured = blogPosts.slice(0, 3);
  const rest = blogPosts.slice(3);
  const categories = [...new Set(blogPosts.map(p => p.category))];

  return (
    <Layout>
      <SEOHead
        title="Proxy Blog — Industry News, Tutorials & Expert Analysis 2026 | TPR"
        description="Expert proxy industry analysis, in-depth tutorials, and market insights. Covering residential proxies, web scraping, security, and proxy technology trends in 2026."
        canonical={`${BASE}/blog`}
        jsonLd={jsonLd}
      />

      <section className="border-b border-border bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold md:text-5xl">
            Proxy Blog & Industry Insights
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Expert analysis, tutorials, and market intelligence from the TPR research team. Updated weekly with the latest proxy industry developments.
          </p>
          <p className="mt-2 text-xs text-muted-foreground italic">Updated April 2026 • {blogPosts.length} Articles</p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-6 font-display text-2xl font-bold">Featured Articles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-lg border border-border bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
                <h3 className="mt-3 font-display text-lg font-bold group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    <span>{post.datePublished}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">Read <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span key={cat} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Tag className="h-3 w-3" />{cat} ({blogPosts.filter(p => p.category === cat).length})
            </span>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 font-display text-2xl font-bold">All Articles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30"
            >
              <div className="flex-1">
                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mb-2">{post.category}</span>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  <span>{post.datePublished}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <InternalLinks title="Explore More Resources" links={[
          { label: "Top 20 Proxy Providers 2026", path: "/" },
          { label: "Proxy Speed Tests", path: "/speed-tests" },
          { label: "Free Proxy Checker Tool", path: "/proxy-checker" },
          { label: "Best Residential Proxies", path: "/best/best-residential-proxies" },
          { label: "Best Proxies by Country", path: "/proxies-by-country" },
          { label: "How to Set Up Rotating Proxies", path: "/how-to/how-to-set-up-rotating-proxies" },
        ]} />
      </section>
    </Layout>
  );
}
