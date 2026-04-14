import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, Tag, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import InternalLinks from "@/components/InternalLinks";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";
import { getProviderBySlug } from "@/data/providers";

const BASE = "https://topvpnr.com";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDesc,
    author: { "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE },
    publisher: { "@type": "Organization", name: "TPR - Top Proxy Reviews", url: BASE, logo: { "@type": "ImageObject", url: `${BASE}/logo.png` } },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE}/blog/${post.slug}` },
    ],
  };

  const faqLd = post.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const relatedPosts = post.relatedSlugs
    ? post.relatedSlugs.map(s => getBlogPostBySlug(s)).filter(Boolean)
    : blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <Layout>
      <SEOHead
        title={post.metaTitle}
        description={post.metaDesc}
        canonical={`${BASE}/blog/${post.slug}`}
        jsonLd={articleLd}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <section className="border-b border-border bg-muted/30 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> &gt;{" "}
            <Link to="/blog" className="hover:text-primary">Blog</Link> &gt;{" "}
            <span className="text-foreground">{post.title}</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
          <h1 className="mt-3 font-display text-2xl font-bold md:text-4xl leading-tight max-w-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <span>Published {post.datePublished}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime} read</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" />{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2 space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">{post.excerpt}</p>

            {/* Table of Contents */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="font-semibold text-sm mb-3">Table of Contents</h2>
              <ol className="space-y-1.5 text-sm">
                {post.sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`} className="text-muted-foreground hover:text-primary transition-colors">{s.title}</a>
                  </li>
                ))}
                {post.faq && <li><a href="#faq" className="text-muted-foreground hover:text-primary">Frequently Asked Questions</a></li>}
              </ol>
            </div>

            {post.sections.map((section, i) => (
              <div key={i} id={`section-${i}`}>
                <h2 className="font-display text-xl font-bold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}

            {post.faq && post.faq.length > 0 && (
              <div id="faq" className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-display text-xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {post.faq.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-sm">{item.q}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold mb-4">Related Articles</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((rp: any) => (
                    <Link
                      key={rp.slug}
                      to={`/blog/${rp.slug}`}
                      className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30"
                    >
                      <span className="text-xs text-primary font-medium">{rp.category}</span>
                      <h3 className="mt-1 text-sm font-semibold group-hover:text-primary transition-colors leading-tight">{rp.title}</h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-medium">Read <ArrowRight className="h-3 w-3" /></span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <InternalLinks
              title="Explore More Resources"
              links={[
                { label: "All Blog Posts", path: "/blog" },
                { label: "Top 20 Proxy Rankings 2026", path: "/" },
                { label: "Proxy Speed Tests", path: "/speed-tests" },
                { label: "Free Proxy Checker", path: "/proxy-checker" },
                { label: "Best Residential Proxies 2026", path: "/best/best-residential-proxies" },
                { label: "Best Proxies by Country", path: "/proxies-by-country" },
              ]}
            />
          </article>

          <aside className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-semibold text-sm mb-3">Latest Articles</h3>
                <div className="space-y-3">
                  {blogPosts.filter(p => p.slug !== slug).slice(0, 6).map(p => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors leading-tight">
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-semibold text-sm mb-3">Popular Providers</h3>
                <div className="space-y-2">
                  {["webshare", "iproyal", "bright-data", "smartproxy", "oxylabs"].map(s => {
                    const prov = getProviderBySlug(s);
                    return prov ? (
                      <Link key={s} to={`/review/${s}`} className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary">
                        <span>{prov.name}</span>
                        <span className="font-bold score-gold">{prov.score.toFixed(1)}</span>
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
                <h3 className="font-semibold text-sm mb-2">Free Proxy Tools</h3>
                <p className="text-xs text-muted-foreground mb-3">Test your proxy setup with our free tools.</p>
                <div className="space-y-2">
                  <Link to="/proxy-checker" className="block text-sm font-medium text-primary hover:underline">→ Proxy Checker</Link>
                  <Link to="/speed-tests" className="block text-sm font-medium text-primary hover:underline">→ Speed Tests</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
