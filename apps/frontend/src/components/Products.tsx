import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    name: "Resistance Band Pro",
    price: 49,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop",
    tag: "Best Seller",
  },
  {
    name: "Power Kettlebell Set",
    price: 129,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=400&fit=crop",
    tag: "New",
  },
  {
    name: "Training Jump Rope",
    price: 34,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=400&fit=crop",
    tag: null,
  },
  {
    name: "Foam Roller Elite",
    price: 59,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    tag: "Popular",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest animate-on-scroll">
            Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 animate-on-scroll">
            Premium <span className="text-primary text-glow">Equipment</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {products.map((p) => (
            <Card
              key={p.name}
              className="animate-on-scroll-scale bg-card border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/5 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full animate-tag-glow">
                    {p.tag}
                  </span>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm text-muted-foreground">{p.rating}</span>
                </div>
                <h3 className="font-semibold font-display text-card-foreground mb-3">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${p.price}</span>
                  <Button size="sm" className="rounded-full gap-1.5 btn-shimmer">
                    <ShoppingCart className="h-4 w-4" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
