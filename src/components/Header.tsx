import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Reviews", path: "/reviews", children: [
    { label: "Webshare", path: "/review/webshare" },
    { label: "IPRoyal", path: "/review/iproyal" },
    { label: "Bright Data", path: "/review/bright-data" },
    { label: "Oxylabs", path: "/review/oxylabs" },
    { label: "Smartproxy", path: "/review/smartproxy" },
  ]},
  { label: "Comparisons", path: "/comparisons", children: [
    { label: "Bright Data vs Oxylabs", path: "/compare/bright-data-vs-oxylabs" },
    { label: "Smartproxy vs IPRoyal", path: "/compare/smartproxy-vs-iproyal" },
    { label: "Residential vs Datacenter", path: "/compare/residential-vs-datacenter-proxy" },
  ]},
  { label: "Best Picks", path: "/best", children: [
    { label: "Best Residential Proxies", path: "/best/best-residential-proxies" },
    { label: "Best Datacenter Proxies", path: "/best/best-datacenter-proxies" },
    { label: "By Country", path: "/proxies-by-country" },
  ]},
  { label: "Tools", path: "/speed-tests", children: [
    { label: "Speed Tests", path: "/speed-tests" },
    { label: "Proxy Checker", path: "/proxy-checker" },
  ]},
  { label: "Guides", path: "/guides", children: [
    { label: "Set Up Rotating Proxies", path: "/how-to/how-to-set-up-rotating-proxies" },
    { label: "Use Proxy with Python", path: "/how-to/how-to-use-proxy-with-python" },
    { label: "Choose the Right Proxy", path: "/how-to/how-to-choose-right-proxy" },
  ]},
  { label: "About", path: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-primary">TPR</span>
          <span className="hidden text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:block">Top Proxy Reviews</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="group relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3 w-3" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <div
                  className="absolute left-0 top-full z-50 w-56 rounded-lg border border-border bg-card p-2 shadow-xl"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button className="lg:hidden" aria-label="Toggle mobile menu" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 lg:hidden">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 pl-6 text-sm text-muted-foreground hover:text-foreground"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
