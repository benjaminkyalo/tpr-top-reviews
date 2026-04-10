import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { howToPages } from "@/data/howTo";
import { educationalPages } from "@/data/educational";

const BASE = "https://topvpnr.com";

export default function GuidesHub() {
  return (
    <Layout>
      <SEOHead
        title="Proxy & VPN Guides 2026 – How-To Tutorials & Learning Center | TPR"
        description="Complete proxy and VPN guides: setup tutorials, Python integration, rotating proxies, proxy vs VPN explained, glossary, and more. Free expert knowledge base."
        canonical={`${BASE}/guides`}
      />

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Proxy & VPN Guides</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Step-by-step tutorials and in-depth learning resources to master proxy and VPN technology.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h2 className="font-display text-2xl font-bold mb-6">How-To Tutorials</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {howToPages.map((h) => (
            <Link key={h.slug} to={`/how-to/${h.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-lg font-bold group-hover:text-primary">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{h.metaDesc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">Read Guide <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold mb-6">Learning Center</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {educationalPages.map((e) => (
            <Link key={e.slug} to={`/learn/${e.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-lg font-bold group-hover:text-primary">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{e.metaDesc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">Learn More <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
