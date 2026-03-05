import { Bot, Utensils, Target, ChefHat, TrendingUp, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const features = [
  { icon: Utensils, title: "Smart Meal Plans", description: "AI-generated meal plans tailored to your dietary preferences, allergies, and nutritional goals.", href: "/meal-plans", highlight: "Popular" },
  { icon: Bot, title: "AI Coach", description: "24/7 personalized nutrition guidance from your AI health companion.", href: "/coach", highlight: "New" },
  { icon: Target, title: "Goal Tracking", description: "Set and track your health goals with intelligent progress monitoring.", href: "/goals" },
  { icon: ChefHat, title: "Recipe Library", description: "Explore 500+ healthy recipes with detailed nutrition info.", href: "/recipes" },
  { icon: TrendingUp, title: "Progress Analytics", description: "Visualize your health journey with charts and actionable insights.", href: "/progress" },
  { icon: FlaskConical, title: "Nutrient Analysis", description: "Comprehensive macro and micronutrient breakdowns for your diet.", href: "/nutrient-analysis" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="text-center mb-12">
        <p className="text-primary font-medium text-xs uppercase tracking-widest mb-3">Features</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          Comprehensive tools designed to transform your nutrition and health journey.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.href}
              className={cn(
                "group relative p-5 rounded-xl",
                "bg-card/40 border border-border/30",
                "hover:bg-card/70 hover:border-primary/20",
                "hover:shadow-lg hover:shadow-primary/5",
                "transition-all duration-200 ease-out"
              )}
            >
              {feature.highlight && (
                <span className="absolute -top-2 right-4 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full border border-primary/20">
                  {feature.highlight}
                </span>
              )}
              <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                <Icon className="w-4.5 h-4.5 text-primary stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
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
