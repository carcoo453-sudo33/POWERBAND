import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Alex Thompson",
    role: "CrossFit Athlete",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "PowerBand completely transformed my home gym setup. The quality is unmatched — I've tried everything and nothing comes close.",
  },
  {
    name: "Maria Santos",
    role: "Yoga Instructor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The resistance bands have perfect tension and the ergonomic design makes a huge difference. My clients love them too!",
  },
  {
    name: "David Kim",
    role: "Personal Trainer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "I recommend PowerBand to all my clients. The durability is insane — been using the same set for 2 years with zero wear.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest animate-on-scroll">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 animate-on-scroll">
            What Athletes <span className="text-primary text-glow">Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-children">
          {reviews.map((r, idx) => (
            <Card
              key={r.name}
              className={`${idx % 2 === 0 ? "animate-on-scroll-left" : "animate-on-scroll-right"} bg-card border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1`}
            >
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-primary/30 mb-4 animate-float" />
                <p className="text-muted-foreground leading-relaxed mb-6">{r.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary transition-all duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-12 w-12 rounded-full object-cover border border-border"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-card-foreground text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
