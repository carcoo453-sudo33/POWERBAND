import { Instagram, Twitter, Linkedin } from "lucide-react";

const team = [
  {
    name: "Marcus Rivera",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "James Okafor",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Elena Voss",
    role: "Fitness Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest animate-on-scroll">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 animate-on-scroll">
            Meet the <span className="text-primary text-glow">Crew</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          {team.map((member) => (
            <div key={member.name} className="animate-on-scroll-scale text-center group">
              <div className="relative mx-auto w-40 h-40 mb-6 overflow-hidden rounded-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover border-2 border-border group-hover:border-primary transition-all duration-500 group-hover:scale-110"
                  style={{ clipPath: "circle(100% at 50% 50%)" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold font-display text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
              <div className="flex justify-center gap-3">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 opacity-0 group-hover:opacity-100"
                    style={{ transitionDelay: `${i * 100}ms` }}
                    aria-label="Social link"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
