import { ArrowRight, Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
          alt="Athlete training in a modern gym with professional equipment"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            New Collection 2026
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[0.95] mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            UNLEASH YOUR
            <br />
            <span className="text-primary text-glow">FULL POWER</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Premium fitness equipment engineered for athletes who demand nothing
            less than extraordinary performance.
          </p>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Button size="lg" className="rounded-full px-8 text-base box-glow hover:box-glow-lg transition-shadow gap-2">
              Shop Equipment <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base border-muted-foreground/30 hover:border-primary hover:text-primary gap-2"
            >
              <Play className="h-5 w-5" /> Watch Video
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Athlete"
                  className="h-10 w-10 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>
                <strong className="text-foreground">2,000+</strong> Athletes Trust Us
              </span>
            </div>
          </div>
        </div>

        {/* Floating card */}
        <div className="hidden lg:block absolute right-8 bottom-32 bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 w-72 animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">Current Session</span>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Calories</span>
              <span className="text-primary font-semibold">847 kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span className="text-foreground font-semibold">1h 23m</span>
            </div>
            <div className="flex justify-between">
              <span>Heart Rate</span>
              <span className="text-foreground font-semibold">142 bpm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
