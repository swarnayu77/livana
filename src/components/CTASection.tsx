import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const benefits = ["Personalized AI meal plans", "24/7 nutrition coaching", "500+ healthy recipes", "Progress tracking & insights"];

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28">
      <div
        ref={ref}
        className={cn(
          "relative p-10 md:p-16 rounded-3xl text-center glass-card overflow-hidden transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        )}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px] pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/12 mb-6">
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
            {benefits.map((b, i) => (
              <span
                key={b}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(8px)",
                  transition: `all 0.5s ease ${400 + i * 80}ms`,
                }}
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0" />{b}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="group rounded-full text-sm px-8 btn-glow-hover">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="/#features">
              <Button variant="outline" size="lg" className="rounded-full text-sm px-8 hover:scale-105 active:scale-95 transition-transform">
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
