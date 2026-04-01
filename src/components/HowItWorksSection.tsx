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
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(steps.length, 100);

  return (
    <section className="py-20 lg:py-28">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-14 transition-all duration-600",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-primary text-[11px] font-semibold uppercase tracking-[0.18em] mb-2.5">How It Works</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Three Simple Steps
        </h2>
        <p className="text-muted-foreground text-[14px] max-w-md mx-auto leading-relaxed">
          Getting started takes less than 2 minutes. No guesswork, just results.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-3 gap-4 relative">
        {/* Connector */}
        <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-px bg-border" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="relative text-center p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-200 group"
              style={getItemStyle(i)}
            >
              <div className="relative mx-auto w-12 h-12 rounded-xl bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-200">
                <Icon className="w-5 h-5 text-primary" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-md bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1.5">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
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
