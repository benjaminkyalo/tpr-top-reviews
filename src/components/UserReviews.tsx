import { useState, useEffect } from "react";
import { Star, User, ThumbsUp } from "lucide-react";

interface UserReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

interface UserReviewsProps {
  providerSlug: string;
  providerName: string;
}

const STORAGE_KEY = "tpr-user-reviews";

function getReviews(slug: string): UserReview[] {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return all[slug] || [];
  } catch { return []; }
}

function saveReview(slug: string, review: UserReview) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    all[slug] = [...(all[slug] || []), review];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch { }
}

function markHelpful(slug: string, reviewId: string) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const reviews = all[slug] || [];
    all[slug] = reviews.map((r: UserReview) => r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch { }
}

export default function UserReviews({ providerSlug, providerName }: UserReviewsProps) {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setReviews(getReviews(providerSlug));
  }, [providerSlug]);

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) return;
    const review: UserReview = {
      id: Date.now().toString(),
      name: name.trim().slice(0, 50),
      rating,
      text: text.trim().slice(0, 500),
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };
    saveReview(providerSlug, review);
    setReviews(getReviews(providerSlug));
    setName("");
    setRating(0);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleHelpful = (id: string) => {
    markHelpful(providerSlug, id);
    setReviews(getReviews(providerSlug));
  };

  const reviewSchema = reviews.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: providerName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  } : null;

  return (
    <div className="space-y-6">
      {reviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}

      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">User Reviews — {providerName}</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(avgRating) ? "fill-current score-gold" : "text-muted-foreground"}`} />
              ))}
            </div>
            <span className="font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-5 space-y-4">
        <h3 className="font-semibold text-sm">Write a Review for {providerName}</h3>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star className={`h-6 w-6 transition-colors ${s <= (hoverRating || rating) ? "fill-current score-gold" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="John D."
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Your Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            required
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder={`Share your experience with ${providerName}...`}
          />
          <p className="text-xs text-muted-foreground mt-1">{text.length}/500</p>
        </div>
        <button
          type="submit"
          disabled={!name.trim() || !text.trim() || rating === 0}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
        >
          Submit Review
        </button>
        {submitted && <p className="text-sm text-green-500 font-medium">Thank you! Your review has been submitted.</p>}
      </form>

      {reviews.length > 0 && (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">{r.name}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-current score-gold" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
              <button
                onClick={() => handleHelpful(r.id)}
                className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ThumbsUp className="h-3 w-3" /> Helpful ({r.helpful})
              </button>
            </div>
          ))}
        </div>
      )}

      {reviews.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No user reviews yet. Be the first to review {providerName}!</p>
      )}
    </div>
  );
}
