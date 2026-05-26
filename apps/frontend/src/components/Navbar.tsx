import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    
    // Smooth scroll to section using the main scroll container
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    const scrollContainer = document.querySelector('.main-scroll-container');
    
    if (targetElement && scrollContainer) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const containerScrollTop = scrollContainer.scrollTop;
      const offsetPosition = elementPosition + containerScrollTop - headerOffset;

      scrollContainer.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const isActive = (href: string) => {
    const sectionId = href.slice(1);
    return activeSection === sectionId;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 w-full max-w-full">
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2 text-xl font-bold font-display flex-shrink-0"
        >
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-foreground">
            POWER<span className="text-primary">BAND</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm whitespace-nowrap nav-link ${
                  isActive(link.href)
                    ? 'nav-link-active'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button className="hidden lg:inline-flex rounded-full px-6 box-glow hover:box-glow-lg transition-shadow flex-shrink-0">
          Shop Now
        </Button>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2 flex-shrink-0"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border animate-fade-in w-full">
          <ul className="flex flex-col items-center gap-4 py-6 px-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-base nav-link-mobile ${
                    isActive(link.href)
                      ? 'nav-link-mobile-active'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button className="rounded-full px-6 box-glow w-full sm:w-auto" onClick={() => setMobileOpen(false)}>
                Shop Now
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
