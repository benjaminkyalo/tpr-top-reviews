import { Link } from "react-router-dom";

interface LinkItem {
  label: string;
  path: string;
}

interface InternalLinksProps {
  title?: string;
  links: LinkItem[];
}

export default function InternalLinks({ title = "Related Resources", links }: InternalLinksProps) {
  if (links.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-6 mt-8">
      <h2 className="mb-4 font-display text-lg font-bold">{title}</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
          >
            → {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
