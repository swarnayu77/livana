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
    <section className="py-20 lg:py-28">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-16 transition-all duration-700",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">How It Works</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4">
          Three Simple Steps
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
          Getting started takes less than 2 minutes. No guesswork, just results.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-3 gap-6 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className={cn(
                "relative text-center p-8 rounded-2xl glass-card",
                "hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-1.5",
                "transition-all duration-300 ease-out group"
              )}
              style={getItemStyle(i)}
            >
              <div className="relative mx-auto w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary/12 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Icon className="w-6 h-6 text-primary stroke-[1.5]" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
