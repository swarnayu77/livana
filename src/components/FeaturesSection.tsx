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
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(features.length, 60);

  return (
    <section id="features" className="py-20 lg:py-28">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-14 transition-all duration-600",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-primary text-[11px] font-semibold uppercase tracking-[0.18em] mb-2.5">Features</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-[14px] max-w-md mx-auto leading-relaxed">
          Comprehensive tools to transform your nutrition and health journey.
        </p>
      </div>

      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.href}
              className="group relative p-5 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              style={getItemStyle(i)}
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-primary/8 text-primary text-[9px] font-semibold rounded-md uppercase tracking-wider">
                  {feature.badge}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-200">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-150">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
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
