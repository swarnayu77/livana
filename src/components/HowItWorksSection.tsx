import { UserPlus, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Tell us about your goals, preferences, and dietary needs. Our AI builds your personalized nutrition blueprint.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Get AI-Powered Plans",
    description: "Receive custom meal plans, smart food tracking, and real-time coaching tailored to your unique body and lifestyle.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Track & Transform",
    description: "Monitor your progress with visual analytics, earn insights, and watch your health goals become reality.",
  },
];

const HowItWorksSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(steps.length, 120);

  return (
    <section className="py-24 lg:py-32">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-16 transition-all duration-600",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">How It Works</p>
        <h2 className="text-[28px] md:text-[32px] font-bold text-foreground tracking-[-0.025em] mb-4">
          Three Simple Steps
        </h2>
        <p className="text-muted-foreground text-[15px] max-w-lg mx-auto leading-relaxed">
          Getting started takes less than 2 minutes. No guesswork, just results.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-3 gap-6 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-16 left-[22%] right-[22%] h-px bg-gradient-to-r from-border via-primary/20 to-border" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="relative text-center p-7 rounded-xl bg-card border border-border hover:border-primary/15 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.1)] transition-all duration-300 group"
              style={getItemStyle(i)}
            >
              <div className="relative mx-auto w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300">
                <Icon className="w-6 h-6 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {step.step}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-[13px] leading-[1.65]">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorksSection;
