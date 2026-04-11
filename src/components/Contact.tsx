import { useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest animate-on-scroll">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 animate-on-scroll">
            Get in <span className="text-primary text-glow">Touch</span>
          </h2>
        </div>

        <Card className="max-w-xl mx-auto animate-on-scroll bg-card border-border">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Your Name"
                  required
                  className="pl-10 rounded-full bg-secondary border-border focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="pl-10 rounded-full bg-secondary border-border focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Textarea
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="pl-10 rounded-2xl bg-secondary border-border focus:border-primary focus:ring-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full box-glow hover:box-glow-lg transition-shadow gap-2"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
