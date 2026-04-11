import { Shield, Hand, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Durability",
    description: "Built from aerospace-grade materials to withstand the most intense training sessions, guaranteed to last a lifetime.",
    direction: "left" as const,
  },
  {
    icon: Hand,
    title: "Ergonomic Design",
    description: "Every curve and grip point engineered with biomechanics experts to reduce strain and maximize performance.",
    direction: "scale" as const,
  },
  {
    icon: Briefcase,
    title: "Ultra Portable",
    description: "Compact, foldable, and travel-friendly. Take your full workout setup anywhere in the world.",
    direction: "right" as const,
  },
];

const directionClass = {
  left: "animate-on-scroll-left",
  right: "animate-on-scroll-right",
  scale: "animate-on-scroll-scale",
};

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest animate-on-scroll">
            Why PowerBand
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 animate-on-scroll">
            Engineered for
            <br />
            <span className="text-primary text-glow">Human Potential</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-children">
          {features.map((f) => (
            <Card
              key={f.title}
              className={`${directionClass[f.direction]} bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group`}
            >
              <CardContent className="p-8">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-[360deg]">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-card-foreground">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
