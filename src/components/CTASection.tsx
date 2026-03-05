import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const benefits = ["Personalized AI meal plans", "24/7 nutrition coaching", "500+ healthy recipes", "Progress tracking & insights"];

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="absolute inset-0 radial-glow opacity-15 pointer-events-none" />

      <div className={cn(
        "relative p-8 md:p-12 rounded-2xl text-center",
        "bg-card/30 backdrop-blur-sm border border-border/30"
      )}>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-medium">Start Free Today</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
          Ready to Transform<br /><span className="text-gradient">Your Health?</span>
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Join thousands who have improved their nutrition with LIVANA. No credit card required.
        </p>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8">
          {benefits.map((b) => (
            <span key={b} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-primary" />{b}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="default" className="group h-10 px-6 text-sm rounded-lg">
              Get Started Free
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <Link to="/#features">
            <Button variant="heroOutline" size="default" className="h-10 px-6 text-sm rounded-lg">
              Learn More
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground">
          Free forever for basic features • No credit card required
        </p>
      </div>
    </section>
  );
};

export default CTASection;
