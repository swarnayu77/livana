import { Bot, Utensils, Target, ChefHat, TrendingUp, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/use-scroll-animation";

const features = [
  { icon: Utensils, title: "Smart Meal Plans", description: "AI-generated meal plans tailored to your dietary preferences and goals.", href: "/meal-plans", badge: "Popular" },
  { icon: Bot, title: "AI Coach", description: "24/7 personalized nutrition guidance from your AI health companion.", href: "/coach", badge: "New" },
  { icon: Target, title: "Goal Tracking", description: "Set and track your health goals with intelligent progress monitoring.", href: "/goals" },
  { icon: ChefHat, title: "Recipe Library", description: "Explore 500+ healthy recipes with detailed nutrition breakdowns.", href: "/recipes" },
  { icon: TrendingUp, title: "Progress Analytics", description: "Visualize your health journey with charts and actionable insights.", href: "/progress" },
  { icon: FlaskConical, title: "Nutrient Analysis", description: "Comprehensive macro and micronutrient breakdowns for your diet.", href: "/nutrient-analysis" },
];

const FeaturesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(features.length, 70);

  return (
    <section id="features" className="py-24 lg:py-32">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-16 transition-all duration-600",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">Features</p>
        <h2 className="text-[28px] md:text-[32px] font-bold text-foreground tracking-[-0.025em] mb-4">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-[15px] max-w-lg mx-auto leading-relaxed">
          Comprehensive tools to transform your nutrition and health journey.
        </p>
      </div>

      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.href}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/15 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.12)] hover:-translate-y-1 transition-all duration-300"
              style={getItemStyle(i)}
            >
              {feature.badge && (
                <span className="absolute top-5 right-5 px-2 py-0.5 bg-primary/8 text-primary text-[9px] font-semibold rounded-md uppercase tracking-wider">
                  {feature.badge}
                </span>
              )}
              <div className="w-11 h-11 rounded-xl bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-[13px] leading-[1.65]">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
