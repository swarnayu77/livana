import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = ["Personalized AI meal plans", "24/7 nutrition coaching", "500+ healthy recipes", "Progress tracking & insights"];

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="relative p-10 md:p-16 rounded-3xl text-center bg-card/20 border border-border/20 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold">Start Free Today</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight mb-4">
            Ready to Transform{" "}
            <span className="text-gradient">Your Health?</span>
          </h2>

          <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Join thousands who have improved their nutrition with LIVANA. No credit card required.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
            {benefits.map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />{b}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="lg" className="group rounded-xl text-sm px-8">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="/#features">
              <Button variant="heroOutline" size="lg" className="rounded-xl text-sm px-8">
                Learn More
              </Button>
            </a>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Free forever for basic features · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
