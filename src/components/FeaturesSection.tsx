import { Bot, Utensils, Target, ChefHat, TrendingUp, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const features = [
  { icon: Utensils, title: "Smart Meal Plans", description: "AI-generated meal plans tailored to your dietary preferences and goals.", href: "/meal-plans", badge: "Popular" },
  { icon: Bot, title: "AI Coach", description: "24/7 personalized nutrition guidance from your AI health companion.", href: "/coach", badge: "New" },
  { icon: Target, title: "Goal Tracking", description: "Set and track your health goals with intelligent progress monitoring.", href: "/goals" },
  { icon: ChefHat, title: "Recipe Library", description: "Explore 500+ healthy recipes with detailed nutrition breakdowns.", href: "/recipes" },
  { icon: TrendingUp, title: "Progress Analytics", description: "Visualize your health journey with charts and actionable insights.", href: "/progress" },
  { icon: FlaskConical, title: "Nutrient Analysis", description: "Comprehensive macro and micronutrient breakdowns for your diet.", href: "/nutrient-analysis" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="text-center mb-14">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Features</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
          Comprehensive tools to transform your nutrition and health journey.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.href}
              className={cn(
                "group relative p-6 rounded-2xl",
                "bg-card/30 border border-border/25",
                "hover:bg-card/60 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5",
                "transition-all duration-200 ease-out"
              )}
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full border border-primary/20">
                  {feature.badge}
                </span>
              )}
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Icon className="w-5 h-5 text-primary stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
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
