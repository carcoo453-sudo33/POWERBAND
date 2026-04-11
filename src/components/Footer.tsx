import { Zap, Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const links = {
  Product: ["Equipment", "Apparel", "Accessories", "New Arrivals"],
  Company: ["About", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Shipping", "Returns", "Warranty"],
};

export default function Footer() {
  return (
    <footer className="border-t border-border py-16 animate-on-scroll">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 text-xl font-bold font-display mb-4">
              <Zap className="h-6 w-6 text-primary" />
              POWER<span className="text-primary">BAND</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Premium fitness equipment engineered for athletes who demand extraordinary performance.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Social link"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold font-display text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link">
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">© 2026 PowerBand. All rights reserved.</p>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="rounded-full bg-secondary border-border max-w-xs focus:border-primary"
            />
            <Button className="rounded-full px-6 box-glow btn-shimmer">Subscribe</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
