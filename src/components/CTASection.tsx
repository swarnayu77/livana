import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
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
          "relative p-8 md:p-14 rounded-2xl text-center bg-card border border-border overflow-hidden transition-all duration-600",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        {/* Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[140px] pointer-events-none" />

        <div className="relative">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3">
            Ready to Transform{" "}
            <span className="text-gradient">Your Health?</span>
          </h2>

          <p className="text-muted-foreground text-[14px] leading-relaxed mb-8 max-w-md mx-auto">
            Join thousands who have improved their nutrition with LIVANA. No credit card required.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2.5 mb-8">
            {benefits.map((b, i) => (
              <span
                key={b}
                className="flex items-center gap-1.5 text-[12px] text-muted-foreground"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(6px)",
                  transition: `all 0.4s ease ${300 + i * 60}ms`,
                }}
              >
                <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />{b}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="group rounded-lg text-[13px] px-6 h-10 btn-glow-hover">
                Get Started Free
                <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="/#features">
              <Button variant="outline" size="lg" className="rounded-lg text-[13px] px-6 h-10">
                Learn More
              </Button>
            </a>
          </div>

          <p className="mt-6 text-[11px] text-muted-foreground">
            Free forever for basic features · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
