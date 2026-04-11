const brands = ["IRONCLAD", "APEX", "VELOCITY", "TITAN", "CORE", "FORGE", "SUMMIT", "PULSE"];

export default function BrandMarquee() {
  return (
    <section className="py-12 border-y border-border overflow-hidden animate-on-scroll w-full">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="mx-12 text-2xl md:text-3xl font-bold font-display text-muted-foreground/30 hover:text-primary/50 transition-colors duration-300 cursor-default select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
