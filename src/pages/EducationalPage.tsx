import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getEducationalBySlug } from "@/data/educational";

export default function EducationalPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getEducationalBySlug(slug || "");
  if (!page) return <Layout><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Page not found</h1><Link to="/" className="mt-4 inline-block text-primary">← Home</Link></div></Layout>;

  return (
    <Layout>
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">Learning Center • Updated April 2026</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{page.intro}</p>
        </div>
      </section>
      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-8">
        {page.sections.map((sec, i) => (
          <div key={i}>
            <h2 className="font-display text-xl font-bold">{sec.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed whitespace-pre-line">{sec.content}</p>
          </div>
        ))}
        {page.faq.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl font-bold">FAQ</h2>
            <div className="space-y-4">
              {page.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="mb-2 font-display text-xl font-bold">Conclusion</h2>
          <p className="text-muted-foreground">{page.conclusion}</p>
        </div>
      </div>
    </Layout>
  );
}
