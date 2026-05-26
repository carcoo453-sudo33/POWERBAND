import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Basic",
    price: 29,
    desc: "Perfect for beginners starting their fitness journey.",
    features: ["3 Resistance Bands", "Workout Guide PDF", "Community Access", "Email Support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: 79,
    desc: "Everything you need for serious training results.",
    features: ["Full Band Set (7 pcs)", "Video Training Program", "Nutrition Plan", "Priority Support", "Monthly Coaching Call"],
    highlighted: true,
  },
  {
    name: "Elite",
    price: 149,
    desc: "The ultimate package for elite-level athletes.",
    features: ["All Pro Features", "Custom Equipment Kit", "1-on-1 Coaching", "Competition Prep", "VIP Community", "Lifetime Updates"],
    highlighted: false,
  },
];

function PriceDisplay({ price, start }: { price: number; start: boolean }) {
  const value = useCountUp(price, 1200, start);
  return <>${value}</>;
}

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countStarted, setCountStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-16 md:py-24" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest animate-on-scroll">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 animate-on-scroll">
            Choose Your <span className="text-primary text-glow">Plan</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`animate-on-scroll relative transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? "border-primary bg-card animate-glow-pulse md:scale-105"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-display text-card-foreground">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold font-display text-card-foreground">
                    <PriceDisplay price={plan.price} start={countStarted} />
                  </span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full btn-shimmer ${
                    plan.highlighted ? "box-glow hover:box-glow-lg" : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
