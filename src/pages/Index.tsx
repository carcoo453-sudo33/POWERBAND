import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <BrandMarquee />
        <Features />
        <Products />
        <Pricing />
        <Team />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
