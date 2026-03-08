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
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(features.length, 80);

  return (
    <section id="features" className="py-20 lg:py-28">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-16 transition-all duration-700",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Features</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
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
              className={cn(
                "group relative p-6 rounded-2xl glass-card",
                "hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-1.5 hover:scale-[1.02]",
                "transition-all duration-300 ease-out",
              )}
              style={getItemStyle(i)}
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full">
                  {feature.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/12 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Icon className="w-5.5 h-5.5 text-primary stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
