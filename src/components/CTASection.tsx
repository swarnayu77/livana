import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const benefits = [
  "Personalized AI meal plans",
  "24/7 nutrition coaching",
  "500+ healthy recipes",
  "Progress tracking & insights"
];

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-primary/5 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] radial-glow opacity-25 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className={cn(
          "max-w-3xl mx-auto p-10 md:p-14 rounded-3xl text-center",
          "bg-card/40 backdrop-blur-xl",
          "border border-border/40"
        )}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Start Free Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight">
            Ready to Transform<br />
            <span className="text-gradient">Your Health?</span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join thousands of people who have already improved their nutrition with LIVANA. 
            No credit card required to get started.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
            {benefits.map((benefit) => (
              <span key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                {benefit}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="lg" className="group min-w-[200px] h-12 text-base rounded-xl">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="heroOutline" size="lg" className="min-w-[200px] h-12 text-base rounded-xl">
                Learn More
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Free forever for basic features • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
