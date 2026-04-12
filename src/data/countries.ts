export interface CountryProxyPage {
  slug: string;
  country: string;
  countryCode: string;
  proxyType: "Residential" | "Datacenter";
  metaTitle: string;
  metaDesc: string;
  intro: string;
  topProviders: { rank: number; provider: string; providerSlug: string; score: number; reason: string }[];
  useCases: string[];
  faq: { q: string; a: string }[];
}

const countries = [
  { name: "United States", code: "US", demonym: "American" },
  { name: "United Kingdom", code: "GB", demonym: "British" },
  { name: "Germany", code: "DE", demonym: "German" },
  { name: "France", code: "FR", demonym: "French" },
  { name: "Canada", code: "CA", demonym: "Canadian" },
  { name: "Australia", code: "AU", demonym: "Australian" },
  { name: "Japan", code: "JP", demonym: "Japanese" },
  { name: "Brazil", code: "BR", demonym: "Brazilian" },
  { name: "India", code: "IN", demonym: "Indian" },
  { name: "South Africa", code: "ZA", demonym: "South African" },
  { name: "Kenya", code: "KE", demonym: "Kenyan" },
  { name: "Nigeria", code: "NG", demonym: "Nigerian" },
  { name: "Netherlands", code: "NL", demonym: "Dutch" },
  { name: "Singapore", code: "SG", demonym: "Singaporean" },
  { name: "UAE", code: "AE", demonym: "UAE" },
  { name: "Mexico", code: "MX", demonym: "Mexican" },
  { name: "Italy", code: "IT", demonym: "Italian" },
  { name: "Spain", code: "ES", demonym: "Spanish" },
  { name: "Poland", code: "PL", demonym: "Polish" },
  { name: "South Korea", code: "KR", demonym: "South Korean" },
];

const types: Array<"Residential" | "Datacenter"> = ["Residential", "Datacenter"];

const residentialProviders = [
  { provider: "IPRoyal", providerSlug: "iproyal", score: 9.7 },
  { provider: "Bright Data", providerSlug: "bright-data", score: 9.5 },
  { provider: "Oxylabs", providerSlug: "oxylabs", score: 9.4 },
  { provider: "Smartproxy", providerSlug: "smartproxy", score: 9.3 },
  { provider: "SOAX", providerSlug: "soax", score: 9.1 },
];

const datacenterProviders = [
  { provider: "Webshare", providerSlug: "webshare", score: 9.8 },
  { provider: "Proxy-Seller", providerSlug: "proxy-seller", score: 9.3 },
  { provider: "ProxyScrape", providerSlug: "proxyscrape", score: 9.2 },
  { provider: "Rayobyte", providerSlug: "rayobyte", score: 9.15 },
  { provider: "SSL Private Proxy", providerSlug: "ssl-private-proxy", score: 9.1 },
];

export const countryProxyPages: CountryProxyPage[] = countries.flatMap((c) =>
  types.map((type) => {
    const slug = `best-${type.toLowerCase()}-proxies-${c.name.toLowerCase().replace(/\s+/g, "-")}-2026`;
    const provs = type === "Residential" ? residentialProviders : datacenterProviders;
    return {
      slug,
      country: c.name,
      countryCode: c.code,
      proxyType: type,
      metaTitle: `Best ${type} Proxies for ${c.name} 2026 – Top 5 Tested | TPR`,
      metaDesc: `Compare the best ${type.toLowerCase()} proxy providers with ${c.demonym} IPs in 2026. Speed-tested, expert-ranked. Find the fastest ${c.name} proxies for scraping, SEO, and privacy.`,
      intro: `Looking for the best ${type.toLowerCase()} proxies with ${c.name} IP addresses in 2026? Our team tested ${provs.length * 4}+ providers to find the fastest, most reliable ${type.toLowerCase()} proxy services with genuine ${c.demonym} IPs. Whether you need ${c.name} proxies for web scraping, market research, SEO monitoring, ad verification, or anonymous browsing, these are the top-performing options based on our independent speed tests and reliability benchmarks.`,
      topProviders: provs.map((p, i) => ({
        rank: i + 1,
        ...p,
        reason: i === 0
          ? `Best overall ${type.toLowerCase()} proxy for ${c.name} — fastest speeds and largest ${c.demonym} IP pool in our tests.`
          : i === 1
          ? `Premium ${c.name} coverage with city-level targeting and ${type === "Residential" ? "72M+" : "30M+"} global IPs.`
          : i === 2
          ? `Excellent ${c.demonym} IP diversity with ${type === "Residential" ? "advanced geo-targeting" : "99.9% uptime guarantee"}.`
          : i === 3
          ? `Strong ${c.name} performance at competitive pricing. Great for ${type === "Residential" ? "social media" : "SEO tools"}.`
          : `Reliable ${c.demonym} proxies with flexible plans and solid ${type.toLowerCase()} infrastructure.`,
      })),
      useCases: [
        `Scrape ${c.demonym} e-commerce sites and marketplaces with ${type.toLowerCase()} IPs`,
        `Monitor SEO rankings and SERP positions from ${c.name}`,
        `Verify ad placements and campaigns targeting ${c.demonym} audiences`,
        `Access ${c.name}-restricted content and streaming services`,
        `Manage multiple ${c.demonym} social media accounts safely`,
        `Conduct ${c.demonym} market research and price monitoring`,
      ],
      faq: [
        { q: `What is the best ${type.toLowerCase()} proxy for ${c.name}?`, a: `${provs[0].provider} is the best ${type.toLowerCase()} proxy for ${c.name} in 2026, scoring ${provs[0].score}/10 in our tests. They offer the fastest ${c.demonym} IPs with excellent reliability.` },
        { q: `How many ${c.name} IPs do these providers have?`, a: `The top providers offer thousands to millions of ${c.demonym} IP addresses. ${provs[0].provider} leads with the largest ${c.name} IP pool, followed by ${provs[1].provider} and ${provs[2].provider}.` },
        { q: `Are ${c.name} proxies legal?`, a: `Yes, using proxies with ${c.demonym} IPs is legal for legitimate purposes like web scraping, SEO monitoring, market research, and privacy protection. Always respect website terms of service.` },
        { q: `How much do ${c.name} ${type.toLowerCase()} proxies cost?`, a: `${type} proxy pricing for ${c.name} starts from ${type === "Residential" ? "$1.75/GB" : "$0.50/IP/month"}. ${provs[0].provider} offers the best value with competitive rates and flexible plans.` },
      ],
    };
  })
);

export const getCountryPageBySlug = (slug: string) => countryProxyPages.find((p) => p.slug === slug);
